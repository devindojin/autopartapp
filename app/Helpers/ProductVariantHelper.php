<?php
namespace App\Helpers;
use App\Helpers\HelperTrait;

class ProductVariantHelper
{
    use HelperTrait;

    protected $shop;
    protected $attribute = 'productVariants';
    protected $subQuery = "pageInfo {
                                hasNextPage
                                hasPreviousPage
                            }
                            edges {
                                cursor
                                node {
                                    legacyResourceId
                                    inventoryQuantity
                                    title
                                    sku
                                    barcode
                                    price
                                    inventoryItem {
                                        inventoryLevels(first: 20) {
                                            edges {
                                                node {
                                                    id
                                                    location {
                                                        legacyResourceId
                                                        name
                                                    }
                                                    available
                                                }
                                            }
                                        }
                                    }
                                    product {
                                        legacyResourceId
                                        title
                                        collections(first: 20) {
                                            edges {
                                                node {
                                                    title
                                                }
                                            }
                                        }
                                    }
                                }
                            }";

    protected $variants = [];

    public function __construct($shop) {
        $this->shop = $shop;
    }

    // public function productsAll($cursor = '')
    // {
    //     $this->parameter = ["num" => 20];
    //     if($cursor == '') {
    //         $products = $this->queryBuild($this->shop);
    //         $products = $products['products'];
    //     } else {
    //         $this->query_1 = $this->query_1.', $cursor: String';
    //         $this->query_2 = $this->query_2.', after: $cursor';
    //         $this->parameter = $this->parameter + ["cursor" => $cursor];
    //         $products = $this->queryBuild($this->shop);
    //         $products = $products['products'];
    //     }
    //     $this->products = array_merge($this->products, $products["edges"]);
    //     if($products["pageInfo"]["hasNextPage"]) {
    //         $this->productsAll(end($products["edges"])["cursor"]);
    //     }
    //     return $this->products;
    // }

    // public function getVariantsByids($ids, $cursor = '') {
    //     if($cursor == '') {
    //         $this->query_1 = $this->query_1.', $query: String';
    //         $this->query_2 = $this->query_2.', query: $query';
    //         // dd($ids);
    //         $query = 'id:'.implode(' OR id:',$ids);
    //         // dd($query);
    //         $this->parameter = $this->parameter + ["query" => $query];
    //         $variants = $this->queryBuild($this->shop);
    //         // dd($variants);
    //         $variants = $variants['productVariants'];
    //     } else {
    //         $this->query_1 = $this->query_1.', $cursor: String';
    //         $this->query_2 = $this->query_2.', after: $cursor';
    //         $this->parameter = $this->parameter + ["cursor" => $cursor];
    //         $variants = $this->queryBuild($this->shop);
    //         $variants = $variants['productVariants'];
    //     }
    //     $this->variants = array_merge($this->variants, $variants["edges"]);
    //     if($variants["pageInfo"]["hasNextPage"]) {
    //         $this->getVariantsByids($ids, end($variants["edges"])["cursor"]);
    //     }
    //     return $this->variants;
    // }


    public function getVariants($request, $export = false) {
        $query_1 = '$num: Int!';
        $query_2 = '';
        $parameter = $this->parameter;
        if($request->type == 'paginate') {
            $query_1 .= ', $cursor: String';
            $query_2 .= ($request->paginate_type == 'next') ? 'first: $num, after:':'last: $num, before:';
            $query_2 .= ' $cursor';
            $parameter['cursor'] = $request->cursor;
        } else {
            $query_2 .= 'first: $num';
        }
        if($request->has('products') || $request->has('collections') || $request->has('inventory_quantity') || $request->has('locations')) {
            $query_1 .= ', $query: String';
            $query_2 .= ', query: $query';
            $query_temp = [];
            if($request->has('products')) {
                $query_temp[] = '(product_id:'.implode(' OR product_id:',$request->products).')';
            }
            if($request->has('collections')) {
                $query_temp[] = '(collection:'.implode(' OR collection:',$request->collections).')';
            }
            if($request->has('locations')) {
                $query_temp[] = '(locations:'.implode(' OR locations:',$request->locations).')';
            }
            if($request->has('inventory_quantity')) {
                $query_temp[] = '(inventory_quantity:<'.$request->inventory_quantity.')';
            }
            $parameter['query'] = implode(' AND ',$query_temp);
        }

        if($export) {
            if(array_key_exists('query',$parameter)) {
                $query = $parameter['query'];
            } else {
                $query = '';
            }
            // dd($this->getAllVariantsWithQuery($query));
            return $this->getAllVariantsWithQuery($query);
        } else {
            $this->query_1 = $query_1;
            $this->query_2 = $query_2;
            $this->parameter = $parameter;
            return $this->queryBuild($this->shop)['productVariants'];
        }
    }

    public function getVariantsByids($ids) {
        $query = 'id:'.implode(' OR id:',$ids);
        return $this->getAllVariantsWithQuery($query);
    }

    public function getVariantsWithQuantity($quantity) {
        return $this->getAllVariantsWithQuery("inventory_quantity:<$quantity");
    }


    public function getVariantsByIdsWithQuantity($ids, $quantity) {
        // $this->parameter = ["num" => 1];
        if(gettype($quantity) != 'array') {
            $query = '(id:'.implode(' OR id:',$ids).')'." inventory_quantity:<$quantity";
        } else {

            $query = '(id:'.implode(' OR id:',$ids).')';
            $temp_query = [];
            foreach ($quantity as $key => $value) {
                $temp_query[] = "(collection:$key AND inventory_quantity:<$value)";
            }
            $query .= " ".implode(' OR ', $temp_query);
        }
        // dd($query);
        return $this->getAllVariantsWithQuery($query);
    }


    public function getVariantsWithQuantityAndcollections($quantity_arr) {
        $query = [];
        foreach ($quantity_arr as $collection => $quantity) {
            $query[] = "(inventory_quantity:<$quantity collection:$collection)";
        }
        return $this->getAllVariantsWithQuery(implode(' OR ',$query));
    }


    public function getVariantsWithQuantityAndproducts($quantity_arr) {
        $query = [];
        foreach ($quantity_arr as $product_id => $quantity) {
            $query[] = "(inventory_quantity:<$quantity product_id:$product_id)";
        }
        // dump(implode(' OR ',$query));
        return $this->getAllVariantsWithQuery(implode(' OR ',$query));
    }


    /*public function getVariantsWithQuery($query, $cursor = '') {
        if($cursor == '') {
            $this->query_1 = $this->query_1.', $query: String';
            $this->query_2 = $this->query_2.', query: $query';

            $this->parameter = array_merge($this->parameter, ["query" => $query]);
            $variants = $this->queryBuild($this->shop);
            $variants = $variants['productVariants'];
        } else {
            $this->query_1 = $this->query_1.', $cursor: String';
            $this->query_2 = $this->query_2.', after: $cursor';
            $this->parameter = array_merge($this->parameter, ["cursor" => $cursor]);
            // dump($this);
            $variants = $this->queryBuild($this->shop);
            $variants = $variants['productVariants'];
        }
        return $this->variants;
    }*/


    public function getAllVariantsWithQuery($query, $cursor = '') {
        if($cursor == '') {
            $this->query_1 = $this->query_1.', $query: String';
            $this->query_2 = $this->query_2.', query: $query';

            $this->parameter = array_merge($this->parameter, ["query" => $query]);
            $variants = $this->queryBuild($this->shop);
            $variants = $variants['productVariants'];
        } else {
            if (strpos($this->query_1, ', $cursor: String') === false) {
                $this->query_1 = $this->query_1.', $cursor: String';
                $this->query_2 = $this->query_2.', after: $cursor';
            }
            $this->parameter = array_merge($this->parameter, ["cursor" => $cursor]);
            // dump($this);
            $variants = $this->queryBuild($this->shop);
            $variants = $variants['productVariants'];
        }
        $this->variants = array_merge($this->variants, $variants["edges"]);
        if($variants["pageInfo"]["hasNextPage"]) {
            $this->getAllVariantsWithQuery($query, end($variants["edges"])["cursor"]);
        }
        return $this->variants;
    }
}
