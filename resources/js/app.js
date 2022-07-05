/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
// require('./node_modules/summernote/src/js/summernote');
// require('../../node_modules/summernote/src/js/summernote.js');

// /var/www/html/multiplepopup/node_modules/summernote/src/js/summernote.js

window.Vue = require("vue").default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

Vue.component(
    "layout-component",
    require("./components/LayoutComponent.vue").default
);
Vue.component(
    "sidebar-component",
    require("./components/SidebarComponent.vue").default
);
Vue.component(
    "top-bar-component",
    require("./components/TopBarComponent.vue").default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
/*

*/

import VueRouter from "vue-router";

Vue.use(VueRouter);
// let path_prefix = '/shopify-apps/multiple-popup/public';
let path_prefix = "/public";
// let path_prefix = "";
const routes = [
    // {
    //     path: path_prefix,
    //     // alias: '/home',
    //     name: "home",
    //     redirect: () => {
    //         return { name: "dashboard" };
    //     },
    // },
    // {
    //     path: path_prefix + "/dashboard",
    //     // alias: "/dashboard",
    //     name: "dashboard",
    //     component: () => import("./components/dashboard/DashboardComponent"),
    // },
    {
        path: path_prefix,
        name: "product",
        component: () => import("./components/product/IndexComponent"),
    },
    {
        path: path_prefix + "/product",
        name: "product",
        component: () => import("./components/product/IndexComponent"),
    },
    // {
    //     path: path_prefix + "/country",
    //     // alias: "/dashboard",
    //     name: "country",
    //     component: () => import("./components/country/IndexComponent"),
    // },
    // {
    //     path: path_prefix + "/category",
    //     // alias: "/dashboard",
    //     name: "category",
    //     component: () => import("./components/category/IndexComponent"),
    // },
    // {
    //     path: path_prefix + "/ingredient",
    //     // alias: "/dashboard",
    //     name: "ingredient",
    //     component: () => import("./components/ingredient/IndexComponent"),
    // },
];

window.router = new VueRouter({
    mode: "history",
    routes: routes,
});
Vue.use(require("vue-cookies"));
// import Popover from 'vue-js-popover'
// Vue.use(Popover);

import axios from "axios";

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

Object.defineProperty(Vue.prototype, "$_", { value: _ });
