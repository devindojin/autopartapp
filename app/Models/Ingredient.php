<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    protected $fillable = ['category_id','name','image','content'];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function country() {
        return $this->morphedByMany(Country::class, 'ingredientable');
    }
    public function state() {
        return $this->morphedByMany(State::class, 'ingredientable');
    }
}
