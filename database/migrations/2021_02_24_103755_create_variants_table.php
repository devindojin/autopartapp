<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->bigInteger('product_legacy_resource_id')->nullable();
            $table->bigInteger('legacy_resource_id')->nullable();
            $table->text('title')->nullable();
            $table->text('sku')->nullable();
            $table->bigInteger('inventory_quantity')->nullable();

            $table->float('deposit_amount')->default(0);
            $table->text('deposit_note')->nullable();
            $table->enum('deposit_status', ['true', 'false'])->default('false');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('variants');
    }
}
