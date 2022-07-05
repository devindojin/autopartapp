<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
// use App\Models\User;
// use App\Helpers\OrderHelper;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\State;
use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Product;
// use App\Models\Product;
use App\Models\Variant;
use Validator;
use Storage;
use DataTables;
use App\Models\User;

class ShopifyAppApiController extends Controller
{



    public function variantGetByProductId($product_legacy_resource_id)
    {
        $variants = Variant::where('product_legacy_resource_id', $product_legacy_resource_id)->get();
        return $this->success($variants, 'found');
    }


    public function buyxgetyPost(Request $request)
    {
        $deposit = false;
        $request_data = $request->all();
        $request_data = $request_data["cart"];

        if (!empty($request_data) && array_key_exists('items', $request_data)) {
            $variant_ids = [];
            foreach ($request_data['items'] as $key => $val) {
                array_push($variant_ids, $val['variant_id']);
            }
            $variants = Variant::whereIn('legacy_resource_id', $variant_ids)->get()->toArray();

            foreach ($variants as $key => $variant) {
                $deposit = $deposit || ($variant['deposit_status'] == "true");
            }
        } else {
            $variants = [];
        }

        return response()->json(['status' => 'ok', 'variants' => $variants, 'deposit' => $deposit]);
    }


    public function createDraft(Request $request)
    {

        $selected_variant_json = $request->selected_variant_json;
        $selected_variant_db = $request->selected_variant_db;
        $selected_product_json = $request->selected_product_json;
        // dd($selected_variant_json);
        // $selected_variant_json["variant_title"]
        $line_item = [
            "id" => $selected_variant_json["id"],
            "grams" => $selected_variant_json["grams"],
            "price" => $selected_variant_json["price"],
            "product_id" => $selected_variant_json["product_id"],
            "quantity" => $request->quantity,
            "requires_shipping" => $selected_variant_json["requires_shipping"],
            "sku" => $selected_variant_json["sku"],
            // "title" => $selected_variant_json["title"],
            // "name" => $selected_variant_json["title"],
            "taxable" => (bool) $selected_variant_json["taxable"]
        ];

        if (array_key_exists('title', $selected_variant_json)) {
            if ($selected_variant_json["title"] == "Default Title") {
                $line_item["name"] = $line_item["title"] = $selected_product_json["title"];
            } else {
                $line_item["name"] = $line_item["title"] = $selected_variant_json["title"];
            }
        }

        if (array_key_exists('variant_title', $selected_variant_json)) {
            $line_item["variant_title"] = $selected_variant_json["variant_title"];
        }

        if (array_key_exists('variant_id', $selected_variant_json)) {
            $line_item["variant_id"] = $selected_variant_json["variant_id"];
        }
        if (array_key_exists('vendor', $selected_variant_json)) {
            $line_item["vendor"] = $selected_variant_json["vendor"];
        }
        if (array_key_exists('gift_card', $selected_variant_json)) {
            $line_item["gift_card"] = $selected_variant_json["gift_card"];
        }


        $line_items[] = $line_item;
        $line_item = [
            "price" => $selected_variant_db["deposit_amount"],
            "quantity" => $request->quantity,
            "title" => $line_item["name"] . '- Deposit',
            "name" => $line_item["name"] . '- Deposit',
        ];
        if (array_key_exists('variant_title', $line_item)) {
            $line_item["variant_title"] = $selected_variant_json["variant_title"] . '- Deposit';
        }
        $line_items[] = $line_item;

        $build_data = [
            "draft_order" => [
                "line_items" => $line_items,
                "currency" =>  $request->currency,
                "note" => $selected_variant_db["deposit_note"],
                // "total_price" => $request_data["total_price"],
            ]
        ];
        $draft = User::first()->api()->rest('POST', '/admin/api/2021-04/draft_orders.json', $build_data);
        return response()->json(["build_data" => $build_data, "draft" => $draft]);
    }


