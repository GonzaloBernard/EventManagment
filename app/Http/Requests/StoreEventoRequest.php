<?php

namespace App\Http\Requests;

use App\Models\Evento;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreEventoRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('user_management_access');
    }

    public function rules()
    {
        return [
            'nombre' => [
                'string',
                'nullable',
            ],
            'descripcion' => [
                'string',
                'nullable',
            ],
            'cliente' => [
                'string',
                'nullable',
            ],
            'color' => [
                'string',
                'nullable',
            ],
            'fecha' => [
                'date_format:Y-m-d H:i:s',
                'nullable',
            ],
            'lugar_id' => [
                'integer',
                'nullable',
            ],
            'duracion' => [
                'string',
                'nullable',
            ],
            'precio' => [
                'numeric',
                'nullable',
            ],
            'agasajado' => [
                'string',
                'nullable',
            ],
        ];
    }
}
