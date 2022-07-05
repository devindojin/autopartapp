const $ = (jquery = require("jquery"));

//jquery = require("jquery");
window._ = _ = require("lodash");

// document.getElementsByTagName("body")[0].style.display = "none";
// window.Vue = require("vue").default;

// window.axios = require("axios");
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Vue.component(
//     "embed-component",
//     require("./components/embed/EmbedComponent.vue").default
// );
//window
// let app_content = document.createElement("embed-component");
// let app_container = document.createElement("div");
// app_container.setAttribute("id", "ingredient_google_map_content");
// app_container.appendChild(app_content);
// document.getElementById("ingredient_google_map").innerHTML =
//     app_container.outerHTML;
console.log(process.env.MIX_APP_URL);

// let popup_data = new Object();

// popup_data.ingredient_get = process.env.MIX_APP_URL + "/api/ingredient-get";
// popup_data.ingredient_detail =
//     process.env.MIX_APP_URL + "/api/ingredient-detail";
// popup_data.storage = function (url) {
//     return process.env.MIX_APP_URL + "/storage/" + url;
// };
// popup_data.google_map_api_key = process.env.MIX_GOOGLE_MAP_API_KEY;

// Vue.prototype.$popup_data = popup_data;
// Vue.use(require('vue-cookies'));
// const app_vue = new Vue({
//     el: "#ingredient_google_map_content",
// });

setTimeout(function () {
    $("#checkout").prop("disabled", true);
}, 1000);

var Autopart = new Object();
Autopart.prefix = "autopart";
Autopart.storage = Autopart.prefix + "_storage";
Autopart.cart = "";
Autopart.shop = Shopify.shop;
Autopart.response = "";
Autopart.draft_call = false;
Autopart.helper = function () {
    this.url = function (uri) {
        return process.env.MIX_APP_URL + "/api/" + uri;
    };
    this.check_in_array = function (data_val, cart_items, type = "") {
        let cart_build = new Array();
        cart_build["popup_flag"] = false;
        let selected_get_product = data_val.selected_get_product;
        let selected_buy_product =
            data_val.selected_buy_product == "{}" ||
            data_val.selected_buy_product == ""
                ? ""
                : JSON.parse(data_val.selected_buy_product);

        // console.log(data_val.selected_buy_product == '{}');
        // console.log(data_val.selected_buy_product == '');

        cart_build["get_find_in_cart"] = false;
        cart_build["buy_find_in_cart"] = false;
        cart_build["already_exist_in_free"] = false;

        cart_items.items.forEach((val) => {
            // console.log(selected_get_product,val.product_id);
            if (
                typeof selected_get_product[val.product_id] != "undefined" &&
                data_val.buy_cart_qty <= val.quantity
            ) {
                cart_build["variant"] = val;
                cart_build["get_find_in_cart"] = true;
            }

            // if(selected_buy_product != '') {
            if (typeof selected_buy_product[val.product_id] != "undefined") {
                cart_build["buy_variant"] = val;
                cart_build["buy_find_in_cart"] = true;
            }
            // } else {
            //     console.log('cart_build  ssss',cart_build);
            //     if(selected_buy_product == '' && !cart_build['buy_find_in_cart']) {
            //         // console.log('ddddd')
            //         cart_build["buy_variant"] = data_val;
            //         cart_build['buy_find_in_cart'] = true;
            //     }
            // }
        });

        /** */

        if (
            $.inArray(
                cart_build["buy_variant"]["variant_id"],
                Autopart.lineItemsBuildData.items.get_find_in_cart
            ) != -1
        ) {
            cart_build["already_exist_in_free"] = true;
        }
        if (!cart_build["already_exist_in_free"]) {
            if (cart_build["buy_find_in_cart"]) {
                let qty_offer =
                    data_val.get_cart_qty *
                    parseInt(
                        cart_build["buy_variant"]["quantity"] /
                            data_val.buy_cart_qty
                    );
                if (cart_build["get_find_in_cart"]) {
                    if (cart_build.variant.quantity >= qty_offer) {
                        cart_build["qty_offer"] = qty_offer;
                        cart_build["remaining_qty_offer"] = 0;
                    } else {
                        cart_build["qty_offer"] = cart_build.variant.quantity;
                        cart_build["remaining_qty_offer"] =
                            qty_offer - cart_build.variant.quantity;
                        cart_build["popup_flag"] = true;
                    }

                    this.lineItemsBuildData.items.buy_find_in_cart.push(
                        cart_build["buy_variant"]["variant_id"]
                    );
                    this.lineItemsBuildData.items.get_find_in_cart.push(
                        cart_build["variant"]["variant_id"]
                    );
                    this.lineItemsBuildData.items.get_find_in_cart_remaining_qty[
                        cart_build["variant"]["variant_id"]
                    ] = cart_build["qty_offer"];
                    /** */
                } else {
                    cart_build["popup_flag"] = true;
                    cart_build["qty_offer"] = qty_offer;
                    cart_build["remaining_qty_offer"] = qty_offer;
                }
            }
        }
        return cart_build;
    };
    this.getProductVariant = function (product_id, variant_ids) {
        let product = "";
        // console.log('ddddd', this.response.product);
        this.response.product.forEach((val) => {
            if (val.legacy_resource_id == product_id) {
                product = val;
            }
        });
        return product;
    };
    this.setValue = function (key, val) {
        localStorage.setItem(key, val);
    };
    this.getValue = function (key) {
        let value = localStorage.getItem(key);
        if (value === null && value !== false) {
            value = false;
        }
        return value;
    };
    this.getMoneyText = function (money, currency) {
        let money_format = {
            AED: "Dhs. @{{amount}}",
            ANG: "&fnof;@{{amount}}",
            ARS: "$@{{amount_with_comma_separator}}",
            AUD: "$@{{amount}}",
            BBD: "$@{{amount}}",
            BDT: "Tk @{{amount}}",
            BGN: "@{{amount}} Ð»Ð²",
            BHD: "@{{amount}}0 BHD",
            BND: "$@{{amount}}",
            BOB: "Bs@{{amount_with_comma_separator}}",
            BRL: "R$ @{{amount_with_comma_separator}}",
            BSD: "BS$@{{amount}}",
            CAD: "$@{{amount}}",
            CHF: "SFr. @{{amount}}",
            CLP: "$@{{amount_no_decimals}}",
            CNY: "&#165;@{{amount}}",
            COP: "$@{{amount_with_comma_separator}}",
            CRC: "&#8353; @{{amount_with_comma_separator}}",
            CZK: "@{{amount_with_comma_separator}} K&#269;",
            DKK: "@{{amount_with_comma_separator}}",
            DOP: "RD$ @{{amount_with_comma_separator}}",
            EGP: "LE @{{amount}}",
            EUR: "&euro;@{{amount}}",
            FJD: "$@{{amount}}",
            GBP: "&pound;@{{amount}}",
            GEL: "@{{amount}} GEL",
            GHS: "GH&#8373;@{{amount}}",
            GTQ: "@{{amount}}",
            GYD: "$@{{amount}}",
            HKD: "$@{{amount}}",
            HRK: "@{{amount_with_comma_separator}} kn",
            HUF: "@{{amount_no_decimals_with_comma_separator}}",
            IDR: "@{{amount_with_comma_separator}}",
            INR: "Rs. @{{amount}}",
            ISK: "@{{amount_no_decimals}} kr",
            JMD: "$@{{amount}}",
            JOD: "@{{amount}}0 JD",
            JPY: "&#165;@{{amount_no_decimals}}",
            KES: "KSh@{{amount}}",
            KRW: "&#8361;@{{amount_no_decimals}}",
            KWD: "@{{amount}}0 KD",
            KYD: "$@{{amount}}",
            KZT: "@{{amount}} KZT",
            LKR: "Rs @{{amount}}",
            LTL: "@{{amount}} Lt",
            LVL: "Ls @{{amount}}",
            MAD: "@{{amount}} dh",
            MDL: "@{{amount}} MDL",
            MMK: "K@{{amount}}",
            MNT: "@{{amount_no_decimals}} &#8366",
            MUR: "Rs @{{amount}}",
            MXN: "$ @{{amount}}",
            MYR: "RM@{{amount}} MYR",
            MZN: "@{{amount}} Mt",
            NGN: "&#8358;@{{amount}}",
            NIS: "@{{amount}} NIS",
            NOK: "kr @{{amount_with_comma_separator}}",
            NZD: "$@{{amount}}",
            OMR: "@{{amount_with_comma_separator}} OMR",
            PEN: "S/. @{{amount}}",
            PHP: "&#8369;@{{amount}}",
            PKR: "Rs.@{{amount}}",
            PLN: "@{{amount_with_comma_separator}} zl",
            PYG: "Gs. @{{amount_no_decimals_with_comma_separator}}",
            QAR: "QAR @{{amount_with_comma_separator}}",
            RON: "@{{amount_with_comma_separator}} lei",
            RSD: "@{{amount}} RSD",
            RUB: "&#1088;&#1091;&#1073;@{{amount_with_comma_separator}}",
            SAR: "@{{amount}} SR",
            SCR: "Rs @{{amount}}",
            SEK: "@{{amount_no_decimals}} kr",
            SGD: "$@{{amount}}",
            SYP: "S&pound;@{{amount}}",
            THB: "@{{amount}} &#xe3f;",
            TRY: "@{{amount}}TL",
            TTD: "$@{{amount}}",
            TWD: "$@{{amount}}",
            TZS: "@{{amount}} TZS",
            UAH: "â‚´@{{amount}}",
            USD: "$@{{amount}}",
            UYU: "$@{{amount_with_comma_separator}}",
            VEB: "Bs. @{{amount_with_comma_separator}}",
            VND: "@{{amount_no_decimals_with_comma_separator}}â‚«",
            XBT: "@{{amount_no_decimals}} BTC",
            XCD: "$@{{amount}}",
            XPF: "@{{amount_no_decimals_with_comma_separator}} XPF",
            ZAR: "R @{{amount}}",
            ZMK: "K@{{amount_no_decimals_with_comma_separator}}",
        };

        money_format = money_format[currency];
        return money_format.replace(
            "@{{amount}}",
            parseFloat(money).toFixed(2)
        );
    };
};

Autopart.init = function () {
    this.helper();
    Autopart.productPage();
    Autopart.getCart();
    Autopart.setting();
    Autopart.lineItemsBuild();
};
Autopart.productPage = function () {
    // alert("ok");

    if (window.location.pathname.includes("/products/")) {
        let Product = {
            response: [],
            product: [],
            selected_variant_db: {},
            selected_variant_json: {},
            init: function () {
                let vm = this;
                $.get(
                    window.location.origin + window.location.pathname + ".json"
                ).then(function (res) {
                    vm.product = res.product;
                    let product_id = res.product.id;
                    $.ajax({
                        type: "GET",
                        url: Autopart.url(
                            "variant-get-by-product_id" + "/" + product_id
                        ),
                        // url:
                        //     "https://autopart.cradle.services/api/variant-get-by-product_id/" +
                        //     product_id,
                        data: new Object(),
                        success: function (response) {
                            vm.buildHtml(response);
                            vm.eventInit(response);
                        },
                    });
                });
            },
            originalBuyNowButton: function (show = true) {
                if (show) {
                    $("[data-app_buy_now_button]").hide();
                    $(".shopify-payment-button__button").show();
                } else {
                    $(".shopify-payment-button__button").hide();
                    $("[data-app_buy_now_button]").show();
                }
            },
            eventInit: function (response) {
                if (response.data.length >= 1 && response.message == "found") {
                    let vm = this;
                    $('[type="submit"][name="add"]').after(
                        '<button data-app_buy_now_button style="cursor:pointer; background-color: rgba(var(--color-button),var(--alpha-button-background));min-width: calc(12rem + var(--buttons-border-width) * 2);min-height: calc(4.5rem + var(--buttons-border-width) * 2);color: white;border: 0;border-radius: 6px;width: 100%;" type="button">Buy it now</button>'
                    );
                    vm.originalBuyNowButton(false);
                    setTimeout(function () {
                        vm.originalBuyNowButton(false);
                    }, 1000);
                    setTimeout(function () {
                        vm.originalBuyNowButton(false);
                    }, 2000);
                    setTimeout(function () {
                        vm.originalBuyNowButton(false);
                    }, 3000);
                    setTimeout(function () {
                        vm.originalBuyNowButton(false);
                    }, 4000);
                    $(document).on(
                        "click",
                        "[data-app_buy_now_button]",
                        function () {
                            let data = new Object();
                            data.selected_product_json = vm.product;
                            data.selected_variant_json =
                                vm.selected_variant_json;
                            data.selected_variant_db = vm.selected_variant_db;
                            data.quantity = $('[name="quantity"]').val();
                            data.shop = Autopart.shop;
                            data.currency = Shopify.currency.active;
                            // console.log("data----", data);
                            $.ajax({
                                url: Autopart.url("create-draft"),
                                type: "POST",
                                data: data,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                },
                                success: function (res) {
                                    if (
                                        Shopify.theme.id != 132919656668 &&
                                        !res["draft"]["errors"]
                                    ) {
                                        window.location.href =
                                            res["draft"]["body"]["draft_order"][
                                                "invoice_url"
                                            ];
                                        // window
                                        //     .open(
                                        //         res["draft"]["body"][
                                        //             "draft_order"
                                        //         ]["invoice_url"]
                                        //         //,"_blank"
                                        //     )
                                        //     .focus();
                                    }
                                },
                            });
                        }
                    );
                }
            },
            depositNote: function (deposit_note) {
                $("[data-deposit_note]").remove();
                if (deposit_note != null) {
                    $('[data-type="add-to-cart-form"]').after(
                        "<p data-deposit_note><b>Deposit note: </b>" +
                            deposit_note +
                            "</p>"
                    );
                }
            },
            depositPrice: function (deposit_amount) {
                deposit_amount = parseFloat(deposit_amount).toFixed(2);
                console.log(deposit_amount);
                $("[data-deposit_amount]").remove();
                $(".product__info-container .price").after(
                    "<p data-deposit_amount><b>Deposit amount: </b>$" +
                        deposit_amount +
                        " USD</p>"
                );
            },
            setVariant: function (type, variant) {
                this[type] = variant;
            },
            changeOption: function (name, value) {
                let vm = this;
                // console.log(name, value);
                $("[data-deposit_note]").remove();
                $("[data-deposit_amount]").remove();

                vm.originalBuyNowButton(true);
                _.forEach(vm.response.data, function (variant) {
                    if (value == variant.title) {
                        // console.log(variant['deposit_status']);
                        if (variant["deposit_status"] == "true") {
                            vm.setVariant("selected_variant_db", variant);
                            vm.depositNote(variant["deposit_note"]);
                            vm.depositPrice(variant["deposit_amount"]);
                            vm.originalBuyNowButton(false);
                        }
                    }
                });
                _.forEach(vm.product.variants, function (variant) {
                    if (value == variant.title) {
                        vm.setVariant("selected_variant_json", variant);
                    }
                });
            },
            buildHtml: function (response) {
                let vm = this;
                // console.log("response", response);
                this.response = response;
                let deposit_note = "";
                if (response.data.length == 1) {
                    let variant = response.data[0];
                    console.log(vm.product);
                    let product_variant = vm.product.variants[0];
                    if (variant["deposit_status"] == "true") {
                        vm.setVariant("selected_variant_db", variant);
                        vm.setVariant("selected_variant_json", product_variant);

                        vm.depositNote(variant["deposit_note"]);
                        vm.depositPrice(variant["deposit_amount"]);
                        vm.originalBuyNowButton(false);
                    } else {
                        vm.originalBuyNowButton(true);
                    }
                } else if (response.data.length > 1) {
                    $(document).on(
                        "change",
                        'variant-radios input[type="radio"]',
                        function () {
                            let options_name = $(this).attr("name");
                            let options_value = $(this).attr("value");
                            setTimeout(function () {
                                vm.changeOption(options_name, options_value);
                            }, 2000);
                        }
                    );
                    $('variant-radios input[type="radio"]:checked').trigger(
                        "change"
                    );
                } else {
                    alert("Product Not found in APP");
                }
            },
        }.init();
    }
};
Autopart.getCart = function () {
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "/cart.json",
        success: function (res) {
            response = res;
        },
        async: false,
    });
    Autopart.setCart(response);
    return response;
};
Autopart.setCart = function (cart) {
    Autopart.cart = typeof cart == "string" ? JSON.parse(cart) : cart;
};

