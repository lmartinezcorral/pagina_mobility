<?php
/**
 * Router para php -S (servidor embebido).
 * Procesa .html como PHP para que funcionen los includes.
 * Uso: php -S localhost:8000 router.php
 */
chdir(__DIR__);
define('SITE_ROOT', __DIR__);
$path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$uri = $path !== false && $path !== null ? urldecode($path) : '';
// Asegurar barra inicial: sin ella el regex no coincide y php -S sirve .html estático (menú no se ejecuta)
if ($uri === '' || $uri[0] !== '/') {
    $uri = '/' . ltrim($uri, '/');
}
$file = __DIR__ . $uri;

// .html: si existe .php equivalente, usar .php; si no, incluir .html como PHP
if (pathinfo($uri, PATHINFO_EXTENSION) === 'html' && preg_match('#^/(.+)\.html$#', $uri, $m)) {
    $base = $m[1];
    $phpFile = __DIR__ . '/' . $base . '.php';
    $htmlFile = $file;
    if (file_exists($phpFile) && is_file($phpFile)) {
        $_SERVER['PHP_SELF'] = '/' . $base . '.php';
        include $phpFile;
        return true;
    }
    if (file_exists($htmlFile) && is_file($htmlFile)) {
        $_SERVER['PHP_SELF'] = $uri;
        include $htmlFile;
        return true;
    }
}
// / -> index.php (prioridad) o index.html
if ($uri === '/' || $uri === '') {
    if (file_exists(__DIR__ . '/index.php')) {
        $_SERVER['PHP_SELF'] = '/index.php';
        include __DIR__ . '/index.php';
        return true;
    }
    $file = __DIR__ . '/index.html';
    if (file_exists($file)) {
        $_SERVER['PHP_SELF'] = '/index.html';
        include $file;
        return true;
    }
}
// Resto: servir como estático
return false;
