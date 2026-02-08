#!/bin/bash
###############################################################################
# Script de Deployment para Somos Mobility
# Descripción: Actualiza el sitio web desde GitHub y recarga Apache
# Uso: sudo /usr/local/bin/deploy-somosmobility.sh [--dry-run]
# Autor: Black Panther - Infrastructure & Data Engineer
# Fecha: 2026-02-03
# Fix 2026-02-07: Restaurar directorio del repo después de limpieza de backups
###############################################################################

set -e  # Salir si hay error
set -u  # Error si variable no definida

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
REPO_DIR="/var/www/html"
HTML_DIR="${REPO_DIR}/html"
BACKUP_DIR="/tmp/somosmobility-backups"
LOG_FILE="/var/log/somosmobility-deploy.log"
MAX_BACKUPS=5  # Mantener solo los últimos 5 backups
DRY_RUN=false

# Verificar si es dry-run
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo -e "${YELLOW}[DRY-RUN] Modo de prueba activado${NC}"
fi

# Función de logging
log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"

    case $level in
        ERROR)
            echo -e "${RED}[ERROR]${NC} $message" >&2
            ;;
        WARN)
            echo -e "${YELLOW}[WARN]${NC} $message"
            ;;
        INFO)
            echo -e "${GREEN}[INFO]${NC} $message"
            ;;
        *)
            echo "[$level] $message"
            ;;
    esac
}

# Función de error
error_exit() {
    log ERROR "$1"
    exit 1
}

# Verificar que se ejecuta como root
if [[ $EUID -ne 0 ]]; then
    error_exit "Este script debe ejecutarse como root. Usa: sudo $0"
fi

# Verificar que el directorio del repositorio existe
if [[ ! -d "$REPO_DIR" ]]; then
    error_exit "Directorio del repositorio no existe: $REPO_DIR"
fi

# Verificar que es un repositorio Git
if [[ ! -d "$REPO_DIR/.git" ]]; then
    error_exit "No es un repositorio Git: $REPO_DIR"
fi

# Crear directorio de backups si no existe
mkdir -p "$BACKUP_DIR" 2>/dev/null || true

log INFO "=========================================="
log INFO "Iniciando deployment de Somos Mobility"
log INFO "=========================================="

# Cambiar al directorio del repositorio (IMPORTANTE: permanecer aquí para git)
cd "$REPO_DIR" || error_exit "No se pudo cambiar al directorio: $REPO_DIR"

# 1. Crear backup antes de actualizar
log INFO "Creando backup del directorio html/..."
BACKUP_FILE="${BACKUP_DIR}/somosmobility-backup-$(date +%Y%m%d-%H%M%S).tar.gz"

if [[ "$DRY_RUN" == false ]]; then
    if [[ -d "$HTML_DIR" ]]; then
        tar -czf "$BACKUP_FILE" -C "$REPO_DIR" html/ 2>/dev/null || {
            log WARN "No se pudo crear backup completo, continuando..."
        }

        if [[ -f "$BACKUP_FILE" ]]; then
            log INFO "Backup creado: $BACKUP_FILE"

            # Limpiar backups antiguos (usar subshell para no cambiar el directorio actual)
            (cd "$BACKUP_DIR" && ls -t somosmobility-backup-*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs rm -f 2>/dev/null || true)
            log INFO "Backups antiguos limpiados (manteniendo últimos $MAX_BACKUPS)"
        fi
    else
        log WARN "Directorio html/ no existe, saltando backup"
    fi
else
    log INFO "[DRY-RUN] Backup se crearía en: $BACKUP_FILE"
fi

# 2. Verificar estado actual de Git (asegurar que estamos en REPO_DIR)
cd "$REPO_DIR" || error_exit "No se pudo cambiar al directorio del repositorio: $REPO_DIR"
log INFO "Verificando estado del repositorio..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CURRENT_COMMIT=$(git rev-parse --short HEAD)
log INFO "Rama actual: $CURRENT_BRANCH"
log INFO "Commit actual: $CURRENT_COMMIT"

# 3. Obtener cambios desde GitHub
log INFO "Obteniendo cambios desde GitHub..."
if [[ "$DRY_RUN" == false ]]; then
    git fetch origin || error_exit "Error al hacer fetch desde GitHub"
else
    log INFO "[DRY-RUN] Se ejecutaría: git fetch origin"
fi

# 4. Verificar si hay cambios
REMOTE_COMMIT=$(git rev-parse --short origin/master)
if [[ "$CURRENT_COMMIT" == "$REMOTE_COMMIT" ]]; then
    log INFO "No hay cambios nuevos. Ya estás en el commit más reciente: $REMOTE_COMMIT"
    log INFO "Deployment completado (sin cambios)"
    exit 0
fi

log INFO "Nuevo commit disponible: $REMOTE_COMMIT"
log INFO "Cambios a aplicar:"
git log --oneline "$CURRENT_COMMIT..$REMOTE_COMMIT" | head -10

# 5. Aplicar cambios
if [[ "$DRY_RUN" == false ]]; then
    log INFO "Aplicando cambios..."
    git reset --hard origin/master || error_exit "Error al aplicar cambios desde GitHub"

    # Limpiar archivos no rastreados (opcional, comentado por seguridad)
    # git clean -fd

    log INFO "Cambios aplicados exitosamente"
else
    log INFO "[DRY-RUN] Se ejecutaría: git reset --hard origin/master"
fi

# 6. Ajustar permisos
log INFO "Ajustando permisos..."
if [[ "$DRY_RUN" == false ]]; then
    if [[ -d "$HTML_DIR" ]]; then
        chown -R www-data:www-data "$HTML_DIR" || log WARN "Error al cambiar propietario"
        find "$HTML_DIR" -type d -exec chmod 755 {} \; || log WARN "Error al ajustar permisos de directorios"
        find "$HTML_DIR" -type f -exec chmod 644 {} \; || log WARN "Error al ajustar permisos de archivos"

        # Permisos especiales para scripts PHP
        find "$HTML_DIR" -name "*.php" -exec chmod 644 {} \; || true

        log INFO "Permisos ajustados correctamente"
    else
        log WARN "Directorio html/ no existe, saltando ajuste de permisos"
    fi
else
    log INFO "[DRY-RUN] Se ajustarían permisos de: $HTML_DIR"
fi

# 7. Recargar Apache (sin reiniciar, solo recargar configuración)
log INFO "Recargando Apache..."
if [[ "$DRY_RUN" == false ]]; then
    if systemctl is-active --quiet apache2; then
        systemctl reload apache2 || error_exit "Error al recargar Apache"
        log INFO "Apache recargado exitosamente"
    else
        log WARN "Apache no está activo, saltando recarga"
    fi
else
    log INFO "[DRY-RUN] Se ejecutaría: systemctl reload apache2"
fi

# 8. Verificar estado final
NEW_COMMIT=$(git rev-parse --short HEAD)
log INFO "=========================================="
log INFO "Deployment completado exitosamente"
log INFO "Commit anterior: $CURRENT_COMMIT"
log INFO "Commit actual:   $NEW_COMMIT"
log INFO "=========================================="

# Mostrar resumen
echo ""
echo -e "${GREEN}✓ Deployment completado${NC}"
echo "  Commit: $NEW_COMMIT"
echo "  Backup: $BACKUP_FILE"
echo "  Logs:   $LOG_FILE"
echo ""
