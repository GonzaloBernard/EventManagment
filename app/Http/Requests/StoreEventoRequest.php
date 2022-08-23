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
                'date_format:' . config('project.date_format'),
                'nullable',
            ],
        ];
    }
}
