"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_country_IndexComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/country/IndexComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/country/IndexComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! google-maps */ "./node_modules/google-maps/lib/esm/loader.js");
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
  name: "country_list",
  beforeMount: function beforeMount() {
    this.getCountryList();
  },
  mounted: function mounted() {
    this.$emit('pagetitlechange', this.page_title);
    this.loadGoogleLib();
  },
  data: function data() {
    return {
      page_title: "Country",
      country: {},
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
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$popup_data.route('country_detail') + '/' + id, {}).then(function (res) {
        vm.country = res.data.data;
      });
    },
    update: function update() {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$popup_data.route('country_update') + '/' + vm.country.id, vm.country).then(function (res) {
        vm.$popup_data.message(res.data.message);
        vm.getCountryList();
      })["catch"](function (error) {
        vm.server_errors = error.response.data.errors;
      });
    },
    getCountryList: function getCountryList() {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$popup_data.route('country_get'), {}).then(function (res) {
        vm.countries = res.data.data;
      });
    },
    clear: function clear() {
      this.country = {};
    },
    loadGoogleLib: function loadGoogleLib() {
      // let loader = new Loader('AIzaSyCJCpOT3mre1PxU2JVAkAlzRpzNls4rVaE');
      var loader = new google_maps__WEBPACK_IMPORTED_MODULE_1__.Loader(this.$popup_data.google_map_api_key);
      var vm = this;
      loader.load().then(function (google) {
        vm.geocoder = new google.maps.Geocoder();
        console.log(vm.geocoder);
      });
    },
    searchGeocode: function searchGeocode() {
      // if (false) {
      var vm = this;
      var request = {
        address: this.country.name
      };
      this.geocoder.geocode(request).then(function (result, status) {
        console.log(result);
        var geometry_location = result.results[0].geometry.location;
        console.log(geometry_location);
        var lat = geometry_location.lat();
        console.log(lat);
        var lng = geometry_location.lng();
        console.log(lng); // vm.country = {lat: lat, lng: lng};

        vm.country.lat = lat;
        vm.country.lng = lng;
        console.log(vm.country);

        vm.country.__ob__.dep.notify(); // return result;

      }); // } else {
      //     this.country.lat = '';
      //     this.country.lng = '';
      // }
    },
    save: function save() {
      console.log(this);
      this.submitted = true;
      var vm = this;
      this.$validator.validate().then(function (valid) {
        if (valid) {
          var url = vm.$popup_data.route('country_add');
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, vm.country).then(function (res) {
            vm.server_errors = {};
            vm.country = {};
            vm.$popup_data.message(res.data.message);
            vm.getCountryList();
          }) // .catch(({ res }) => {
          //     vm.server_errors = res.data.errors;
          // });
          ["catch"](function (error) {
            vm.server_errors = error.response.data.errors;
          });
        }
      });
    },
    remove: function remove(id) {
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"](this.$popup_data.route('country_delete') + '/' + id, {
        '_method': 'delete'
      }).then(function (res) {
        vm.$popup_data.message(res.data.message);
        vm.getCountryList();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/google-maps/lib/esm/loader.js":
/*!****************************************************!*\
  !*** ./node_modules/google-maps/lib/esm/loader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
class Loader {
    constructor(apiKey = null, options = {}) {
        this.apiKey = apiKey;
        this.options = options;
        if (typeof window === 'undefined') {
            throw new Error('google-maps is supported only in browser environment');
        }
    }
    load() {
        if (typeof this.api !== 'undefined') {
            return Promise.resolve(this.api);
        }
        if (typeof this.loader !== 'undefined') {
            return this.loader;
        }
        window[Loader.CALLBACK_NAME] = () => {
            this.api = window['google'];
            if (typeof this.resolve === 'undefined') {
                throw new Error('Should not happen');
            }
            this.resolve(this.api);
        };
        window['gm_authFailure'] = () => {
            if (typeof this.reject === 'undefined') {
                throw new Error('Should not happen');
            }
            this.reject(new Error('google-maps: authentication error'));
        };
        return this.loader = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            const script = document.createElement('script');
            script.src = this.createUrl();
            script.async = true;
            script.onerror = (e) => reject(e);
            document.head.appendChild(script);
        });
    }
    createUrl() {
        const parameters = [
            `callback=${Loader.CALLBACK_NAME}`,
        ];
        if (this.apiKey) {
            parameters.push(`key=${this.apiKey}`);
        }
        for (let name in this.options) {
            if (this.options.hasOwnProperty(name)) {
                let value = this.options[name];
                if (name === 'version') {
                    name = 'v';
                }
                if (name === 'libraries') {
                    value = value.join(',');
                }
                parameters.push(`${name}=${value}`);
            }
        }
        return `https://maps.googleapis.com/maps/api/js?${parameters.join('&')}`;
    }
}
Loader.CALLBACK_NAME = '_dk_google_maps_loader_cb';
//# sourceMappingURL=loader.js.map

/***/ }),

