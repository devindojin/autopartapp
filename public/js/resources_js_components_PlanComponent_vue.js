"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_PlanComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/PlanComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/PlanComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  beforeMount: function beforeMount() {
    // axios.get(this.route_name.get_billing_data+'?shop='+this.shop)
    // .then(response => {
    //     this.plan = response.data.plan;
    // });
    this.getPlanData();
    this.getBillingData();
  },
  mounted: function mounted() {
    this.$emit('pagetitlechange', this.page_title);
  },
  data: function data() {
    return {
      page_title: "Plan",
      plan: [{
        name: 'test 1'
      }],
      route_name: this.$popup_data['route_name'],
      shop: this.$popup_data['shop'],
      acive_plan: {
        'check': false,
        'object': ''
      },
      active: {
        "class": {
          'btn': true,
          'btn-secondary': true,
          'disabled': true
        },
        "text": 'Activated'
      },
      notActive: {
        "class": {
          'btn': true,
          'btn-primary': true
        },
        "text": 'Choose this Plan'
      }
    };
  },
  methods: {
    billing: function billing(elt) {
      var data_obj = {
        params: {
          'shop': this.shop
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(elt.target.href, data_obj).then(function (res) {
        window.top.location.href = res.data.url;
      });
    },
    cancelCharges: function cancelCharges(elt) {
      var _this = this;

      var data_obj = {
        params: {
          'shop': this.shop
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(elt.target.href, data_obj).then(function (res) {
        if (res.status == 200) {
          res = res.data;

          if (res.status == "OK") {
            // this.$emit('message' ,res.message);
            _this.$popup_data.message(res.message);

            _this.getBillingData();
          } else {
            // this.$emit('message' ,res.message);
            _this.$popup_data.message(res.message);
          }
        } else {
          // this.$emit('message' ,'Something went wrong!' ,false);
          _this.$popup_data.message('Something went wrong!', false);
        }
      });
    },
    getBillingData: function getBillingData() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.route_name.get_billing_data + '?shop=' + this.shop).then(function (response) {
        _this2.acive_plan = response.data.acive_plan;
        _this2.$popup_data.active_plane = response.data.acive_plan;
        popup_data.active_plane = response.data.acive_plan;
      });
    },
    getPlanData: function getPlanData() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.route_name.get_plan_data + '?shop=' + this.shop).then(function (response) {
        _this3.plan = response.data.plan;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/components/PlanComponent.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/PlanComponent.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PlanComponent_vue_vue_type_template_id_134a4179___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlanComponent.vue?vue&type=template&id=134a4179& */ "./resources/js/components/PlanComponent.vue?vue&type=template&id=134a4179&");
/* harmony import */ var _PlanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlanComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/PlanComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PlanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PlanComponent_vue_vue_type_template_id_134a4179___WEBPACK_IMPORTED_MODULE_0__.render,
  _PlanComponent_vue_vue_type_template_id_134a4179___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/PlanComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/PlanComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/PlanComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PlanComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/PlanComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/PlanComponent.vue?vue&type=template&id=134a4179&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/PlanComponent.vue?vue&type=template&id=134a4179& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PlanComponent_vue_vue_type_template_id_134a4179___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PlanComponent_vue_vue_type_template_id_134a4179___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PlanComponent_vue_vue_type_template_id_134a4179___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PlanComponent.vue?vue&type=template&id=134a4179& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/PlanComponent.vue?vue&type=template&id=134a4179&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/PlanComponent.vue?vue&type=template&id=134a4179&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/PlanComponent.vue?vue&type=template&id=134a4179& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "row justify-content-center align-self-center" },
    [
      _c("div", { staticClass: "col-md-8" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-6" }, [
            _c("div", { staticClass: "card" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "planupgradebtn text-center my-3" }, [
                  _c(
                    "a",
                    {
                      class: _vm.acive_plan["charge"]
                        ? _vm.notActive["class"]
                        : _vm.active["class"],
                      attrs: { href: _vm.route_name["cancel_charges"] },
                      on: {
                        click: function ($event) {
                          $event.preventDefault()
                          return _vm.cancelCharges.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.acive_plan["charge"]
                            ? _vm.notActive["text"]
                            : _vm.active["text"]
                        )
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm._m(1),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-6" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header text-center" }, [
                _c("h5", [_vm._v(_vm._s(_vm.plan[0]["name"]))]),
                _vm._v(" "),
                _c("h6", [
                  _vm._v("$" + _vm._s(_vm.plan[0]["price"]) + "/month"),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "planupgradebtn text-center my-3" }, [
                  _c(
                    "a",
                    {
                      class: _vm.acive_plan["charge"]
                        ? _vm.active["class"]
                        : _vm.notActive["class"],
                      attrs: { href: _vm.route_name["custome_billing"] + "/1" },
                      on: {
                        click: function ($event) {
                          $event.preventDefault()
                          return _vm.billing.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.acive_plan["charge"]
                            ? _vm.active["text"]
                            : _vm.notActive["text"]
                        )
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm._m(2),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header text-center" }, [
      _c("h5", [_vm._v("Basic Plan")]),
      _vm._v(" "),
      _c("h6", [_vm._v("FREE")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "plan-info" }, [
      _c("ul", [
        _c("li", [_vm._v("Single Popup")]),
        _vm._v(" "),
        _c("li", [_vm._v("Mobile responsive")]),
        _vm._v(" "),
        _c("li", [_vm._v("Customizable popup")]),
        _vm._v(" "),
        _c("li", [_vm._v("Zero coding")]),
        _vm._v(" "),
        _c("li", [_vm._v("FREE customer support")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "plan-info" }, [
      _c("ul", [
        _c("li", [_vm._v("All Basic Plan features +")]),
        _vm._v(" "),
        _c("li", [_vm._v("Country based popup")]),
        _vm._v(" "),
        _c("li", [_vm._v("Multiple popups")]),
        _vm._v(" "),
        _c("li", [_vm._v("Show popup on specific page or collection")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);