<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'product_legacy_resource_id', 'legacy_resource_id', 'title', 'sku', 'inventory_quantity', 'deposit_amount', 'deposit_note', 'deposit_status'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
