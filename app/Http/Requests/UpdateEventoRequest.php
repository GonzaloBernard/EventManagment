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
            'descripcion' => [
                'string',
                'nullable',
            ],
            'cliente' => [
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
