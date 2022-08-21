<?php

namespace App\Models;

use \DateTimeInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Egreso extends Model
{
    //use HasAdvancedFilter;
    use SoftDeletes;
    use HasFactory;

    public $table = 'egreso';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'descripcion',
        'monto',
        'fecha',
        'egreso_categoria_id',
        'evento_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function egreso_categoria()
    {
        return $this->belongsTo(EgresoCategoria::class);
    }

    public function evento()
    {
        return $this->belongsTo(Evento::class);
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
