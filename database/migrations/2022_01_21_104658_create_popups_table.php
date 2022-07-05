<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePopupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('popups', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('user_id')->unsigned();
            $table->boolean("general_all_pages_status")->comment('show popup on all pages');
            $table->string("general_name", 200);
            
            $table->float("general_popup_delay")->comment('popup_delay');
            $table->float("general_session_duration")->comment('time period until the popup reappears');


            $table->json("general_collections")->comment('show popup on collections template');
            $table->json("general_pages")->comment('show popup on pages');
            $table->json("general_country_codes")->comment('show popup on country codes');

            $table->string("design_template", 50);
            $table->string("design_popup_box_color_opacity", 100);
            $table->string("design_popup_box_background_color_opacity", 100);


            
            $table->text("design_background_image");
            $table->integer("design_popup_width");
            $table->json("design_heading");
            $table->text("design_message");
            $table->json("design_button");
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('popups');
    }
}
