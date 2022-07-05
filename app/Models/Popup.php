<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "general_name",
        "general_all_pages_status",
        "general_popup_delay",
        "general_session_duration",
        "general_collections",
        "general_pages",
        "general_country_codes",
        "design_template",
        "design_popup_box_color_opacity",
        "design_popup_box_background_color_opacity",
        "design_background_image",
        "design_popup_width",
        "design_heading",
        "design_message",
        "design_button",
        "status"
    ];

    protected $casts = [
        "general_collections" => 'array', 
        "general_pages" => 'array', 
        "general_country_codes" => 'array', 
        "design_heading" => 'array', 
        "design_button" => 'array',
    ];
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
