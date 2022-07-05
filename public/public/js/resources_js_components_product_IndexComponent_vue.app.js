"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_product_IndexComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/product/IndexComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/product/IndexComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
// import VueBootstrap4Table from "vue-bootstrap4-table";
// import { ServerTable, ClientTable, Event } from "vue-tables-2";
var product_edit = Vue.component("product-edit", {
  template: "<div>\n                <h1>lodesdasdasad</h1>\n            </div>",
  mounted: function mounted() {
    console.log("ok");
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "product_list",
  mounted: function mounted() {
    this.$emit("pagetitlechange", this.page_title);
    this.getProductList();
    var vm = this;
    $(document).on("click", "[data-edit]", function () {
      var html = "";

      if ($(this).attr("data-edit") == "deposit_amount") {
        html = "<div class=\"input-group\">\n                        <input class=\"form-control\" placeholder=\"Amount\" type=\"number\" value=\"" + $(this).closest("td").find("span").text() + "\" />\n                        <div class=\"input-group-append\">\n                            <button data-save=\"" + $(this).attr("data-edit") + "\" data-variant_id=\"" + $(this).attr("data-variant_id") + "\" class=\"btn btn-outline-primary\" type=\"button\"><i class=\"fa fa-save\"></i></button>\n                        </div>\n                    </div>";
      } else if ($(this).attr("data-edit") == "deposit_note") {
        html = "<div class=\"input-group\">\n                        <textarea class=\"form-control\">" + $(this).closest("td").find("span").text() + "</textarea>\n                        <div class=\"input-group-append\">\n                            <button data-save=\"" + $(this).attr("data-edit") + "\" data-variant_id=\"" + $(this).attr("data-variant_id") + "\" class=\"btn btn-outline-primary\" type=\"button\"><i class=\"fa fa-save\"></i>\n                            </button>\n                        </div>\n                    </div>";
      }

      $(this).closest("td").html(html);
      $(this).remove();
    });
    $(document).on("click", "[data-save]", function () {
      var value = new Object();
      value[$(this).attr("data-save")] = $(this).closest("td").find("input, textarea").val(); // console.log(value);

      $(this).closest("td").html("<span>".concat($(this).closest("td").find("input, textarea").val(), "</span>\n                        <button class=\"btn btn-sm btn-outline-primary\" data-edit=\"deposit_note\" data-variant_id=\"").concat($(this).attr("data-variant_id"), "\">\n                            <i class=\"fa fa-edit\"></i>\n                        </button>"));
      vm.updateVariant($(this).attr("data-variant_id"), value);
    });
  },
  data: function data() {
    return {
      page_title: "Product",
      // products: {
      //     data: [],
      // },
      server_errors: {},
      variants: [],
      idforupdate: "",
      datatable: ""
    };
  },
  methods: {
    getProductList: function getProductList() {
      var this_temp = this;

      if (this.datatable == "") {
        this.datatable = $(".data-table").DataTable({
          processing: true,
          serverSide: true,
          // ajax: this_temp.$popup_data.route("variant_get"),
          ajax: {
            url: this_temp.$popup_data.route("variant_get"),
            dataFilter: function dataFilter(data) {
              var json = jQuery.parseJSON(data);
              return JSON.stringify(json);
            },
            sync: false
          },
          columns: [// {
          //     data: "photo",
          //     name: "photo",
          //     orderable: false,
          //     searchable: false,
          // },
          // { data: "employee_name", name: "employee_name" },
          // { data: "email", name: "email" },
          // { data: "contact_number", name: "contact_number" },
          // { data: "gender", name: "gender" },
          // { data: "department", name: "department" },
          // { data: "birthdate", name: "birthdate" },
          {
            data: "id",
            name: "id"
          }, {
            data: "legacy_resource_id",
            name: "legacy_resource_id"
          }, {
            data: "title",
            name: "title"
          }, {
            data: "sku",
            name: "sku"
          }, {
            data: "product.title",
            name: "product.title"
          }, {
            data: "product.status",
            name: "product.status"
          }, {
            data: "deposit_amount",
            name: "deposit_amount"
          }, {
            data: "deposit_note",
            name: "deposit_note"
          }, {
            data: "deposit_status",
            name: "deposit_status"
          }],
          drawCallback: function drawCallback(settings, json) {
            $("[data-bootstrap-switch]").each(function () {
              $(this).bootstrapSwitch({
                onSwitchChange: function onSwitchChange(event, state) {
                  var id = $(event.currentTarget).attr("data-variant_id");
                  state = state ? "true" : "false";
                  var value = {
                    deposit_status: state
                  };
                  this_temp.updateVariant(id, value);
                }
              });
            });
          }
        });
      } else {
        this.datatable.ajax.reload();
      }
    },
    updateVariant: function updateVariant(id, value) {
      console.log(id);
      console.log(value);
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$popup_data.route("variant_update") + "/" + id, value).then(function (res) {
        console.log(res);
        vm.$popup_data.message(res.data.message); // vm.getCountryList();
      })["catch"](function (error) {
        console.log(error); // vm.server_errors = error.response.data.errors;
      });
    }
  },
  components: {
    // VueBootstrap4Table,
    "product-edit": product_edit
  }
});