    public function buyxgetyCreateDraft(Request $request)
    {

        $request_data = $request->all();
        $request_data = $request_data["cart"];

        $note = '';
        foreach ($request_data["items"] as $request_data_key => $request_data_value) {

            $line_item = [
                "id" => $request_data_value["id"],
                "grams" => $request_data_value["grams"],
                "price" => $request_data_value["final_line_price"] / 100,
                "product_id" => $request_data_value["product_id"],
                "quantity" => $request_data_value["quantity"],
                "requires_shipping" => $request_data["requires_shipping"],
                "sku" => $request_data_value["sku"],
                "title" => $request_data_value["title"],
                "variant_id" => $request_data_value["variant_id"],
                "variant_title" => $request_data_value["variant_title"],
                "vendor" => $request_data_value["vendor"],
                "name" => $request_data_value["title"],
                "gift_card" => (bool) $request_data_value["gift_card"],
                "taxable" => (bool) $request_data_value["taxable"]
            ];
            $line_items[] = $line_item;
            $variant = Variant::where('legacy_resource_id', $request_data_value["variant_id"])->first();
            // return response()->json($variant->deposit_status);
            if ($variant->deposit_status == "true") {
                $line_item = [
                    "price" => $variant->deposit_amount,
                    "quantity" => $request_data_value["quantity"],
                    "title" => $request_data_value["title"] . '- Deposit',
                    "variant_title" => $request_data_value["variant_title"] . '- Deposit',
                    "name" => $request_data_value["title"] . '- Deposit',
                ];
                $line_items[] = $line_item;
                $note .= $variant->deposit_note;
            }
        }
        // return response()->json($line_items);
        $build_data = [
            "draft_order" => [
                "line_items" => $line_items,
                "currency" =>  $request_data["currency"],
                "note" => $note,
                "total_price" => $request_data["total_price"],
            ]
        ];
        // dd($build_data);
        // return response()->json(["build_data" => $build_data]);
        $draft = User::first()->api()->rest('POST', '/admin/api/2021-04/draft_orders.json', $build_data);
        return response()->json(["build_data" => $build_data, "draft" => $draft]);
    }


    // public function getData(Request $request) {
    //     $shop = User::where('name', $request->shop)->first();
    //     $order_helper = new OrderHelper($shop);
    //     $data = $order_helper->getOrders($request);
    //     return response()->json($data, 200);
    // }


    public function variantGet(Request $request)
    {

        $variant = Variant::with('product');
        // dd($variant);
        return Datatables::of($variant)
            ->editColumn('deposit_amount', function ($variant) {
                return '
                    <span>$<span class="editable">' . $variant->deposit_amount . '</span></span>
                    <button class="btn btn-sm btn-outline-primary" data-edit="deposit_amount" data-variant_id="' . $variant->id . '">
                        <i class="fa fa-edit"></i>
                    </button>
                ';
            })
            ->editColumn('deposit_note', function ($variant) {
                return '
                    <span class="editable">' . $variant->deposit_note . '</span>
                    <button class="btn btn-sm btn-outline-primary" data-edit="deposit_note" data-variant_id="' . $variant->id . '">
                        <i class="fa fa-edit"></i>
                    </button>
                ';
            })
            ->editColumn('deposit_status', function ($variant) {
                // dd($variant->deposit_status == 'true');
                $checked = ($variant->deposit_status == 'true') ? 'checked' : '';
                return '<input data-variant_id="' . $variant->id . '" value="true" ' . $checked . ' type="checkbox" name="my-checkbox" data-bootstrap-switch data-off-color="danger" data-on-color="success">';
            })
            ->rawColumns(['deposit_amount', 'deposit_note', 'deposit_status'])
            ->make(true);
    }


    public function variantUpdate(Request $request, Variant $variant)
    {
        // dd($request->all());
        $variant->update($request->only(['deposit_status', 'deposit_amount', 'deposit_note']));
        return $this->success($variant, 'Successfull updated');
    }


