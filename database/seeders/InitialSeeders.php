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
        ];

        EgresoCategoria::insert($egreso_categoria);

        $medio_de_pago = [
            [
                'id'    => 1,
                'descripcion' => 'Efectivo',
            ]
        ];

        MedioDePago::insert($medio_de_pago);

        $lugar = [
            [
                'id'    => 1,
                'descripcion' => 'Pelotero',
            ],
        ];

        Lugar::insert($lugar);


        $eventos = [
            [
                'id'    => 1,
                'nombre' => 'Cumpleaños',
                'descripcion' => 'Esto es una descripcion 1',
                'cliente' => 'Gonzalo',
                'fecha' => '2022-08-20',
                'lugar_id' => 1,
                'color' => '#33B8FF'
            ],
            [
                'id'    => 2,
                'nombre' => 'Cumpleaños',
                'descripcion' => 'Esto es una descripcion 2',
                'cliente' => 'Gonzalo',
                'fecha' => '2022-08-20',
                'lugar_id' => 1,
                'color' => '#33B8FF'
            ],
            [
                'id'    => 3,
                'nombre' => 'Cumpleaños',
                'descripcion' => 'Esto es una descripcion 3',
                'cliente' => 'Gonzalo',
                'fecha' => '2022-08-20',
                'lugar_id' => 1,
                'color' => '#33B8FF'
            ],
            [
                'id'    => 4,
                'nombre' => 'Cumpleaños',
                'descripcion' => 'Esto es una descripcion 4',
                'cliente' => 'Gonzalo',
                'fecha' => '2022-08-20',
                'lugar_id' => 1,
                'color' => '#33B8FF'
            ],
            [
                'id'    => 5,
                'nombre' => 'Cumpleaños',
                'descripcion' => 'Esto es una descripcion 5',
                'cliente' => 'Gonzalo',
                'fecha' => '2022-08-20',
                'lugar_id' => 1,
                'color' => '#33B8FF'
            ],
            [
                'id'    => 6,
                'nombre' => 'Cumpleaños',
                'descripcion' => 'Esto es una descripcion 6',
                'cliente' => 'Gonzalo',
                'fecha' => '2022-08-20',
                'lugar_id' => 1,
                'color' => '#33B8FF'
            ],

        ];

        Evento::insert($eventos);
}
}