/***/ }),

/***/ "./resources/js/components/product/IndexComponent.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/product/IndexComponent.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IndexComponent_vue_vue_type_template_id_2ed2d416___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=template&id=2ed2d416& */ "./resources/js/components/product/IndexComponent.vue?vue&type=template&id=2ed2d416&");
/* harmony import */ var _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/product/IndexComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexComponent_vue_vue_type_template_id_2ed2d416___WEBPACK_IMPORTED_MODULE_0__.render,
  _IndexComponent_vue_vue_type_template_id_2ed2d416___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/product/IndexComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/product/IndexComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/product/IndexComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IndexComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/product/IndexComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/product/IndexComponent.vue?vue&type=template&id=2ed2d416&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/product/IndexComponent.vue?vue&type=template&id=2ed2d416& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_2ed2d416___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_2ed2d416___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_2ed2d416___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IndexComponent.vue?vue&type=template&id=2ed2d416& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/product/IndexComponent.vue?vue&type=template&id=2ed2d416&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/product/IndexComponent.vue?vue&type=template&id=2ed2d416&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/product/IndexComponent.vue?vue&type=template&id=2ed2d416& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "row mb-3" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive" }, [
        _c("table", { staticClass: "table table-bordered data-table" }, [
          _vm._m(1),
          _vm._v(" "),
          _vm.variants.length > 0
            ? _c(
                "tbody",
                _vm._l(_vm.variants, function (variant, key) {
                  return _c("tr", { key: key }, [
                    _c("td", [_vm._v(_vm._s(key + 1))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.legacy_resource_id))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.title))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.sku))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.product.title))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.product.status))]),
                    _vm._v(" "),
                    _c("td", [
                      _c("div", [
                        _c("span", [_vm._v(_vm._s(variant.deposit_amount))]),
                        _vm._v(" "),
                        _vm._m(2, true),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.deposit_note))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(variant.deposit_status))]),
                  ])
                }),
                0
              )
            : _c("tbody", [_vm._m(3)]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-auto" }, [
      _c("label", { staticClass: "form-label" }, [_vm._v("Product list:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("#")]),
        _vm._v(" "),
        _c("th", [_vm._v("Variant id")]),
        _vm._v(" "),
        _c("th", [_vm._v("Title")]),
        _vm._v(" "),
        _c("th", [_vm._v("SKU")]),
        _vm._v(" "),
        _c("th", [_vm._v("Product title")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
        _vm._v(" "),
        _c("th", [_vm._v("Deposit amount")]),
        _vm._v(" "),
        _c("th", [_vm._v("Deposit note")]),
        _vm._v(" "),
        _c("th", [_vm._v("Deposit status")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", [_c("i", { staticClass: "fa fa-edit" })])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("td", { attrs: { colspan: "9", align: "center" } }, [
        _vm._v(
          "\n                            No Employee Found.\n                        "
        ),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);