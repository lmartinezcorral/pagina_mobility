<?php
/**
 * Endpoint del formulario de contacto.
 * Usa PHPMailer con SMTP (config.php). Retorna JSON para AJAX.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Cargar config
$configFile = __DIR__ . '/config.php';
if (!is_file($configFile) || !is_readable($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de configuración. Intenta más tarde.']);
    exit;
}
require_once $configFile;

// Sanitizar inputs
$name    = isset($_POST['name'])    ? trim(strip_tags($_POST['name']))    : '';
$email   = isset($_POST['email'])   ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor ingresa tu nombre.']);
    exit;
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor ingresa un email válido.']);
    exit;
}
if (empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor escribe tu mensaje.']);
    exit;
}

// Limitar longitudes
$maxLen = 255;
if (strlen($name) > $maxLen)    $name    = substr($name, 0, $maxLen);
if (strlen($subject) > $maxLen) $subject = substr($subject, 0, $maxLen);
$message = substr($message, 0, 5000);

// PHPMailer
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

    $recipient = $smtp_recipient;
    $mail->setFrom(!empty($smtp_user) ? $smtp_user : $email, $name);
    $mail->addAddress($recipient);
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subject ?: 'Mensaje desde Somos Mobility';
    $mail->isHTML(true);
    $mail->Body = "<p><strong>Nombre:</strong> " . htmlspecialchars($name) . "</p>\n"
        . "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>\n"
        . "<p><strong>Asunto:</strong> " . htmlspecialchars($subject) . "</p>\n"
        . "<p><strong>Mensaje:</strong></p>\n<p>" . nl2br(htmlspecialchars($message)) . "</p>";
    $mail->AltBody = "Nombre: $name\nEmail: $email\nAsunto: $subject\n\nMensaje:\n$message";

    $mail->send();
    echo json_encode(['success' => true, 'message' => '¡Mensaje enviado! Te contactaremos pronto.']);
} catch (PHPMailerException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'No se pudo enviar el mensaje. Intenta más tarde o escríbenos a somosmobility@gmail.com']);
}
