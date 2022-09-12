<?php

namespace App\Http\Requests;

use App\Models\Ingreso;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreIngresoRequest extends FormRequest
{
    public function authorize()
    {
        return true;//Gate::allows('');
    }

    public function rules()
    {
        return [
            'monto' => [
                'numeric',
                'required',
            ],
            'fecha' => [
                'date_format:Y-m-d H:i:s',
                'nullable',
            ],
            'medio_de_pago_id' => [
                'integer',
                'required'
            ],
            'evento_id' => [
                'integer',
                'required'
            ],
        ];
    }
}