Autopart.popup = function (action) {
    if (action == "show") {
        document.getElementById("buyxgety_popup").classList.remove("hide");
    } else if (action == "hide") {
        document.getElementById("buyxgety_popup").classList.add("hide");
    }
};

Autopart.setting = function () {
    // console.log(this.shop);
    let data = { cart: this.cart, shop: this.shop };
    // let url = process.env.MIX_APP_URL + "/api/buyxgety-post";
    // console.log(url);
    $.ajax({
        url: Autopart.url("buyxgety-post"),
        type: "POST",
        data: data,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        success: function (res) {
            // console.log(res);
            Autopart.response = res;

            /*
            let html = Autopart.htmlbuild(res);
            // console.log(html);
            if (Shopify.theme.name == "Porto3.6.3") {
                $('[data-section-type="cart-template"]').append(html);
            } else {
                $("#MainContent").append(html);
            }

            let popup = Autopart.popUpHtmlBuild();
            // console.log(popup);
            $("#buyxgety_popup").find(".content").html(popup);
            if (html == "" || popup == "") {
                Autopart.popup("hide");
            }

            if (popup != "") {
                let eligble_offer = `<div id="buyxgety_alert">
                                        <span class="popup_open">Open</span>
                                        <strong>Check</strong> You are eligible for offer.
                                    </div>`;
                // $('form[action="/cart"]:first-child').parent().before(eligble_offer);
                $('form[action="/cart"][method="post"]')
                    .last()
                    .parent()
                    .before(eligble_offer);
                Autopart.event("add_to_cart");
            }

            /** */
            console.log(res.deposit);
            console.log(res.deposit == "true");
            if (res.deposit) {
                Autopart.event("cart_submit");
            }
        },

        async: false,
    });
    setTimeout(function () {
        $("#checkout").prop("disabled", false);
    }, 1000);
};
Autopart.htmlbuild = function (res) {
    let style = `<style>
        #buyxgety_popup.overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            z-index: 9;
        }
        #buyxgety_popup.overlay.hide {
            visibility: hidden;
            opacity: 0;
        }
        #buyxgety_popup .popup {
            margin: 150px auto;
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            width: 40%;
            position: relative;
            transition: all 5s ease-in-out;
        }
        #buyxgety_popup .popup h2 {
            margin-top: 0;
            color: #333;
            font-family: Tahoma, Arial, sans-serif;
        }
        #buyxgety_popup .popup .close {
            position: absolute;
            top: 20px;
            right: 30px;
            transition: all 200ms;
            font-size: 30px;
            font-weight: bold;
            text-decoration: none;
            color: #333;
        }
        #buyxgety_popup .popup .close:hover {
            color: #06D85F;
        }
        #buyxgety_popup .popup .content {
            max-height: 30%;
            overflow: auto;
        }
        #buyxgety_popup .buy-cart-list img {
            width: 50px;
            height: 100%;
        }
        #buyxgety_popup .get-cart-list img {
            width: 100px;
            height: 100%;
        }
        #buyxgety_popup .cart-list {
            border-color: #ebeef0;
            border-style: solid;
            border-width: 1px;
            padding: 7px;
        }
        #buyxgety_popup .buy-cart-list, #buyxgety_popup .get-cart-list {
            border-color: #ebeef0;
            border-style: solid;
            border-width: 0px 1px 1px 1px;
            display: flex;
            padding: 7px;
        }
        #buyxgety_popup .get-cart-list {
            margin: 0px 0px 7px 117px
        }
        #buyxgety_popup .buy-cart-list:first-child, #buyxgety_popup .get-cart-list:first-child {
            border-top-width: 1px
        }
        #buyxgety_popup .ml-3 {
            margin-left: 7px;
        }
        #buyxgety_popup .buy-cart-list p, #buyxgety_popup .get-cart-list p {
            margin-bottom: 7px;
        }
        #buyxgety_popup [data-action="add-to-cart"] {
            padding: 3px 7px;
        }
        @media screen and (max-width: 700px){
            #buyxgety_popup .get-cart-list {
                margin: 0px 0px 7px 30px;
            }
            #buyxgety_popup .popup{
                width: 95%;
            }
        }
        #buyxgety_alert {
            padding: 20px;
            background-color: #eee  ;
            //color: white;
            margin-bottom: 15px;
        }
        #buyxgety_alert .popup_open {
            margin-left: 15px;
            // color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
        }
        #buyxgety_alert .popup_open:hover {
            color: black;
        }
    </style>`;
    let html = `<div id="buyxgety_popup" class="overlay">
            <div class="popup">
                <h2>Free available</h2>
                <a data-action="close" class="close" href="#">&times;</a>
                <div class="content">
                </div>
            </div>
        </div>`;
    return style + html;
};
Autopart.popUpHtmlBuild = function () {
    let html = "";
    if (this.response.status == "ok") {
        let cart_items = this.cart;
        let _this = this;
        let customize_subtotal_bool = false;
        let storage = Autopart.getValue(Autopart.storage);
        storage = JSON.parse(storage);
        console.log(storage);
        _this.response.data.forEach((val) => {
            // console.log(val);
            let selected_buy_product = val.selected_buy_product;
            let selected_get_product = val.selected_get_product;
            console.log("selected_buy_product", selected_buy_product);
            console.log("selected_get_product", selected_get_product);
            // Object.keys(val.selected_buy_product).forEach(function(key1) {
            //     let product = _this.getProductVariant(key1, val.selected_get_product[key1]);
            // });
            // console.log(product);
            let selected_buy_html = "";
            $.each(selected_buy_product, function (key1, val1) {
                let product = _this.getProductVariant(
                    key1,
                    val.selected_buy_product[key1]
                );
                let qty = val.buy_cart_qty;
                selected_buy_html +=
                    `<div class="buy-cart-list" data-product_id="` +
                    product.legacy_resource_id +
                    `">
                                            <img style="opacity:1;" src="` +
                    product.image +
                    `">
                                            <div class="ml-3">
                                                <p>` +
                    qty +
                    ` * ` +
                    product.title +
                    `</p>
                                            </div>
                                        </div>`;
            });
            // console.log('sssssss', selected_buy_html);
            let selected_get_html = "";
            let storage = Autopart.getValue(Autopart.storage);
            if (storage) {
                storage = JSON.parse(storage);
            }
            $.each(selected_get_product, function (key11, val11) {
                // console.log(val11);
                // console.log(val.selected_get_product[key11]);
                // let product = _this.getProductVariant(key11, val.selected_get_product[key11]);
                let product = _this.getProductVariant(key11, val11);
                let options = "";
                product["variants"].forEach((val111) => {
                    options +=
                        '<option data-select_variant value="' +
                        val111.legacy_resource_id +
                        '">' +
                        val111.title +
                        "</option>";
                });
                // console.log('product', product);
                // let qty = check_in_array.remaining_qty_offer;
                let qty = val.get_cart_qty;
                let disabled = "";
                let add_to_cart = "Add to cart";
                if (storage) {
                    // console.log(key11);
                    // console.log(val.id);
                    // console.log(storage);
                    // console.log(storage[val.id]);
                    // console.log('ssssssssss',storage[val.id].hasOwnProperty(key11));
                    if (
                        storage.hasOwnProperty(val.id) &&
                        storage[val.id].hasOwnProperty(key11)
                    ) {
                        disabled = 'style="cursor:not-allowed" disabled';
                        add_to_cart = "Already added to cart";
                    }
                }

                selected_get_html +=
                    `<div class="get-cart-list" data-product_id="` +
                    product.legacy_resource_id +
                    `">
                    <img style="opacity:1;" src="` +
                    product.image +
                    `">
                    <div class="ml-3">
                        <p>` +
                    qty +
                    ` * ` +
                    product.title +
                    `</p>
                        <select>` +
                    options +
                    `</select>
                        <input type="hidden" name="qty" value="` +
                    qty +
                    `">
                        <button data-product_id="` +
                    product.legacy_resource_id +
                    `" data-action="add-to-cart" ` +
                    disabled +
                    `>` +
                    add_to_cart +
                    `</button>
                    </div>
                </div>`;
            });

            html +=
                '<div class="cart-list" data-setting_id="' +
                val.id +
                '">' +
                selected_buy_html +
                selected_get_html +
                "</div>";
        });
    }
    return html;
};

