<template>
    <div>
        <form v-on:submit.prevent="save" class="row mb-3" enctype="multipart/form-data">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="form-label">Ingredient name:</label>
                    <div class="input-group">
                        <input
                            v-model="ingredient.name"
                            name="name"
                            v-validate="'required'"
                            type="text"
                            placeholder="Ingredient name"
                            :class="{ 'form-control': true, 'is-invalid': submitted && errors.has('name') }"
                        />
                    </div>
                </div>
                <div
                    v-if="$_.has(server_errors, 'name')"
                    class="invalid-feedback d-block"
                >{{ server_errors.name.join(', ') }}</div>

                <div class="form-group">
                    <label class="form-label">Ingredient content:</label>
                    <textarea
                        v-model="ingredient.content"
                        name="content"
                        v-validate="'required'"
                        placeholder="Ingredient content"
                        :class="{ 'form-control': true, 'is-invalid': submitted && errors.has('content') }"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Ingredient image:</label>
                    <div style="width:200px">
                        <img
                            class="img-thumbnail img-fluid"
                            v-if="preview_image != ''"
                            :src="preview_image"
                        />
                    </div>
                    <div class="custom-file">
                        <input
                            v-if="$_.has(edit_ingredient, 'image')"
                            @change="onFileChange"
                            type="file"
                            id="customFile"
                            name="image"
                            :class="{ 'custom-file-input': true, 'is-invalid': submitted && errors.has('image') }"
                        />
                        <input
                            v-else
                            v-validate="'required'"
                            @change="onFileChange"
                            type="file"
                            id="customFile"
                            name="image"
                            :class="{ 'custom-file-input': true, 'is-invalid': submitted && errors.has('image') }"
                        />

                        <label
                            :class="{ 'custom-file-label': true, 'is-invalid': submitted && errors.has('image') }"
                            for="customFile"
                        >Choose file</label>
                    </div>
                    <div
                        v-if="$_.has(server_errors, 'image')"
                        class="invalid-feedback d-block"
                    >{{ server_errors.image.join(', ') }}</div>
                </div>

                <div class="form-group">
                    <label for="ingredient-country">Select country</label>
                    <select
                        v-model="ingredient.country_id"
                        name="country_id"
                        multiple
                        :class="{ 'form-control': true, 'is-invalid': submitted && errors.has('country_id') }"
                        id="ingredient-country"
                        v-validate="'required'"
                    >
                        <option
                            v-for="(country_val, country_id) in countries"
                            :key="country_id"
                            :value="country_val.id"
                        >{{ country_val.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="ingredient-category">Select category</label>
                    <select
                        v-model="ingredient.category_id"
                        name="category_id"
                        :class="{ 'form-control': true, 'is-invalid': submitted && errors.has('category_id') }"
                        id="ingredient-category"
                        v-validate="'required'"
                    >
                        <option
                            v-for="(category_val, category_id) in categories"
                            :key="category_id"
                            :value="category_val.id"
                        >{{ category_val.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-12">
                <button
                    v-if="$_.has(ingredient, 'id')"
                    @click="save"
                    type="button"
                    class="btn btn-info"
                >Update</button>
                <button v-else type="submit" class="btn btn-primary">Add</button>
                <!-- <button v-else @click="save" type="button" class="btn btn-primary">Add</button> -->
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
// import e from 'cors';
export default {
    name: "ingredient_add",
    props: {
        edit_ingredient: Object
    },
    beforeMount() {
        this.getCountry();
        this.getCategory();
        this.ingredient.country_id = [""];
        this.ingredient.category_id = [""];
        if (_.has(this.edit_ingredient, 'name')) {
            this.ingredient = this.edit_ingredient;
            this.ingredient.country_id = _.map(this.edit_ingredient.country, 'id');
            this.preview_image = this.$popup_data.asset('storage/' + this.ingredient.image);
        }
    },
    data() {
        return {
            countries: [],
            categories: [],
            ingredient: {},
            submitted: false,
            server_errors: {

            },
            preview_image: ''
        }
    },
    methods: {
        getCountry() {
            let vm = this;
            axios.get(this.$popup_data.route('country_get'), {})
                .then(function (res) {
                    vm.countries = res.data.data;
                });
        },
        getCategory() {
            let vm = this;
            axios.get(this.$popup_data.route('category_get'), {})
                .then(function (res) {
                    vm.categories = res.data.data;
                });
        },
        onFileChange(e) {
            this.ingredient.image = e.srcElement.files[0];
            this.preview_image = URL.createObjectURL(this.ingredient.image);
        },
        // update() {
        //     let vm = this;
        //     axios.post(this.$popup_data.route('ingredient_update') + '/' + vm.ingredient.id, vm.ingredient)
        //         .then(function (res) {
        //             vm.$popup_data.message(res.data.message);
        //
        //         });
        // },

        cancel() {
            this.$emit('load_list');
        },
        save() {
            this.submitted = true;
            let vm = this;
            this.$validator.validate().then(valid => {
                if (valid) {

                    let url = vm.$popup_data.route('ingredient_add');
                    if (_.has(this.edit_ingredient, 'name')) {
                        url = vm.$popup_data.route('ingredient_update') + '/' + this.edit_ingredient.id;
                    }

                    let config = {
                        header: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                    // console.log(vm.ingredient.country_id);
                    let formData = new FormData();
                    formData.append("category_id", vm.ingredient.category_id);
                    formData.append("content", vm.ingredient.content);
                    formData.append("country_id", JSON.stringify(vm.ingredient.country_id));
                    formData.append("name", vm.ingredient.name);
                    if (typeof vm.ingredient.image == 'object') {
                        formData.append("image", vm.ingredient.image);
                    }
                    axios.post(url, formData, config)
                        .then((res) => {
                            vm.server_errors = {};
                            vm.ingredient = {};
                            vm.$popup_data.message(res.data.message);
                            vm.$emit('refresh');
                        })
                        .catch((error) => {
                            vm.server_errors = error.response.data.errors
                        })
                }
            });

        }
    }
}
</script>
