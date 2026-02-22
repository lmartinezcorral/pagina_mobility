<?php
/**
 * Endpoint del cuestionario post-pago PayPal - Taller de Masaje.
 * Usa PHPMailer con SMTP (config.php). Retorna JSON para AJAX.
 * Misma clave de aplicación / config que contact-action.php.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile) || !is_readable($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de configuración. Intenta más tarde.']);
    exit;
}
require_once $configFile;

$nombre    = isset($_POST['nombre_certificado']) ? trim(strip_tags($_POST['nombre_certificado'])) : '';
$telefono  = isset($_POST['telefono']) ? preg_replace('/\D/', '', $_POST['telefono']) : '';
$grado     = isset($_POST['grado_academico']) ? trim(strip_tags($_POST['grado_academico'])) : '';
$mensaje   = isset($_POST['mensaje']) ? trim(strip_tags($_POST['mensaje'])) : '';
$tipoPago  = isset($_POST['tipo_pago']) ? trim(strip_tags($_POST['tipo_pago'])) : '';

if (empty($nombre)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor ingresa tu nombre completo.']);
    exit;
}
if (strlen($telefono) !== 10 || !ctype_digit($telefono)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El teléfono debe tener exactamente 10 dígitos numéricos.']);
    exit;
}
if (empty($grado)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor selecciona tu perfil académico.']);
    exit;
}

$nombre   = substr($nombre, 0, 120);
$mensaje  = substr($mensaje, 0, 500);
$tipoPago = substr($tipoPago, 0, 50);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    $smtp_host = $smtp_host ?? '';
    $smtp_user = $smtp_user ?? '';
    $smtp_pass = $smtp_pass ?? '';
    $smtp_port = $smtp_port ?? 587;
    $smtp_recipient = $smtp_recipient ?? 'somosmobility@gmail.com';

    if (!empty($smtp_host) && !empty($smtp_user) && $smtp_pass !== '' && $smtp_pass !== 'CAMBIAR_POR_APP_PASSWORD') {
        $mail->isSMTP();
        $mail->Host       = $smtp_host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_user;
        $mail->Password   = $smtp_pass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = (int) $smtp_port;
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer'       => false,
                'verify_peer_name'  => false,
                'allow_self_signed' => true
            ]
        ];
    }

    $mail->setFrom(!empty($smtp_user) ? $smtp_user : 'noreply@somosmobility.com', 'Somos Mobility');
    $mail->addAddress($smtp_recipient);
    $mail->Subject = '[Taller Masaje] Datos certificado - ' . $nombre;
    $mail->isHTML(true);
    $mail->Body = "<h3>Cuestionario post-pago - Taller Intensivo de Masaje</h3>"
        . "<p><strong>Nombre (certificado):</strong> " . htmlspecialchars($nombre) . "</p>"
        . "<p><strong>Teléfono:</strong> " . htmlspecialchars($telefono) . "</p>"
        . "<p><strong>Grado/Perfil:</strong> " . htmlspecialchars($grado) . "</p>"
        . "<p><strong>Tipo de pago:</strong> " . htmlspecialchars($tipoPago ?: 'No especificado') . "</p>";
    if (!empty($mensaje)) {
        $mail->Body .= "<p><strong>Mensaje:</strong></p><p>" . nl2br(htmlspecialchars($mensaje)) . "</p>";
    }
    $mail->AltBody = "Nombre: $nombre\nTeléfono: $telefono\nGrado: $grado\nTipo pago: $tipoPago\n" . ($mensaje ? "Mensaje: $mensaje\n" : '');

    $mail->send();
    echo json_encode(['success' => true, 'message' => '¡Datos guardados correctamente!']);
} catch (PHPMailerException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'No se pudo enviar. Intenta más tarde o escríbenos a somosmobility@gmail.com']);
}