Autopart.theme = function () {
    let theme = Object;
    theme.rowArr = [
        "tbody tr.cart-item",
        "tbody tr.cart__row",
        "tbody tr.cart__table-row",
        "div.cart-drawer__item",
        "div.cart__row .cart__row--table-large",
    ];
    // theme.priceArr = [
    //     "td.cart-item__totals",
    //     "td.cart__final-price .auto-cart-item-line-price",
    //     "span.cart-item__price",
    //     "td.cart__table-cell--total .cart__price",
    //     // 'span.auto-cart-item-price',
    //     // 'span[data-cart-item-regular-price]',
    //     // 'span.cart__price'
    // ];
    theme.priceArr = ["td.cart-item__details"];

    theme.totalArr = [
        "span.cart-subtotal__price .auto-cart-original-total",
        "[data-cart-price]",
        // 'span.cart-subtotal__price',
        // 'p.cart__subtotal'
    ];
    theme.subtotalArr = [
        "span.cart-subtotal__price .auto-cart-original-total",
        "[data-cart-price]",
        ".totals__subtotal-value",
        // 'span.cart-subtotal__price',
        // 'p.cart__subtotal'
    ];
    theme.rowSelector = "";
    theme.priceSelector = "";

    theme.findRow = function (index) {
        let row_selector = new Array();
        $.each(this.rowArr, function (key, val) {
            // console.log($(val));
            if ($(val).length > 0) {
                // console.log(val);

                row_selector.push($(val)[index]);
            }
        });
        this.rowSelector = $(row_selector);
        return this;
    };
    // theme.findPrice = function (price) {
    //     let selector = new Array();
    //     this.rowSelector.each(function (i, e) {
    //         let selector_temp = $(e).find(theme.priceArr.join(", "));
    //         if (selector_temp.length > 0) {
    //             selector_temp =
    //                 selector_temp.find(".price").length > 1
    //                     ? selector_temp.find(".price")
    //                     : selector_temp;
    //         } else {
    //             selector_temp = $(e).find(".price");
    //         }
    //         selector_temp.each(function (i, e) {
    //             selector.push(e);
    //         });
    //     });
    //     this.priceSelector = $(selector);
    //     return this;
    // };

    theme.addDepositAmount = function (deposit_amount, deposit_total_amount) {
        let selector = new Array();
        console.log(this.rowSelector);
        this.rowSelector.each(function (i, e) {
            // console.log(e);
            let selector_temp = $(e).find(theme.priceArr.join(", "));
            selector_temp
                .find("div.product-option")
                .after(
                    "<div data-deposit_amount><b>Deposit&nbsp;amount:</b><span>$" +
                        parseFloat(deposit_amount).toFixed(2) +
                        "</span></div>"
                );

            $(e)
                .find(".cart-item__price-wrapper")
                .after(
                    "<div data-deposit_total_amount><b>Deposit&nbsp;amount:</b><span>$" +
                        parseFloat(deposit_total_amount).toFixed(2) +
                        "</span></div>"
                );
        });
    };

    // theme.addTotalDepositAmount = function (deposit_amount) {
    //     let selector = new Array();
    //     // console.log(this.rowSelector);
    //     this.rowSelector.each(function (i, e) {
    //         // console.log(e);
    //         let selector_temp = $(e).find(theme.priceArr.join(", "));
    //         selector_temp
    //             .find("div.product-option")
    //             .after(
    //                 "<div data-deposit_amount><b>Deposit amount:</b> <span>$ " +
    //                     deposit_amount +
    //                     "</span></div>"
    //             );
    //     });
    // };

    // theme.setMoney = function (price) {
    //     if (price == 0) {
    //         price = "FREE";
    //     } else {
    //         price = price / 100;
    //         price = price.toFixed(2);
    //         price = Autopart.getMoneyText(price, "INR");
    //     }
    //     return price;
    // };

    // theme.setLinePrice = function (price) {
    //     //currency app

    //     price = this.setMoney(price);

    //     this.priceSelector.each(function (e, i) {
    //         let new_el = $(this).clone();
    //         $(this).css("text-decoration", "line-through");
    //         $(this)
    //             .parent()
    //             .find("data-" + Autopart.prefix + "_line_price")
    //             .remove();
    //         $(this)
    //             .parent()
    //             .append(
    //                 $(new_el)
    //                     .attr("data-" + Autopart.prefix + "_line_price", "")
    //                     .css("display", "block")
    //                     .text(price)
    //             );
    //     });
    // };

    theme.setSubtotal = function (subtotal) {
        // subtotal = this.setMoney(subtotal);
        subtotal = parseFloat(subtotal).toFixed(2);
        subtotal = "$" + subtotal + " USD";
        // console.log($(".totals__subtotal-value"));
        // console.log(this.subtotalArr.join(", "));
        // console.log($(this.subtotalArr.join(", ")));
        let vm = this;
        setTimeout(function () {
            $(vm.subtotalArr.join(", ")).each(function (e, i) {
                let new_el = $(this).clone();
                // console.log(new_el);
                $(this).css("text-decoration", "line-through");
                $(this)
                    .parent()
                    .find("data-" + Autopart.prefix + "_subtotal")
                    .remove();
                $(this)
                    .parent()
                    .append(
                        new_el
                            .attr("data-" + Autopart.prefix + "_subtotal", "")
                            .css("display", "block")
                            .text(subtotal)
                    );
            });
        }, 1000);
    };
    return theme;
};

