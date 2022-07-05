<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Helpers\ProductHelper;
use App\Helpers\ProductRepositoryHelper;

class AfterAuthenticateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $shop;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($shop)
    {
        //
        $this->shop = $shop;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $shop = $this->shop;
        $all_product = new ProductHelper($shop);
        $all_product = $all_product->productsAll();
        $prod_obj = new ProductRepositoryHelper($shop);
        foreach ($all_product as $all_product_value) {
            $prod_obj->addProductNode($all_product_value);
        }
    }
}
