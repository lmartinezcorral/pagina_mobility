-- Inicialización BD para Newsletter (entorno Docker desarrollo)
-- Solo para desarrollo local; producción usa ThinkCenter
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS newsletter_suscriptores (
    id                  BIGSERIAL PRIMARY KEY,
    email               CITEXT NOT NULL,
    nombre              VARCHAR(255),
    fuente              VARCHAR(50) NOT NULL,
    ip_registro         INET,
    user_agent          TEXT,
    fecha_alta          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmado          BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_confirmacion  TIMESTAMPTZ,
    activo              BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (email, fuente)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email  ON newsletter_suscriptores (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_fuente ON newsletter_suscriptores (fuente);
CREATE INDEX IF NOT EXISTS idx_newsletter_fecha  ON newsletter_suscriptores (fecha_alta DESC);
