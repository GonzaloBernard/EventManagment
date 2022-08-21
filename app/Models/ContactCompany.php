<?php

namespace App\Models;

use \DateTimeInterface;
//use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactCompany extends Model
{
    //use HasAdvancedFilter;
    use SoftDeletes;
    use HasFactory;

    public $table = 'contact_companies';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $orderable = [
        'id',
        'company_name',
        'company_address',
        'company_website',
        'company_email',
    ];

    protected $filterable = [
        'id',
        'company_name',
        'company_address',
        'company_website',
        'company_email',
    ];

    protected $fillable = [
        'company_name',
        'company_address',
        'company_website',
        'company_email',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