Autopart.lineItemsBuildHelper = function () {
    let lineItemsBuild = new Object();
    /*
    lineItemsBuild.storage = JSON.parse(Autopart.getValue(Autopart.storage));
    lineItemsBuild.data = {
        items: Autopart.cart.items,
        subtotal: Autopart.cart.total_price,
    };

    lineItemsBuild.arraySearchOffer = function (value) {
        let data = { flag: false };
        let arr = Autopart.response.data;
        $.each(arr, function (key, val) {
            if (value == val.id) {
                data.flag = true;
                data.data = val;
            }
        });
        return data;
    };
    //search product to local storage then search in offer quantity
    lineItemsBuild.searchInOffer = function (item) {
        let offer_id = new Array();
        let variant_id = item.variant_id;
        let product_id = item.product_id;
        let quantity = 0;
        $.each(lineItemsBuild.storage, function (key, val) {
            if (
                val.hasOwnProperty(product_id) &&
                val[product_id] == variant_id
            ) {
                offer_id = key;
                offer = lineItemsBuild.arraySearchOffer(offer_id);
                if (offer.flag) {
                    quantity += offer.data.get_cart_qty;
                }
            }
        });
        return quantity;
    };
    /** */

    return lineItemsBuild;
};
Autopart.lineItemsBuild = function () {
    let theme = Autopart.theme();

    let lineItemsBuild = Autopart.lineItemsBuildHelper();

    /*
    $.each(lineItemsBuild.data.items, function (key, val) {
        let line_price = val["line_price"];
        let quantity = lineItemsBuild.searchInOffer(val);
        let line_price_discount = quantity * val["price"];
        line_price = lineItemsBuild.data.items[key][
            Autopart.prefix + "_line_price"
        ] = line_price - line_price_discount;
        if (quantity > 0) {
            lineItemsBuild.data.subtotal -= line_price_discount;
            console.log(lineItemsBuild.data.subtotal);
            theme.findRow(key).findPrice().setLinePrice(line_price);
        }
    });
    */
    // console.log(Autopart.cart);
    subtotalAmount = 0;
    _.each(Autopart.response.variants, function (val, key) {
        console.log(val["deposit_status"]);
        if (val["deposit_status"] == "true") {
            let row = theme.findRow(key);
            row.addDepositAmount(
                val.deposit_amount,
                val.deposit_amount * Autopart.cart.items[key].quantity
            );

            subtotalAmount +=
                val.deposit_amount * Autopart.cart.items[key].quantity;
            // console.log("selector-----", theme.findRow(key).rowSelector);
        }
    });

    theme.setSubtotal(Autopart.cart.total_price / 100 + subtotalAmount);
};

