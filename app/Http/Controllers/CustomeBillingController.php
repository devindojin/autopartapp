<?php

namespace App\Http\Controllers;

use Osiset\ShopifyApp\Traits\BillingController as BillingControllerTrait;
use Illuminate\Http\Request;
use Osiset\ShopifyApp\Storage\Queries\Shop as ShopQuery;
use Osiset\ShopifyApp\Actions\GetPlanUrl;
// use Illuminate\Contracts\View\View as ViewView;
use App\Models\Plan;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use Osiset\ShopifyApp\Objects\Values\NullablePlanId;
use Osiset\ShopifyApp\Actions\CancelCurrentPlan;

class CustomeBillingController extends Controller
{
    use BillingControllerTrait;
    public function index(
        ?int $plan = null,
        Request $request,
        ShopQuery $shopQuery,
        GetPlanUrl $getPlanUrl
    ) {
        // Get the shop
        $shop = $shopQuery->getByDomain(ShopDomain::fromNative($request->get('shop')));

        // Get the plan URL for redirect
        $url = $getPlanUrl(
            $shop->getId(),
            NullablePlanId::fromNative($plan)
        );

        // Do a fullpage redirect
        return response()->json(['url' => $url]);
    }

    public function getBillingData(Request $request, ShopQuery $shopQuery) {

        $acive_plan = ['charge' => false, 'object' => ''];
        $shop = $shopQuery->getByDomain(ShopDomain::fromNative($request->get('shop')));
        //dd($shop->charges()->get());
        foreach($shop->charges()->get() as $charge) {
            $active = $charge->isOngoing();
            if($active) {
                $acive_plan['charge'] = $active;
                $acive_plan['object'] = $charge;
            }
        }
        return response()->json(['acive_plan' => $acive_plan]);
    }

    public function getPlanData() {
        $plan = Plan::all();
        return response()->json(['plan' => $plan]);
    }

    public function cancelCharges(Request $request, ShopQuery $shopQuery, CancelCurrentPlan $cancelCurrentPlanAction) {

        $shop = $shopQuery->getByDomain(ShopDomain::fromNative($request->get('shop')));

        // dd($shop->charges()->get());
        // Get the shop
        $shopId = $shop->getId();

        // Cancel the current plan
        $charged_data = $cancelCurrentPlanAction($shopId);
        if($charged_data) {
            $response = [
                'status' => 'OK',
                'message' => 'Success fully charges cancel'
            ];
        } else {
            $response = [
                'status' => 'OK',
                'message' => 'Already cancel'
            ];
        }
        return response()->json($response);
    }



}
