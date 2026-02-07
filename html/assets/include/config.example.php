<?php
/**
 * Plantilla de configuración — COPIAR como config.php y completar.
 * config.php no se versiona (está en .gitignore).
 */

// PostgreSQL (ThinkCenter) — Newsletter y datos
$db_host = '192.168.0.11';
$db_port = '5432';
$db_name = 'somosmobility';
$db_user = 'somosmobility';
$db_pass = 'CAMBIAR_POR_PASSWORD_SEGURO';

// SMTP — Formulario de contacto (opcional)
// Para Gmail: activar 2FA y crear "Contraseña de aplicación" en tu cuenta Google
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_user = 'somosmobility@gmail.com';
$smtp_pass = 'CAMBIAR_POR_APP_PASSWORD';
$smtp_recipient = 'somosmobility@gmail.com';
