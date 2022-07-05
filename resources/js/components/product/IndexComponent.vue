<template>
    <div>
        <div class="row mb-3">
            <div class="col-auto">
                <label class="form-label">Product list:</label>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Variant id</th>
                            <th>Title</th>
                            <th>SKU</th>
                            <th>Product title</th>
                            <th>Status</th>
                            <th>Deposit amount</th>
                            <th>Deposit note</th>
                            <th>Deposit status</th>
                        </tr>
                    </thead>
                    <!-- <tbody v-if="variants.length > 0">
                        <tr v-for="(variant, key) in variants" :key="key">
                            <td>{{ key + 1 }}</td>
                            <td>{{ variant.legacy_resource_id }}</td>
                            <td>{{ variant.title }}</td>
                            <td>{{ variant.sku }}</td>
                            <td>{{ variant.product.title }}</td>
                            <td>{{ variant.product.status }}</td>
                            <td>
                                <div>
                                    <span>
                                        $<span class="editable">{{
                                            variant.deposit_amount
                                        }}</span>
                                    </span>
                                    <button>
                                        <i class="fa fa-edit"></i>
                                    </button>
                                </div>
                            </td>
                            <td>{{ variant.deposit_note }}</td>
                            <td>{{ variant.deposit_status }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" align="center">
                                No Product Found.
                            </td>
                        </tr>
                    </tbody> -->
                </table>
            </div>
        </div>
    </div>
</template>

<script>
// import VueBootstrap4Table from "vue-bootstrap4-table";
// import { ServerTable, ClientTable, Event } from "vue-tables-2";
var product_edit = Vue.component("product-edit", {
    template: `<div>
                <h1>lodesdasdasad</h1>
            </div>`,
    mounted() {
        console.log("ok");
    },
});
import axios from "axios";

export default {
    name: "product_list",

    mounted() {
        this.$emit("pagetitlechange", this.page_title);
        this.getProductList();
        let vm = this;
        $(document).on("click", "[data-edit]", function () {
            let html = "";
            if ($(this).attr("data-edit") == "deposit_amount") {
                html =
                    `<div class="input-group">
                        <input class="form-control" placeholder="Amount" type="number" value="` +
                    $(this).closest("td").find("span.editable").text() +
                    `" />
                        <div class="input-group-append">
                            <button data-save="` +
                    $(this).attr("data-edit") +
                    `" data-variant_id="` +
                    $(this).attr("data-variant_id") +
                    `" class="btn btn-outline-primary" type="button"><i class="fa fa-save"></i></button>
                        </div>
                    </div>`;
            } else if ($(this).attr("data-edit") == "deposit_note") {
                html =
                    `<div class="input-group">
                        <textarea class="form-control">` +
                    $(this).closest("td").find("span.editable").text() +
                    `</textarea>
                        <div class="input-group-append">
                            <button data-save="` +
                    $(this).attr("data-edit") +
                    `" data-variant_id="` +
                    $(this).attr("data-variant_id") +
                    `" class="btn btn-outline-primary" type="button"><i class="fa fa-save"></i>
                            </button>
                        </div>
                    </div>`;
            }
            $(this).closest("td").html(html);
            $(this).remove();
        });
        $(document).on("click", "[data-save]", function () {
            let value = new Object();
            let text = $(this).closest("td").find("input, textarea").val();
            value[$(this).attr("data-save")] = text;

            let html = '<span class="editable">' + text + "</span>";
            console.log(html);
            if ($(this).attr("data-save") == "deposit_amount") {
                html = "<span>$" + html + "</span>";
            }
            console.log(html);
            html +=
                '<button class="btn btn-sm btn-outline-primary" data-edit="' +
                $(this).attr("data-save") +
                '" data-variant_id="' +
                $(this).attr("data-variant_id") +
                '"><i class="fa fa-edit"></i></button>';
            console.log(html);
            $(this).closest("td").html(html);
            vm.updateVariant($(this).attr("data-variant_id"), value);
        });
    },
    data() {
        return {
            page_title: "Product",
            // products: {
            //     data: [],
            // },
            server_errors: {},
            variants: [],
            idforupdate: "",
            datatable: "",
        };
    },
    methods: {
        getProductList() {
            let this_temp = this;
            if (this.datatable == "") {
                this.datatable = $(".data-table").DataTable({
                    processing: true,
                    serverSide: true,
                    // ajax: this_temp.$popup_data.route("variant_get"),
                    ajax: {
                        url: this_temp.$popup_data.route("variant_get"),
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            return JSON.stringify(json);
                        },
                        sync: false,
                    },
                    columns: [
                        // {
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
                        { data: "id", name: "id" },
                        {
                            data: "legacy_resource_id",
                            name: "legacy_resource_id",
                        },
                        { data: "title", name: "title" },
                        { data: "sku", name: "sku" },
                        { data: "product.title", name: "product.title" },
                        { data: "product.status", name: "product.status" },
                        { data: "deposit_amount", name: "deposit_amount" },
                        { data: "deposit_note", name: "deposit_note" },
                        { data: "deposit_status", name: "deposit_status" },
                    ],
                    drawCallback: function (settings, json) {
                        $("[data-bootstrap-switch]").each(function () {
                            $(this).bootstrapSwitch({
                                onSwitchChange: function (event, state) {
                                    let id = $(event.currentTarget).attr(
                                        "data-variant_id"
                                    );
                                    state = state ? "true" : "false";
                                    let value = {
                                        deposit_status: state,
                                    };
                                    this_temp.updateVariant(id, value);
                                },
                            });
                        });
                    },
                });
            } else {
                this.datatable.ajax.reload();
            }
        },
        updateVariant(id, value) {
            console.log(id);
            console.log(value);
            let vm = this;
            axios
                .post(
                    this.$popup_data.route("variant_update") + "/" + id,
                    value
                )
                .then(function (res) {
                    console.log(res);
                    vm.$popup_data.message(res.data.message);
                    // vm.getCountryList();
                })
                .catch((error) => {
                    console.log(error);
                    // vm.server_errors = error.response.data.errors;
                });
        },
    },
    components: {
        // VueBootstrap4Table,
        "product-edit": product_edit,
    },
};
</script>
