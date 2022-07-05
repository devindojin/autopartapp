<?php
namespace App\Helpers;
use App\Helpers\HelperTrait;

class ProductHelper
{
    use HelperTrait;

    protected $shop;
    protected $attribute = 'products';
    protected $subQuery = "pageInfo {
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            cursor
                            node {
                                legacyResourceId
                                title
                                status                              
                                collections(first: 20) {
                                    edges {
                                        node {
                                            legacyResourceId
                                            title
                                        }
                                    }
                                }
                                variants(first: 20) {
                                    edges {
                                        node {
                                            legacyResourceId
                                            title
                                            sku
                                            inventoryQuantity
                                        }
                                    }
                                }
                            }
                        }";

    protected $products = [];

    public function __construct($shop) {
        $this->shop = $shop;
    }

    public function productsAll($cursor = '')
    {
        $this->parameter = ["num" => 20];
        if($cursor == '') {
            $products = $this->queryBuild($this->shop);
            $products = $products['products'];
        } else {
            if (strpos($this->query_1, ', $cursor: String') === false) {
                $this->query_1 = $this->query_1.', $cursor: String';
                $this->query_2 = $this->query_2.', after: $cursor';
            }
            $this->parameter = array_merge($this->parameter, ["cursor" => $cursor]);
            $products = $this->queryBuild($this->shop);
            $products = $products['products'];
        }
        $this->products = array_merge($this->products, $products["edges"]);
        if($products["pageInfo"]["hasNextPage"]) {
            $this->productsAll(end($products["edges"])["cursor"]);
        }
        return $this->products;
    }
}
