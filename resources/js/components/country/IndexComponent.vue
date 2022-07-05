<template>
    <div>
        <div class="row mb-3">
            <div class="col-auto">
                <label class="form-label">Country name:</label>
            </div>
            <div class="col-auto">
                <div class="input-group">
                    <input
                        v-model="country.name"
                        name="name"
                        v-validate="'required'"
                        type="text"
                        class="form-control"
                        placeholder="Country name"
                        :class="{
                            'is-invalid': submitted && errors.has('name'),
                        }"
                    />
                    <button
                        @click="searchGeocode"
                        class="input-group-btn btn btn-info"
                    >
                        Search
                    </button>
                </div>
                <div
                    v-if="$_.has(server_errors, 'name')"
                    class="invalid-feedback d-block"
                >
                    {{ server_errors.name.join(", ") }}
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group">
                    <input
                        v-model="country.lat"
                        name="lat"
                        placeholder="Lat"
                        v-validate="'required'"
                        type="text"
                        class="form-control"
                        :class="{
                            'is-invalid': submitted && errors.has('lat'),
                        }"
                    />
                    <input
                        v-model="country.lng"
                        name="lng"
                        placeholder="Lng"
                        v-validate="'required'"
                        type="text"
                        class="form-control"
                        :class="{
                            'is-invalid': submitted && errors.has('lng'),
                        }"
                    />
                </div>
            </div>
            <div class="col-auto">
                <button
                    v-if="$_.has(country, 'id')"
                    @click="update"
                    type="button"
                    class="btn btn-info"
                >
                    Update
                </button>
                <button
                    v-else
                    @click="save"
                    type="button"
                    class="btn btn-primary"
                >
                    Add
                </button>
                <button @click="clear" type="button" class="btn btn-warning">
                    Clear
                </button>
            </div>
        </div>

        <!-- <form class="row g-3">
			<div class="col-auto">
				<label for="staticEmail2" class="visually-hidden">Email</label>
				<input
					type="text"
					readonly
					class="form-control-plaintext"
					id="staticEmail2"
					value="email@example.com"
				/>
			</div>
			<div class="col-auto">
				<label for="inputPassword2" class="visually-hidden">Password</label>
				<input type="password" class="form-control" id="inputPassword2" placeholder="Password" />
			</div>
			<div class="col-auto">
				<button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
			</div>
        </form>-->

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Logitude</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(country_val, country_key) in countries"
                    :key="country_key"
                >
                    <td>{{ country_key + 1 }}</td>
                    <td>{{ country_val.name }}</td>
                    <td>{{ country_val.lat }}</td>
                    <td>{{ country_val.lng }}</td>
                    <td>
                        <button
                            @click="edit(country_val.id)"
                            class="btn btn-sm btn-info"
                        >
                            <i class="fa fa-edit"></i>
                        </button>
                        <button
                            @click="remove(country_val.id)"
                            class="btn btn-sm btn-danger"
                        >
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { Loader } from "google-maps";
import axios from "axios";
export default {
    name: "country_list",
    beforeMount() {
        this.getCountryList();
    },
    mounted() {
        this.$emit("pagetitlechange", this.page_title);
        this.loadGoogleLib();
    },
    data() {
        return {
            page_title: "Country",
            country: {},
            countries: [],
            // popup_data: [],
            submitted: false,
            geocoder: "",
            server_errors: {},
        };
    },
    methods: {
        edit(id) {
            let vm = this;
            axios
                .post(this.$popup_data.route("country_detail") + "/" + id, {})
                .then(function (res) {
                    vm.country = res.data.data;
                });
        },
        update() {
            let vm = this;
            axios
                .post(
                    this.$popup_data.route("country_update") +
                        "/" +
                        vm.country.id,
                    vm.country
                )
                .then(function (res) {
                    vm.$popup_data.message(res.data.message);
                    vm.getCountryList();
                })
                .catch((error) => {
                    vm.server_errors = error.response.data.errors;
                });
        },
        getCountryList() {
            let vm = this;
            axios
                .get(this.$popup_data.route("country_get"), {})
                .then(function (res) {
                    vm.countries = res.data.data;
                });
        },
        clear() {
            this.country = {};
        },
        loadGoogleLib() {
            // let loader = new Loader('AIzaSyCJCpOT3mre1PxU2JVAkAlzRpzNls4rVaE');
            let loader = new Loader(this.$popup_data.google_map_api_key);

            let vm = this;
            loader.load().then(function (google) {
                vm.geocoder = new google.maps.Geocoder();
                console.log(vm.geocoder);
            });
        },
        searchGeocode() {
            // if (false) {
            let vm = this;
            let request = { address: this.country.name };
            this.geocoder.geocode(request).then((result, status) => {
                console.log(result);
                let geometry_location = result.results[0].geometry.location;
                console.log(geometry_location);
                let lat = geometry_location.lat();
                console.log(lat);
                let lng = geometry_location.lng();
                console.log(lng);
                // vm.country = {lat: lat, lng: lng};
                vm.country.lat = lat;
                vm.country.lng = lng;
                console.log(vm.country);
                vm.country.__ob__.dep.notify();
                // return result;
            });
            // } else {
            //     this.country.lat = '';
            //     this.country.lng = '';
            // }
        },
        save() {
            console.log(this);
            this.submitted = true;
            let vm = this;
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let url = vm.$popup_data.route("country_add");
                    axios
                        .post(url, vm.country)
                        .then((res) => {
                            vm.server_errors = {};
                            vm.country = {};
                            vm.$popup_data.message(res.data.message);
                            vm.getCountryList();
                        })
                        // .catch(({ res }) => {
                        //     vm.server_errors = res.data.errors;
                        // });
                        .catch((error) => {
                            vm.server_errors = error.response.data.errors;
                        });
                }
            });
        },
        remove(id) {
            let vm = this;
            axios
                .delete(this.$popup_data.route("country_delete") + "/" + id, {
                    _method: "delete",
                })
                .then(function (res) {
                    vm.$popup_data.message(res.data.message);
                    vm.getCountryList();
                });
        },
    },
};
</script>
