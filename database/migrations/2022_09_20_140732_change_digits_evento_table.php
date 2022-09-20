<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDigitsEventoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evento', function (Blueprint $table) {
            $table->float('precio',10,2)->change();
        });
        Schema::table('ingreso', function (Blueprint $table) {
            $table->float('monto',10,2)->change();
        });
        Schema::table('egreso', function (Blueprint $table) {
            $table->float('monto',10,2)->change();
        });
    }
}
