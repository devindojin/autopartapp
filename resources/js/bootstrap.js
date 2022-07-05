_$ = window._ = _ = _ = require("lodash");
window.Popper = require("popper.js").default;

try {
    $ =
        jQuery =
        jquery =
        window.$ =
        window.jQuery =
        window.jquery =
            require("jquery");
    //require("bootstrap");
    require("admin-lte/plugins/jquery/jquery.min");
    require("admin-lte/plugins/bootstrap/js/bootstrap.bundle");
    // require("admin-lte/plugins/summernote/summernote-bs4");

    require("admin-lte");
    require("jquery-confirm");
    require("admin-lte/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker");
    require("admin-lte/plugins/select2/js/select2.full");
    // ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    // DecoupledEditor = require("@ckeditor/ckeditor5-editor-decoupled").DecoupledEditor;
    require("admin-lte/plugins/bootstrap-switch/js/bootstrap-switch");
    require("datatables.net-bs4")(window, $);
} catch (e) {}

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}
// console.log(_);
