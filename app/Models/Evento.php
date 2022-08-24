<?php

namespace App\Models;

use \DateTimeInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Evento extends Model
{
    use SoftDeletes;
    use HasFactory;

    public $table = 'evento';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'nombre',
        'descripcion',
        'cliente',
        'fecha',
        'duracion',
        'lugar_id',
        'google_calendar_id',
        'color',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function lugar()
    {
        return $this->belongsTo(Lugar::class);
    }

    public function ingresos()
    {
        return $this->hasMany(Ingreso::class);
    }
    public function egresos()
    {
        return $this->hasMany(Egreso::class);
    }
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
