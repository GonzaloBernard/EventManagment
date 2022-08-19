<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitialRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('egreso', function (Blueprint $table) {
            $table->unsignedBigInteger('egreso_categoria_id')->nullable();
            $table->foreign('egreso_categoria_id', 'egreso_categoria_fk_6612521')->references('id')->on('egreso_categoria');

            $table->unsignedBigInteger('evento_id')->nullable();
            $table->foreign('evento_id', 'evento_fk_6612544')->references('id')->on('evento');
        });

        Schema::table('ingreso', function (Blueprint $table) {
            $table->unsignedBigInteger('medio_de_pago_id')->nullable();
            $table->foreign('medio_de_pago_id', 'medio_de_pago_fk_6882521')->references('id')->on('medio_de_pago');

            $table->unsignedBigInteger('evento_id')->nullable();
            $table->foreign('evento_id', 'evento_fk_5821544')->references('id')->on('evento');
        });

        Schema::table('evento', function (Blueprint $table) {
            $table->unsignedBigInteger('lugar_id')->nullable();
            $table->foreign('lugar_id', 'lugar_fk_6882588')->references('id')->on('lugar');
        });
    }
}
