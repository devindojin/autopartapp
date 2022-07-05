<?php
namespace App\Helpers;

trait HelperTrait
{
    protected $query_1 = '$num: Int';
    protected $query_2 = 'first: $num';
    protected $parameter = ['num' => 10];
    
    public function setQuery($query_1, $query_2) {
        $this->query_1 = $query_1;
        $this->query_2 = $query_2;
        return $this;
    }

    public function setParameter($parameter) {
        $this->$parameter = $parameter;
        return $this;
    }

    protected function queryBuild() {
        $finel_query = 'query('.$this->query_1.')
        {
            '.$this->attribute.'('.$this->query_2.') {
                '.$this->subQuery.'
            }
        }';
        $data = $this->shop->api()->graph($finel_query,$this->parameter);
        if ($data["errors"]) {
            dd($data);
            $response = [];
        } else {
            $response = $data["body"]->toArray();
            $response = $response['data'];
        }
        return $response;
    }
}