    // public function categoryGet()
    // {
    //     $category = Category::latest()->get();
    //     return $this->success($category);
    // }
    // public function categoryDetail(Category $category)
    // {
    //     return $this->success($category);
    // }
    // public function categoryAdd(Request $request)
    // {
    //     // dd('ok');
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:categories,name'
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     $category = Category::create([
    //         'name' => $request->name
    //     ]);
    //     return $this->success($category, 'Successfully Saved !');
    // }
    // public function categoryUpdate(Category $category, Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:categories,name,' . $category->id
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     $category = $category->update([
    //         'name' => $request->name
    //     ]);
    //     return $this->success($category, 'Successfully Updated !');
    // }
    // public function categoryDelete(Category $category)
    // {
    //     $category->delete();
    //     return $this->success($category, 'Successfully Deleted !');
    // }













    // public function countryGet()
    // {
    //     $country = Country::latest()->get();
    //     return $this->success($country);
    // }
    // public function countryDetail(Country $country)
    // {
    //     return $this->success($country);
    // }
    // public function countryAdd(Request $request)
    // {
    //     // dd('ok');
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:countries,name',
    //         'lat' => 'required',
    //         'lng' => 'required'
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     $country = Country::create([
    //         'name' => $request->name,
    //         'lat' => $request->lat,
    //         'lng' => $request->lng
    //     ]);
    //     return $this->success($country, 'Successfully Saved !');
    // }
    // public function countryUpdate(Country $country, Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:countries,name,' . $country->id,
    //         'lat' => 'required',
    //         'lng' => 'required'
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     $country = $country->update([
    //         'name' => $request->name,
    //         'lat' => $request->lat,
    //         'lng' => $request->lng
    //     ]);
    //     return $this->success($country, 'Successfully Updated !');
    // }
    // public function countryDelete(Country $country)
    // {
    //     $country->delete();
    //     return $this->success($country, 'Successfully Deleted !');
    // }

    // public function stateGet(Country $country)
    // {
    //     return $this->success($country->state()->get());
    // }
    // public function stateDetail(State $state)
    // {
    //     return $this->success($state);
    // }
    // public function stateAdd(Request $request, Country $country)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:states,name',
    //         'lat' => 'required',
    //         'lng' => 'required'
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     $country = $country->state()->create([
    //         'name' => $request->name,
    //         'lat' => $request->lat,
    //         'lng' => $request->lng
    //     ]);
    //     return $this->success($country, 'Successfully Saved !');
    // }
    // public function stateUpdate(Request $request, State $state)
    // {

    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:states,name,' . $state->id,
    //         'lat' => $request->lat,
    //         'lng' => $request->lng
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     $country = $state->update([
    //         'name' => $request->name,
    //         'lat' => $request->lat,
    //         'lng' => $request->lng
    //     ]);
    //     return $this->success($country, 'Successfully Updated !');
    // }
    // public function stateDelete(State $state)
    // {
    //     // dd($state);
    //     $state->delete();
    //     return $this->success($state, 'Successfully Deleted !');
    // }

    // public function ingredientGet()
    // {
    //     // $ingredient = Ingredient::latest()->with(['country', 'category'])->get();
    //     $ingredient = Ingredient::with(['country', 'category'])->orderBy('order', 'ASC')->get();
    //     return $this->success($ingredient);
    // }
    // public function ingredientDetail($ingredient)
    // {
    //     // dd($ingredient);
    //     $ingredient = ingredient::with(['country', 'state'])->where('id', $ingredient)->first();
    //     // $ingredient = $ingredient->country()->state()->get();
    //     // dd($ingredient);
    //     return $this->success($ingredient);
    // }
    // public function ingredientAdd(Request $request)
    // {

    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|unique:ingredients,name',
    //         'image'  => 'required|mimes:png,jpg|max:1024',
    //         'category_id' => 'required',
    //         'content' => 'required',
    //         'country_id' => 'required',
    //         // 'state_id' => 'required_without:country_id|exists:states,id',
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }


    //     $image = $request->image;
    //     // $image_name = time().'.'.$image->getClientOriginalExtension();

    //     // $image
    //     // Storage::disk('local')->put('ingredient/'.$image_name, $image);
    //     // dd(Storage::disk('public'));
    //     $image_name = Storage::disk('public')->put('ingredient', $image);
    //     // dd($image_name);

    //     $ingredient = new Ingredient;
    //     $ingredient->name = $request->name;
    //     $ingredient->category_id = $request->category_id;
    //     $ingredient->content = $request->content;
    //     $ingredient->image = $image_name;
    //     $ingredient->save();
    //     if ($request->has('country_id')) {
    //         $country_ids = json_decode($request->country_id);
    //         $country_state = Country::find($country_ids);
    //         $ingredient->country()->sync($country_state);
    //         // dd($country_state);
    //     }
    //     if ($request->has('state_id')) {
    //         $state_ids = json_decode($request->state_id);
    //         $country_state = State::find($state_ids);
    //         $ingredient->state()->sync($country_state);
    //     }

    //     // $ingredient = $category->ingredients()->save($ingredient);
    //     // $ingredient = $ingredient->save();

    //     // $country_state->ingredient()->save($ingredient);

    //     return $this->success($ingredient, 'Successfully Saved !');
    // }
    // public function ingredientUpdate(Request $request, Ingredient $ingredient)
    // {

    //     $validator_input = [];
    //     if ($request->has('name')) {
    //         $validator_input['name'] = 'required|unique:ingredients,name,' . $ingredient->id;
    //     }
    //     if ($request->has('image')) {
    //         $validator_input['image'] = 'required|mimes:png,jpg|max:1024';
    //     }
    //     if ($request->has('category_id')) {
    //         $validator_input['category_id'] = 'required';
    //     }
    //     if ($request->has('content')) {
    //         $validator_input['content'] = 'required';
    //     }
    //     $validator = Validator::make($request->all(), $validator_input);

    //     if ($validator->fails()) {
    //         return $this->error($validator->errors());
    //     }

    //     if ($request->has('image')) {
    //         $image = $request->image;
    //         Storage::disk('public')->delete($ingredient->image);
    //         $image_name = Storage::disk('public')->put('ingredient', $image);
    //         $ingredient->image = $image_name;
    //     }

    //     if ($request->has('name')) {
    //         $ingredient->name = $request->name;
    //     }
    //     if ($request->has('category_id')) {
    //         $ingredient->category_id = $request->category_id;
    //     }
    //     if ($request->has('content')) {
    //         $ingredient->content = $request->content;
    //     }


    //     $ingredient->save();

    //     if ($request->has('country_id')) {
    //         $country_ids = json_decode($request->country_id);
    //         $country_state = Country::find($country_ids);
    //         $ingredient->country()->sync($country_state);
    //         $state = $ingredient->state();
    //         $state->detach();
    //     }
    //     if ($request->has('state_id')) {
    //         $state_ids = json_decode($request->state_id);
    //         $country_state = State::find($state_ids);
    //         $ingredient->state()->sync($country_state);
    //         $country = $ingredient->country();
    //         $country->detach();
    //     }

    //     return $this->success($ingredient, 'Successfully Saved !');
    // }
    // public function ingredientDelete(Ingredient $ingredient)
    // {
    //     Storage::disk('public')->delete($ingredient->image);
    //     $ingredient->delete();
    //     return $this->success($ingredient, 'Successfully Deleted !');
    // }


    // public function ingredientOrder(Request $request)
    // {
    //     $data = $request->all();
    //     foreach ($data as $key => $value) {
    //         $data['order'] = $key + 1;
    //         Ingredient::where('id', $value['id'])->update(['order' => $key + 1]);
    //     }
    //     return $this->success($data);
    // }

    private function success($data, $message = '')
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], 200);
    }
    private function error($errors)
    {
        return response()->json([
            'errors' => $errors
        ], 400);
    }
}
