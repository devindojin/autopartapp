<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = ['legacy_resource_id','title'];

    public function products() {
        return $this->belongsToMany(Collection::class, 'product_collections');
    }
}