Autopart.event = function (type = "cart_submit") {
    if (typeof directCheckoutButtonSelector != "undefined") {
        cart_submit = $(directCheckoutButtonSelector);
    }
    if (
        typeof directCheckoutButtonSelector == "undefined" ||
        cart_submit.length < 1
    ) {
        cart_submit = $(
            "button:contains('Checkout'):not(.cart_button), button:contains('Check out'):not(.cart_button), button:contains('CHECKOUT'):not(.cart_button), button:contains('Check Out'):not(.cart_button), .checkoutcartbtn, .cart__submit, [type=\"submit\"][name=\"checkout\"]"
        );
    }
    console.log(cart_submit);
    let draft_request_data = new Object();
    draft_request_data.cart = Autopart.cart;
    if (Shopify.theme.id != 132919656668) {
        cart_submit.on("click", function (e) {
            $.ajax({
                url: Autopart.url("buyxgety-create-draft"),
                type: "POST",
                data: draft_request_data,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                success: function (res) {
                    if (
                        Shopify.theme.id != 132919656668 &&
                        !res["draft"]["errors"]
                    ) {
                        window.location.href =
                            res["draft"]["body"]["draft_order"]["invoice_url"];
                        // window
                        //     .open(
                        //         res["draft"]["body"]["draft_order"][
                        //             "invoice_url"
                        //         ]
                        //         // ,"_blank"
                        //     )
                        //     .focus();
                    }
                },
            });

            e.preventDefault();
            return false;
        });
    }
};

Autopart.init();
