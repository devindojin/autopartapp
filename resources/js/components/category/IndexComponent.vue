<template>
    <div>
        <div class="row mb-3">
            <div class="col-auto">
                <label class="form-label">Category name:</label>
            </div>
            <div class="col-auto">
                <div class="input-group">
                    <input
                        v-model="category.name"
                        name="name"
                        v-validate="'required'"
                        type="text"
                        class="form-control"
                        placeholder="Category name"
                        :class="{ 'is-invalid': submitted && errors.has('name') }"
                    />
                </div>
                <div v-if="$_.has(server_errors, 'name')" class="invalid-feedback d-block">
                    {{ server_errors.name.join(', ') }}
                </div>
            </div>
            <div class="col-auto">
                <button v-if="$_.has(category, 'id')" @click="update" type="button" class="btn btn-info">Update</button>
                <button v-else @click="save" type="button" class="btn btn-primary">Add</button>
                <button @click="clear" type="button" class="btn btn-warning">Clear</button>
            </div>
        </div>


        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category_val, category_key) in countries" :key="category_key">
                    <td>{{ category_key + 1 }}</td>
                    <td>{{ category_val.name }}</td>
                    <td>
                        <button @click="edit(category_val.id)" class="btn btn-sm btn-info"><i class="fa fa-edit"></i></button>
                        <button @click="remove(category_val.id)" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "category_list",
    beforeMount() {
        this.getCategoryList();
    },
    mounted() {
        this.$emit('pagetitlechange', this.page_title);
    },
    data() {
        return {
            page_title: "Category",
            category: {},
            countries: [],
            // popup_data: [],
            submitted: false,
            geocoder: '',
            server_errors: {

            }
        }
    },
    methods: {
        edit(id) {
            let vm = this;
            axios.post(this.$popup_data.route('category_detail')+'/'+id, {})
            .then(function(res) {
                vm.category = res.data.data;
            });
        },
        update() {
            let vm = this;
            axios.post(this.$popup_data.route('category_update')+'/'+vm.category.id, vm.category)
            .then(function(res) {
                vm.$popup_data.message(res.data.message);
                vm.getCategoryList();
            }).catch((error) => {
                vm.server_errors = error.response.data.errors
            });
        },
        getCategoryList() {
            let vm = this
            axios.get(this.$popup_data.route('category_get'), {})
            .then(function(res) {
                vm.countries = res.data.data;
            });
        },
        clear() {
            this.category = {};
        },
        save() {
            this.submitted = true;
            let vm = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    let url = vm.$popup_data.route('category_add');
                    axios.post(url, vm.category)
                        .then((res) => {
                            vm.server_errors = {};
                            vm.category = {};
                            vm.$popup_data.message(res.data.message);
                            vm.getCategoryList();
                        })
                        .catch((error) => {
                            vm.server_errors = error.response.data.errors
                        })
                        // .catch(({ res }) => {
                        //     console.log(res);
                        //     vm.server_errors = res.data.errors;
                        // });
                }
            });

        },
        remove(id) {
            let vm = this;
            axios.delete(this.$popup_data.route('category_delete')+'/'+id, {'_method': 'delete'})
            .then(function(res) {
                vm.$popup_data.message(res.data.message);
                vm.getCategoryList();
            });
        }
    }
}
</script>
