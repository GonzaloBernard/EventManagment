# GESTION DE EVENTOS

### Tecnologías

- LARAVEL 7
- VUE 2
- HEROKU
- GOOGLE CALENDAR

# SETUP
```
cp .env.example .env
cp google-credentials.json.example google-credentials.json
```
> Editar variables de entorno en .env
> Editar configuracion de google calendar en google-credentials.json
```
composer install
php artisan migrate --seed
php artisan key:generate
npm install
npm run watch
```
