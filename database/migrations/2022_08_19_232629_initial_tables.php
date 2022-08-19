<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitialTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medio_de_pago', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descripcion');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('ingreso', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->float('monto');
            $table->timestamp('fecha');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('egreso_categoria', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descripcion');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('egreso', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->float('monto');
            $table->timestamp('fecha');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('lugar', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descripcion');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('evento', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descripcion');
            $table->string('cliente');
            $table->timestamp('fecha');
            $table->timestamps();
            $table->softDeletes();
        });
    }
}
