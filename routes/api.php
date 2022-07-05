<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Route::post('get-data', [App\Http\Controllers\Api\ShopifyAppApiController::class,'getData'])->name('get_data');

Route::get('variant-get', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'variantGet'])->name('variant_get');
Route::post('variant-update/{variant?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'variantUpdate'])->name('variant_update');
// Route::get('buyxgety_embed.js', [App\Http\Controllers\StoreController::class, 'embed'])->name('buyxgety_embed');
Route::post('buyxgety-post', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'buyxgetyPost'])->name('buyxgety_post');
Route::post('buyxgety-create-draft', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'buyxgetyCreateDraft'])->name('buyxgety_create_draft');


Route::post('create-draft', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'createDraft'])->name('create_draft');


Route::get('variant-get-by-product_id/{product_legacy_resource_id?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'variantGetByProductId'])->name('variant_get_by_product_id');


// Route::get('category-get', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'categoryGet'])->name('category_get');
// Route::post('category-detail/{category?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'categoryDetail'])->name('category_detail');
// Route::post('category-add', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'categoryAdd'])->name('category_add');
// Route::post('category-update/{category?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'categoryUpdate'])->name('category_update');
// Route::delete('category-delete/{category?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'categoryDelete'])->name('category_delete');


// Route::get('country-get', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'countryGet'])->name('country_get');
// Route::post('country-detail/{country?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'countryDetail'])->name('country_detail');
// Route::post('country-add', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'countryAdd'])->name('country_add');
// Route::post('country-update/{country?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'countryUpdate'])->name('country_update');
// Route::delete('country-delete/{country?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'countryDelete'])->name('country_delete');

// Route::get('country/{country?}/state-get', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'stateGet'])->name('state_get');
// Route::post('country/{country?}/state-detail/{state?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'stateDetail'])->name('state_detail');
// Route::post('country/{country?}/state-add', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'stateAdd'])->name('state_add');
// Route::post('country/{country?}/state-update/{state?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'stateUpdate'])->name('state_update');
// Route::delete('state-delete/{state?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'stateDelete'])->name('state_delete');

// Route::get('ingredient-get', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'ingredientGet'])->name('ingredient_get');
// Route::get('ingredient-detail/{ingredient?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'ingredientDetail'])->name('ingredient_detail');
// Route::post('ingredient-add', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'ingredientAdd'])->name('ingredient_add');
// Route::post('ingredient-update/{ingredient?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'ingredientUpdate'])->name('ingredient_update');
// Route::delete('ingredient-delete/{ingredient?}', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'ingredientDelete'])->name('ingredient_delete');

// Route::post('ingredient-order', [App\Http\Controllers\Api\ShopifyAppApiController::class, 'ingredientOrder'])->name('ingredient_order');
