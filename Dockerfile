# Somos Mobility - Entorno web igual en dev/prod (Apache + PHP)
# La imagen php:apache ya trae AllowOverride All para /var/www/
# Uso: docker compose up --build   → http://localhost:8080
FROM php:8.2-apache

# Necesario para reglas RewriteRule en .htaccess (por si se añaden)
RUN a2enmod rewrite

# Pasar vars de entorno DB_* a PHP (newsletter en Docker)
COPY docker/apache-env.conf /etc/apache2/conf-enabled/

# Extensión PostgreSQL para newsletter (newsletter-subscribe.php usa pg_connect)
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pgsql \
    && apt-get purge -y libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# DocumentRoot = contenido del sitio
COPY html/ /var/www/html/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
