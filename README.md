# TEMPLATE LARAVEL VUE

**Deploy**

- cp .env.example .env file to copy example file to .env

Then edit your .env file with DB credentials and other settings.

- composer install command

- php artisan migrate --seed command

- php artisan key:generate command

- npm install

- npm run dev

If you have file/photo fields, run *php artisan storage:link command*.

Laravel Sanctum for API Auth: If you are using custom hostname for project other than 
localhost make sure that value of SANCTUM_STATEFUL_DOMAINS variable in .env file is the 
same as your hostname in browser. Example: SANCTUM_STATEFUL_DOMAINS=myproject.test


