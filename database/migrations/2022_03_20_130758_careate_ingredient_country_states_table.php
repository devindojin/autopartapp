<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CareateIngredientCountryStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('ingredientables', function (Blueprint $table) {
            $table->bigInteger('ingredient_id')->unsigned();
            // $table->bigInteger('ingredientable_id');
            // $table->bigInteger('ingredientable_type');
            $table->morphs('ingredientable');
            $table->foreign('ingredient_id')->references('id')->on('ingredients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('ingredient_country_states');
    }
}
