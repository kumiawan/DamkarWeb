FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    curl \
    unzip \
    git \
    gnupg \
    && docker-php-ext-install pdo pdo_mysql zip exif pcntl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install
RUN npm install && npm run build

RUN chmod -R 775 storage
RUN chown -R www-data:www-data storage bootstrap/cache

CMD ["php-fpm"]
