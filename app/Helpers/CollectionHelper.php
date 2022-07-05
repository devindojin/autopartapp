<?php
namespace App\Helpers;

use App\Helpers\HelperTrait;
use Illuminate\Support\Carbon;

class CollectionHelper
{
    use HelperTrait;

    protected $shop;
    protected $attribute = 'collections';
    protected $subQuery = "pageInfo {
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            cursor
                            node {
                                legacyResourceId
                                title
                            }
                        }";

    protected $collections = [];

    public function __construct($shop)
    {
        $this->shop = $shop;
    }

    public function collectionsAll() {
        $this->parameter['num'] = 20;
        return $this->getCollectionsWithQuery();
    }

    public function getCollectionsWithQuery($cursor = '') {
        if($cursor == '') {
            $collections = $this->queryBuild($this->shop);
            $collections = $collections['collections'];
        } else {
            if (strpos($this->query_1, ', $cursor: String') === false) {
                $this->query_1 = $this->query_1.', $cursor: String';
                $this->query_2 = $this->query_2.', after: $cursor';
            }
            $this->parameter = array_merge($this->parameter, ["cursor" => $cursor]);
            $collections = $this->queryBuild($this->shop);
            $collections = $collections['collections'];
        }




        // dd($collections);
        $this->collections = $this->collections + array_column(array_column($collections['edges'], 'node'), 'title', 'legacyResourceId');


        // dump($collections);


        if($collections["pageInfo"]["hasNextPage"]) {
            $this->getCollectionsWithQuery(end($collections["edges"])["cursor"]);
        }
        return $this->collections;
    }
}
