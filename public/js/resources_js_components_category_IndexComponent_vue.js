"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_category_IndexComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/category/IndexComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/category/IndexComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "category_list",
  beforeMount: function beforeMount() {
    this.getCategoryList();
  },
  mounted: function mounted() {
    this.$emit('pagetitlechange', this.page_title);
  },
  data: function data() {
    return {
      page_title: "Category",
      category: {},
      countries: [],
      // popup_data: [],
      submitted: false,
      geocoder: '',
      server_errors: {}
    };
  },
  methods: {
    edit: function edit(id) {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$popup_data.route('category_detail') + '/' + id, {}).then(function (res) {
        vm.category = res.data.data;
      });
    },
    update: function update() {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$popup_data.route('category_update') + '/' + vm.category.id, vm.category).then(function (res) {
        vm.$popup_data.message(res.data.message);
        vm.getCategoryList();
      })["catch"](function (error) {
        vm.server_errors = error.response.data.errors;
      });
    },
    getCategoryList: function getCategoryList() {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$popup_data.route('category_get'), {}).then(function (res) {
        vm.countries = res.data.data;
      });
    },
    clear: function clear() {
      this.category = {};
    },
    save: function save() {
      this.submitted = true;
      var vm = this;
      this.$validator.validate().then(function (valid) {
        if (valid) {
          var url = vm.$popup_data.route('category_add');
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, vm.category).then(function (res) {
            vm.server_errors = {};
            vm.category = {};
            vm.$popup_data.message(res.data.message);
            vm.getCategoryList();
          })["catch"](function (error) {
            vm.server_errors = error.response.data.errors;
          }); // .catch(({ res }) => {
          //     console.log(res);
          //     vm.server_errors = res.data.errors;
          // });
        }
      });
    },
    remove: function remove(id) {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"](this.$popup_data.route('category_delete') + '/' + id, {
        '_method': 'delete'
      }).then(function (res) {
        vm.$popup_data.message(res.data.message);
        vm.getCategoryList();
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/components/category/IndexComponent.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/category/IndexComponent.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IndexComponent_vue_vue_type_template_id_032221be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=template&id=032221be& */ "./resources/js/components/category/IndexComponent.vue?vue&type=template&id=032221be&");
/* harmony import */ var _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/category/IndexComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexComponent_vue_vue_type_template_id_032221be___WEBPACK_IMPORTED_MODULE_0__.render,
  _IndexComponent_vue_vue_type_template_id_032221be___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/category/IndexComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/category/IndexComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/category/IndexComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IndexComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/category/IndexComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/category/IndexComponent.vue?vue&type=template&id=032221be&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/category/IndexComponent.vue?vue&type=template&id=032221be& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_032221be___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_032221be___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_032221be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IndexComponent.vue?vue&type=template&id=032221be& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/category/IndexComponent.vue?vue&type=template&id=032221be&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/category/IndexComponent.vue?vue&type=template&id=032221be&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/category/IndexComponent.vue?vue&type=template&id=032221be& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "col-auto" }, [
        _c("div", { staticClass: "input-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.category.name,
                expression: "category.name",
              },
              {
                name: "validate",
                rawName: "v-validate",
                value: "required",
                expression: "'required'",
              },
            ],
            staticClass: "form-control",
            class: { "is-invalid": _vm.submitted && _vm.errors.has("name") },
            attrs: { name: "name", type: "text", placeholder: "Category name" },
            domProps: { value: _vm.category.name },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.category, "name", $event.target.value)
              },
            },
          }),
        ]),
        _vm._v(" "),
        _vm.$_.has(_vm.server_errors, "name")
          ? _c("div", { staticClass: "invalid-feedback d-block" }, [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.server_errors.name.join(", ")) +
                  "\n            "
              ),
            ])
          : _vm._e(),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-auto" }, [
        _vm.$_.has(_vm.category, "id")
          ? _c(
              "button",
              {
                staticClass: "btn btn-info",
                attrs: { type: "button" },
                on: { click: _vm.update },
              },
              [_vm._v("Update")]
            )
          : _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.save },
              },
              [_vm._v("Add")]
            ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-warning",
            attrs: { type: "button" },
            on: { click: _vm.clear },
          },
          [_vm._v("Clear")]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("table", { staticClass: "table table-bordered" }, [
      _vm._m(1),
      _vm._v(" "),
      _c(
        "tbody",
        _vm._l(_vm.countries, function (category_val, category_key) {
          return _c("tr", { key: category_key }, [
            _c("td", [_vm._v(_vm._s(category_key + 1))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(category_val.name))]),
            _vm._v(" "),
            _c("td", [
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-info",
                  on: {
                    click: function ($event) {
                      return _vm.edit(category_val.id)
                    },
                  },
                },
                [_c("i", { staticClass: "fa fa-edit" })]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-danger",
                  on: {
                    click: function ($event) {
                      return _vm.remove(category_val.id)
                    },
                  },
                },
                [_c("i", { staticClass: "fa fa-trash" })]
              ),
            ]),
          ])
        }),
        0
      ),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-auto" }, [
      _c("label", { staticClass: "form-label" }, [_vm._v("Category name:")]),
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
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Action")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);