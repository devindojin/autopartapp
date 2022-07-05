<?php
namespace App\Helpers;

use App\Models\Product;
use App\Models\Variant;
use App\Models\Collection;

class ProductRepositoryHelper
{
    public function __construct($shop) {
        $this->shop = $shop;
    }

    public function addProductNode($all_product_value) {
        $product = Product::firstOrCreate(['shop_id' => $this->shop->id, 'legacy_resource_id' => $all_product_value["node"]["legacyResourceId"]]);
        $product->title = $all_product_value["node"]["title"];
        $product->status = $all_product_value["node"]["status"];
        $product->save();
        foreach ($all_product_value["node"]["variants"]["edges"] as $variant_value) {
            $variant = Variant::firstOrCreate(["product_id" => $product->id, "product_legacy_resource_id" => $all_product_value["node"]["legacyResourceId"], "legacy_resource_id" => $variant_value["node"]["legacyResourceId"]]);
            $variant->title = $variant_value["node"]["title"];
            $variant->sku = $variant_value["node"]["sku"];
            $variant->inventory_quantity = $variant_value["node"]["inventoryQuantity"];
            $variant->save();
        }
        // foreach ($all_product_value["node"]["collections"]["edges"] as $collection_value) {
        //     $temp_1 = [];
        //     $temp_1["legacy_resource_id"] = $collection_value["node"]["legacyResourceId"];
        //     $temp_1["title"] = $collection_value["node"]["title"];
        //     $temp["collections"][] = $temp_1;
        // }
    }

    public function addProduct($product_data) {
        $product = Product::firstOrCreate(['shop_id' => $this->shop->id, 'legacy_resource_id' => $product_data["id"]]);
        $product->title = $product_data["title"];
        $product->status = $product_data["status"];
        $product->save();
        foreach ($product_data["variants"] as $variant_value) {
            $variant = Variant::firstOrCreate(["product_id" => $product->id, "product_legacy_resource_id" => $product_data["id"], "legacy_resource_id" => $variant_value["id"]]);
            $variant->title = $variant_value["title"];
            $variant->sku = $variant_value["sku"];
            $variant->inventory_quantity = $variant_value["inventory_quantity"];
            $variant->save();
        }
    }

    public function deleteProduct($product_data) {
        Product::where('legacy_resource_id',$product_data->id)->delete();
    }

    public function updateProduct($product_data) {
        // dump($product_data);
        $product = Product::firstOrCreate(['shop_id' => $this->shop->id, 'legacy_resource_id' => $product_data["id"]]);
        $product->title = $product_data["title"];
        $product->status = $product_data["status"];
        $product->save();
        foreach ($product_data["variants"] as $variant_value) {
            $variant = Variant::firstOrCreate(["product_id" => $product->id, "product_legacy_resource_id" => $product_data["id"], "legacy_resource_id" => $variant_value["id"]]);
            $variant->title = $variant_value["title"];
            $variant->sku = $variant_value["sku"];
            $variant->inventory_quantity = $variant_value["inventory_quantity"];
            $variant->save();
        }
    }
}