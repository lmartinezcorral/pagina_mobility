<?php
// Newsletter subscription endpoint
// NOTA: Este archivo define la lógica básica. Las credenciales reales de BD
// deben moverse a una configuración segura fuera del repositorio antes de producción.

header('Content-Type: application/json; charset=utf-8');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Configuración de BD (PLACEHOLDER - NO USAR EN PRODUCCIÓN SIN MOVER CREDENCIALES)
$db_host = '192.168.0.11';      // ThinkCenter
$db_port = '5432';
$db_name = 'somosmobility';
$db_user = 'somosmobility';
$db_pass = 'CAMBIAR_POR_PASSWORD_SEGURO'; // TODO: mover a archivo de config no versionado

// Sanitizar inputs
$email  = isset($_POST['email'])  ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$nombre = isset($_POST['nombre']) ? trim(strip_tags($_POST['nombre'])) : null;
$fuente = isset($_POST['fuente']) ? trim(strip_tags($_POST['fuente'])) : 'desconocida';

// Validar email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor ingresa un email válido.']);
    exit;
}

// Limitar longitudes
if ($nombre !== null && mb_strlen($nombre) > 255) {
    $nombre = mb_substr($nombre, 0, 255);
}
if (mb_strlen($fuente) > 50) {
    $fuente = mb_substr($fuente, 0, 50);
}

// Datos de contexto
$ip        = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

// Conexión a PostgreSQL
$connStr = sprintf(
    'host=%s port=%s dbname=%s user=%s password=%s',
    $db_host,
    $db_port,
    $db_name,
    $db_user,
    $db_pass
);

$db = @pg_connect($connStr);

if (!$db) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'No se pudo conectar al servidor de datos. Intenta más tarde.']);
    exit;
}

// Insertar o actualizar (upsert)
$sql = "
    INSERT INTO newsletter_suscriptores (email, nombre, fuente, ip_registro, user_agent)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email, fuente)
    DO UPDATE SET
        nombre       = EXCLUDED.nombre,
        ip_registro  = EXCLUDED.ip_registro,
        user_agent   = EXCLUDED.user_agent,
        fecha_alta   = NOW(),
        activo       = TRUE
";

$result = pg_query_params($db, $sql, [
    $email,
    $nombre,
    $fuente,
    $ip,
    $userAgent
]);

if (!$result) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'No se pudo guardar tu suscripción. Intenta más tarde.']);
    exit;
}

echo json_encode(['success' => true, 'message' => '¡Gracias! Tu suscripción al newsletter se ha registrado correctamente.']);
exit;

