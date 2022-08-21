<?php

namespace App\Models;

use \DateTimeInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingreso extends Model
{
    //use HasAdvancedFilter;
    use SoftDeletes;
    use HasFactory;

    public $table = 'ingreso';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'descripcion',
        'monto',
        'fecha',
        'medio_de_pago_id',
        'evento_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function medioDePago()
    {
        return $this->belongsTo(MedioDePago::class);
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
