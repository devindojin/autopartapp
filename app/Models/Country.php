<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $fillable = ['name','lat','lng'];
    public function state() {
        return $this->hasMany(State::class, 'country_id');
    }
    public function ingredient() {
        return $this->morphToMany(Ingredient::class, 'ingredientable');
    }
}
