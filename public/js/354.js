"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[354],{354:(t,a,e)=>{e.r(a),e.d(a,{default:()=>l});var s=e(9669),n=e.n(s);const i={beforeMount:function(){this.getPlanData(),this.getBillingData()},mounted:function(){this.$emit("pagetitlechange",this.page_title)},data:function(){return{page_title:"Plan",plan:[{name:"test 1"}],route_name:this.$popup_data.route_name,shop:this.$popup_data.shop,acive_plan:{check:!1,object:""},active:{class:{btn:!0,"btn-secondary":!0,disabled:!0},text:"Activated"},notActive:{class:{btn:!0,"btn-primary":!0},text:"Choose this Plan"}}},methods:{billing:function(t){var a={params:{shop:this.shop}};n().get(t.target.href,a).then((function(t){window.top.location.href=t.data.url}))},cancelCharges:function(t){var a=this,e={params:{shop:this.shop}};n().get(t.target.href,e).then((function(t){200==t.status?"OK"==(t=t.data).status?(a.$popup_data.message(t.message),a.getBillingData()):a.$popup_data.message(t.message):a.$popup_data.message("Something went wrong!",!1)}))},getBillingData:function(){var t=this;n().get(this.route_name.get_billing_data+"?shop="+this.shop).then((function(a){t.acive_plan=a.data.acive_plan,t.$popup_data.active_plane=a.data.acive_plan,popup_data.active_plane=a.data.acive_plan}))},getPlanData:function(){var t=this;n().get(this.route_name.get_plan_data+"?shop="+this.shop).then((function(a){t.plan=a.data.plan}))}}};const l=(0,e(1900).Z)(i,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row justify-content-center align-self-center"},[e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"card"},[t._m(0),t._v(" "),e("div",{staticClass:"card-body"},[e("div",{staticClass:"planupgradebtn text-center my-3"},[e("a",{class:t.acive_plan.charge?t.notActive.class:t.active.class,attrs:{href:t.route_name.cancel_charges},on:{click:function(a){return a.preventDefault(),t.cancelCharges.apply(null,arguments)}}},[t._v(t._s(t.acive_plan.charge?t.notActive.text:t.active.text))])]),t._v(" "),t._m(1)])])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header text-center"},[e("h5",[t._v(t._s(t.plan[0].name))]),t._v(" "),e("h6",[t._v("$"+t._s(t.plan[0].price)+"/month")])]),t._v(" "),e("div",{staticClass:"card-body"},[e("div",{staticClass:"planupgradebtn text-center my-3"},[e("a",{class:t.acive_plan.charge?t.active.class:t.notActive.class,attrs:{href:t.route_name.custome_billing+"/1"},on:{click:function(a){return a.preventDefault(),t.billing.apply(null,arguments)}}},[t._v(t._s(t.acive_plan.charge?t.active.text:t.notActive.text))])]),t._v(" "),t._m(2)])])])])])])}),[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-header text-center"},[e("h5",[t._v("Basic Plan")]),t._v(" "),e("h6",[t._v("FREE")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"plan-info"},[e("ul",[e("li",[t._v("Single Popup")]),t._v(" "),e("li",[t._v("Mobile responsive")]),t._v(" "),e("li",[t._v("Customizable popup")]),t._v(" "),e("li",[t._v("Zero coding")]),t._v(" "),e("li",[t._v("FREE customer support")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"plan-info"},[e("ul",[e("li",[t._v("All Basic Plan features +")]),t._v(" "),e("li",[t._v("Country based popup")]),t._v(" "),e("li",[t._v("Multiple popups")]),t._v(" "),e("li",[t._v("Show popup on specific page or collection")])])])}],!1,null,null,null).exports}}]);