/***/ "./resources/js/components/country/IndexComponent.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/country/IndexComponent.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IndexComponent_vue_vue_type_template_id_14cbe20f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=template&id=14cbe20f& */ "./resources/js/components/country/IndexComponent.vue?vue&type=template&id=14cbe20f&");
/* harmony import */ var _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/country/IndexComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexComponent_vue_vue_type_template_id_14cbe20f___WEBPACK_IMPORTED_MODULE_0__.render,
  _IndexComponent_vue_vue_type_template_id_14cbe20f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/country/IndexComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/country/IndexComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/country/IndexComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IndexComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/country/IndexComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/country/IndexComponent.vue?vue&type=template&id=14cbe20f&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/country/IndexComponent.vue?vue&type=template&id=14cbe20f& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_14cbe20f___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_14cbe20f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_14cbe20f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IndexComponent.vue?vue&type=template&id=14cbe20f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/country/IndexComponent.vue?vue&type=template&id=14cbe20f&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/country/IndexComponent.vue?vue&type=template&id=14cbe20f&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/country/IndexComponent.vue?vue&type=template&id=14cbe20f& ***!
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
      _c("div", { staticClass: "col-auto" }, [
        _c("div", { staticClass: "input-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.country.name,
                expression: "country.name",
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
            attrs: { name: "name", type: "text", placeholder: "Country name" },
            domProps: { value: _vm.country.name },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.country, "name", $event.target.value)
              },
            },
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "input-group-btn btn btn-info",
              on: { click: _vm.searchGeocode },
            },
            [_vm._v("Search")]
          ),
        ]),
        _vm._v(" "),
        _vm.$_.has(_vm.server_errors, "name")
          ? _c("div", { staticClass: "invalid-feedback d-block" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.server_errors.name.join(", ")) +
                  "\n                "
              ),
            ])
          : _vm._e(),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-auto" }, [
        _c("div", { staticClass: "input-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.country.lat,
                expression: "country.lat",
              },
              {
                name: "validate",
                rawName: "v-validate",
                value: "required",
                expression: "'required'",
              },
            ],
            staticClass: "form-control",
            class: { "is-invalid": _vm.submitted && _vm.errors.has("lat") },
            attrs: { name: "lat", placeholder: "Lat", type: "text" },
            domProps: { value: _vm.country.lat },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.country, "lat", $event.target.value)
              },
            },
          }),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.country.lng,
                expression: "country.lng",
              },
              {
                name: "validate",
                rawName: "v-validate",
                value: "required",
                expression: "'required'",
              },
            ],
            staticClass: "form-control",
            class: { "is-invalid": _vm.submitted && _vm.errors.has("lng") },
            attrs: { name: "lng", placeholder: "Lng", type: "text" },
            domProps: { value: _vm.country.lng },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.country, "lng", $event.target.value)
              },
            },
          }),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-auto" }, [
        _vm.$_.has(_vm.country, "id")
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
        _vm._l(_vm.countries, function (country_val, country_key) {
          return _c("tr", { key: country_key }, [
            _c("td", [_vm._v(_vm._s(country_key + 1))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(country_val.name))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(country_val.lat))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(country_val.lng))]),
            _vm._v(" "),
            _c("td", [
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-info",
                  on: {
                    click: function ($event) {
                      return _vm.edit(country_val.id)
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
                      return _vm.remove(country_val.id)
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
      _c("label", { staticClass: "form-label" }, [_vm._v("Country name:")]),
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
        _c("th", [_vm._v("Latitude")]),
        _vm._v(" "),
        _c("th", [_vm._v("Logitude")]),
        _vm._v(" "),
        _c("th", [_vm._v("Action")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);