# Somos Mobility — Entorno Docker

Entorno **reproducible** para desarrollar y probar el sitio con **Apache + PHP**, igual que en producción (Lenovo V110). Así el menú con includes PHP y el `.htaccess` (procesar `.html` como PHP) se comportan igual en cualquier máquina.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) (Desktop en Windows/Mac o engine en Linux/WSL)

## Uso rápido

```bash
cd Plan_2026/pagina_mobility
docker compose up --build -d
```

Abrir **http://localhost:8080** (o **http://127.0.0.1:8080**). El menú y las páginas internas deben verse correctamente.

- **En segundo plano (-d):** Recomendado en Windows para evitar que Apache reciba SIGWINCH al redimensionar la consola.
- **En primer plano (sin -d):** `docker compose up --build` — ver logs en vivo.
- **Parar:** `docker compose down`

## Opciones de desarrollo

- **Con volumen** (por defecto): `./html` está montado como solo lectura. Los cambios en archivos se ven al recargar; no hace falta reconstruir la imagen.
- **Sin volumen** (solo imagen): comenta o borra la sección `volumes` en `docker-compose.yml` y reconstruye con `docker compose up --build` para que el contenido quede fijado en la imagen (útil para probar un “build” concreto).

## Comparación con otros entornos

| Entorno              | Servidor      | .htaccess | Menú PHP en .html   |
|----------------------|---------------|-----------|----------------------|
| `start-dev-server.bat` | php -S + router | No        | Sí (vía router)      |
| **Docker**           | Apache + PHP  | Sí        | Sí (como en prod)    |
| Lenovo V110 (prod)   | Apache + PHP  | Sí        | Sí                   |

Usar Docker para probar antes de subir a Lenovo evita sorpresas por diferencias entre php -S y Apache.

## Newsletter (formulario «Suscríbete»)

El endpoint `assets/include/newsletter-subscribe.php` usa **PostgreSQL** y soporta dos modos:

1. **Docker con servicio `db` (por defecto):** El `docker-compose.yml` incluye un contenedor PostgreSQL. Las variables de entorno (`DB_HOST=db`, etc.) tienen prioridad sobre `config.php`. El newsletter funciona sin crear `config.php`. La tabla `newsletter_suscriptores` se crea automáticamente al iniciar la BD por primera vez (`docker/init-newsletter.sql`).

2. **config.php (producción/Lenovo):** En Lenovo V110 o sin servicio `db`, crear `html/assets/include/config.php` desde `config.example.php` con credenciales de ThinkCenter (`192.168.0.11`). Las variables de entorno vacías harán que se use `config.php`.
