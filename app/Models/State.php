<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'country_id','lat','lng'];
    public function country() {
        return $this->belongsTo(Country::class, 'country_id');
    }
    public function ingredient() {
        return $this->morphToMany(Ingredient::class, 'ingredientable');
    }
}
