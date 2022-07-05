<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['shop_id','legacy_resource_id','title','status'];
    public function collections() {
        return $this->belongsToMany(Product::class, 'product_collections');
    }

    public function variants() {
        return $this->hasMany(Variant::class, 'product_id');
    }
}
