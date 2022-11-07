<?php

namespace Database\Seeders;

use App\Models\Evento;
use App\Models\EgresoCategoria;
use App\Models\MedioDePago;
use App\Models\Lugar;
use Illuminate\Database\Seeder;

class InitialSeeders extends Seeder
{
    public function run()
    {
        $egreso_categoria = [
            [
                'id'    => 1,
                'descripcion' => 'Bebida',
            ],
            [
                'id'    => 2,
                'descripcion' => 'Comida',
            ],
            [
                'id'    => 3,
                'descripcion' => 'Otro',
            ],
        ];

        EgresoCategoria::insert($egreso_categoria);

        $medio_de_pago = [
            [
                'id'    => 1,
                'descripcion' => 'Efectivo',
            ],
            [
                'id'    => 2,
                'descripcion' => 'Transferencia',
            ],
            [
                'id'    => 3,
                'descripcion' => 'Tarjeta',
            ],
            [
                'id'    => 4,
                'descripcion' => 'BilleteraSF',
            ],
            [
                'id'    => 5,
                'descripcion' => 'Otro',
            ]
        ];

        MedioDePago::insert($medio_de_pago);

        $lugar = [
            [
                'id'    => 1,
                'descripcion' => 'Pelotero',
            ],
            [
                'id'    => 2,
                'descripcion' => 'Otro',
            ],
        ];

        Lugar::insert($lugar);

    }
}
