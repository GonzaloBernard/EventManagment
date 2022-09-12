<?php

namespace App\Http\Requests;

use App\Models\EgresoCategoria;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreEgresoCategoriaRequest extends FormRequest
{
    public function authorize()
    {
        return true;//Gate::allows('');
    }

    public function rules()
    {
        return [
        ];
    }
}
