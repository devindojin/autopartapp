<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Osiset\ShopifyApp\Contracts\Commands\Shop;
class ShopifyAppController extends Controller
{
    //
    public function index(Request $request) {
        return view('admin.index');
    }
    
    
}
