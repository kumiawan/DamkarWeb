# Damkar Access (Development)

Damkar Access is a digital platform designed to support fire department operations with real-time information, faster response, and better coordination during emergencies.

# +++>

How to contribute to this shity project :

noted! make sure you run this command from terminal or gitbash

1. clone this project

```bash
git clone https://github.com/21au/DamkarWeb.git && cd DamkarWeb
```

2. install vendor from nodejs
   require nodejs v22^ or latest version, run this command :

```bash
npm install
```

3. composer install

```bash
composer install
```

4. Migrate database seeder

```bash
php artisan migrate:fresh --seeder
```

you can find user and password at file DatabaseSeeder.php or just make one for yourself

5. Run as project Development (running on background)

```bash
npm run dev
```

Then open new terminal to run laravel

6. Run laravel (running on background)

```bash
php artisan serve
```
