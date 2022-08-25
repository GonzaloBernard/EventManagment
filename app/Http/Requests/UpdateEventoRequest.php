<?php

namespace App\Http\Requests;

use App\Models\Evento;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateEventoRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('contact_company_edit');
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
            'fecha' => [
                'date_format:Y-m-d H:i:s',
                'nullable',
            ],
            'color' => [
                'string',
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
        ];
    }
}
