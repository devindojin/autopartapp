<template>
    <div>
        <!-- <draggable v-model="ingredients">
                    <transition-group>
                    </transition-group>
        </draggable> -->
        <div>
            <draggable v-model="ingredients" @change="changeOrder">
                <transition-group class="div-table">
                    <div
                        class="div-table-row d-flex1 justify-content-between1 align-items-center1"
                        v-for="ingredient_val in ingredients"
                        :key="ingredient_val.id"
                    >
                        <!-- <div>{{ ingredient_key + 1 }}</div> -->
                        <div class="div-table-col">
                            {{ ingredient_val.name }}
                        </div>
                        <div class="div-table-col">
                            {{ ingredient_val.category.name }}
                        </div>
                        <div class="div-table-col">
                            {{
                                $_.map(ingredient_val.country, "name").join(
                                    " ,"
                                )
                            }}
                        </div>
                        <div class="div-table-col">
                            <div style="max-width: 100px">
                                <img
                                    class="img-thumbnail img-fluid"
                                    :src="
                                        $popup_data.asset(
                                            'storage/' + ingredient_val.image
                                        )
                                    "
                                    :alt="ingredient_val.name"
                                />
                            </div>
                        </div>
                        <div class="div-table-col">
                            <div>
                                <button
                                    @click="edit(ingredient_val.id)"
                                    class="btn btn-sm btn-info"
                                >
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button
                                    @click="remove(ingredient_val.id)"
                                    class="btn btn-sm btn-danger"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
        <!-- <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Country</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(ingredient_val, ingredient_key) in ingredients"
                    :key="ingredient_key"
                >
                    <td>{{ ingredient_key + 1 }}</td>
                    <td>{{ ingredient_val.name }}</td>
                    <td>{{ ingredient_val.category.name }}</td>
                    <td>
                        {{ $_.map(ingredient_val.country, "name").join(" ,") }}
                    </td>
                    <td>
                        <div style="width: 100px">
                            <img
                                class="img-thumbnail img-fluid"
                                :src="
                                    $popup_data.asset(
                                        'storage/' + ingredient_val.image
                                    )
                                "
                                :alt="ingredient_val.name"
                            />
                        </div>
                    </td>
                    <td>
                        <button
                            @click="edit(ingredient_val.id)"
                            class="btn btn-sm btn-info"
                        >
                            <i class="fa fa-edit"></i>
                        </button>
                        <button
                            @click="remove(ingredient_val.id)"
                            class="btn btn-sm btn-danger"
                        >
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>
<style lang="scss" scoped>
.div-table {
    display: table;
    width: 100%;
    background-color: #fff;
    border: 1px solid #eee;
    border-spacing: 5px; /* cellspacing:poor IE support for  this */
}
.div-table-row {
    //   display: table-row;
    display: flex;
    width: auto;
    clear: both;
    background-color: #edeeef;
    margin-bottom: 5px;
    cursor: move;
}
.div-table-col {
    float: left; /* fix for  buggy browsers */
    display: table-column;
    width: 20%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-self: center;
}
</style>
<script>
import axios from "axios";
import draggable from "vuedraggable";

export default {
    name: "ingredient_list",
    beforeMount() {
        this.getIngredientList();
    },
    // mounted() {
    //     // this.$emit('pagetitlechange', this.page_title);
    // },
    data() {
        return {
            ingredients: [],
        };
    },
    methods: {
        getIngredientList() {
            let vm = this;
            axios
                .get(this.$popup_data.route("ingredient_get"), {})
                .then(function (res) {
                    vm.ingredients = res.data.data;
                });
        },
        edit(id) {
            // let vm = this;
            // axios.post(this.$popup_data.route('ingredient_detail') + '/' + id, {})
            //     .then(function (res) {
            //         vm.ingredient = res.data.data;
            //     });
            this.$emit("edit", id);
        },
        remove(id) {
            let vm = this;
            axios
                .delete(
                    this.$popup_data.route("ingredient_delete") + "/" + id,
                    { _method: "delete" }
                )
                .then(function (res) {
                    vm.$popup_data.message(res.data.message);
                    vm.$emit("refresh");
                });
        },
        changeOrder() {
            let vm = this;
            axios
                .post(
                    this.$popup_data.route("ingredient_order"),
                    vm.ingredients
                )
                .then(function (res) {
                    vm.ingredients = res.data.data;
                });
            // console.log(this.ingredients);
        },
    },
    components: {
        draggable: draggable,
    },
};
</script>
