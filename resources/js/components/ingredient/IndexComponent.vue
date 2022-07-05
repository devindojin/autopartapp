<template>
    <div>
        <div class="text-right">
            <button v-if="component_name == 'list'" @click="addIngredient" class="btn btn-success mb-3">
                <i class="fa fa-plus"></i> Add
            </button>
            <button v-else @click="cancel" class="btn btn-success mb-3">
                Cancel
            </button>
        </div>
        <component :edit_ingredient="edit_ingredient" :is="componentLoaded" @refresh="refresh" @edit="edit"></component>
    </div>
</template>
<script>
import axios from 'axios';
import ListComponentVue from '../ingredient/ListComponent.vue';
import AddEditComponentVue from '../ingredient/AddEditComponent.vue';
export default {
    name: "ingredient",
    beforeMount() {
        // this.getCategoryList();
    },
    mounted() {
        this.$emit('pagetitlechange', this.page_title);
    },
    data() {
        return {
            page_title: "Ingredient",
            componentLoaded: ListComponentVue,
            component_name: 'list',
            edit_ingredient: {}
        }
    },
    methods: {
        addIngredient() {
            this.componentLoaded = AddEditComponentVue;
            this.component_name = 'add';
            this.edit_ingredient = {};
        },
        cancel() {
            this.componentLoaded = ListComponentVue;
            this.component_name = 'list';
            this.edit_ingredient = {};
        },
        refresh() {
            this.edit_ingredient = {};
            if(this.component_name == 'list') {
                this.$router.go(this.$router.currentRoute)
            } else {
                this.componentLoaded = ListComponentVue;
                this.component_name = 'list';
            }
        },
        edit(id) {
            let vm = this;
            axios.get(this.$popup_data.route('ingredient_detail') + '/' + id, {})
                .then(function (res) {
                    vm.addIngredient();
                    vm.edit_ingredient = res.data.data;
                });
        },
        // edit(id) {
        //     let vm = this;
        //     axios.post(this.$popup_data.route('category_detail')+'/'+id, {})
        //     .then(function(res) {
        //         vm.category = res.data.data;
        //     });
        // },
        // update() {
        //     let vm = this;
        //     axios.post(this.$popup_data.route('category_update')+'/'+vm.category.id, vm.category)
        //     .then(function(res) {
        //         vm.$popup_data.message(res.data.message);
        //         vm.getCategoryList();
        //     });
        // },
        // getCategoryList() {
        //     let vm = this
        //     axios.get(this.$popup_data.route('category_get'), {})
        //     .then(function(res) {
        //         vm.countries = res.data.data;
        //     });
        // },
        // clear() {
        //     this.category = {};
        // },
        // save() {
        //     this.submitted = true;
        //     let vm = this;
        //     this.$validator.validate().then(valid => {
        //         if (valid) {
        //             let url = vm.$popup_data.route('category_add');
        //             axios.post(url, vm.category)
        //                 .then((res) => {
        //                     vm.server_errors = {};
        //                     vm.category = {};
        //                     vm.$popup_data.message(res.data.message);
        //                     vm.getCategoryList();
        //                 })
        //                 .catch(({ res }) => {
        //                     vm.server_errors = res.data.errors;
        //                 });
        //         }
        //     });

        // },
        // remove(id) {
        //     let vm = this;
        //     axios.delete(this.$popup_data.route('category_delete')+'/'+id, {'_method': 'delete'})
        //     .then(function(res) {
        //         vm.$popup_data.message(res.data.message);
        //         vm.getCategoryList();
        //     });
        // }
    }
}
</script>
