<template>
    <div style="position: relative">
        <!-- <h1>HAAAAAAAAAAAAAAAAAAAAAAAA {{ ready }}</h1> -->
        <!-- <div v-if="ready" class="popup-fixed">
        <popup-component-vue :design="design" :general="general"></popup-component-vue>
        </div>-->
        <div class="map-content-container">
            <select @change="onChange">
                <!-- <option value>--Select--</option> -->
                <option
                    v-for="ingredient in ingredients"
                    :key="ingredient.id"
                    :value="ingredient.id"
                >
                    {{ ingredient.name }}
                </option>
            </select>
            <div class="map-content" v-if="detail != ''">
                <div class="img-content">
                    <img
                        :src="$popup_data.storage(detail.image)"
                        :alt="detail.name"
                    />
                </div>
                <div class="content">
                    <p>{{ detail.content }}</p>
                </div>
            </div>
        </div>
        <div id="map" style="width: 100%; height: 600px"></div>
        <div class="controls zoom-control">
            <button class="zoom-control-in" title="Zoom In">+</button>
            <button class="zoom-control-out" title="Zoom Out">−</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.gm-style {
    .controls {
        font-size: 28px;
        /* this adjusts the size of all the controls */
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
        box-sizing: border-box;
        border-radius: 2px;
        cursor: pointer;
        font-weight: 300;
        height: 1em;
        margin: 6px;
        text-align: center;
        user-select: none;
        padding: 2px;
        width: 1em;
    }

    .controls button {
        border: 0;
        background-color: white;
        color: rgba(0, 0, 0, 0.6);
    }

    .controls button:hover {
        color: rgba(0, 0, 0, 0.9);
    }

    .controls.zoom-control {
        display: flex;
        flex-direction: column;
        height: auto;
    }

    .controls.zoom-control button {
        font: 0.85em Arial;
        margin: 1px;
        padding: 0;
    }
}

.map-content-container {
    position: absolute;
    top: calc(50% - 105px);
    right: 0;
    margin-right: 15px;
    z-index: 1;
    select {
        width: calc(100% - 150px / 2);
        border-radius: 8px;
        font-size: 15px;
        margin-left: calc(150px / 2);
        height: 45px;
    }
    .map-content {
        max-width: 450px;
        display: flex;
        margin-top: 15px;
        .img-content {
            background: #fff;
            border-radius: 50% 0 0 50%;
            width: 150px;
            height: 150px;
        }
        .img-content img {
            transform: scale(1.4);
            z-index: -1;
            max-width: 150px;
            transition: transform 2s;
        }
        .content {
            background: #fff;
            display: flex;
            p {
                font-size: 13px;
                font-weight: 600;
                align-self: center;
                padding: 5px 25px 5px 25px;
                text-align: justify;
                // height: 100%;
                height: 100%;
            }
            // border-radius: 0 15px 15px 0;
            border-radius: 0 5px 5px 0;
            height: 150px;
            overflow: hidden;
            overflow-y: auto;
        }
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            // background-color: #f5f5f5;
            border-radius: 0 15px 15px 0;
        }

        ::-webkit-scrollbar {
            width: 6px;
            //background-color: #f5f5f5;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #000000;
            border-radius: 0 15px 15px 0;
        }
    }
}
// .popup-fixed {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     // background: #fffffff5;
//     z-index: 999;
// }
// @media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (max-width: 767px) {
    .map-content-container {
        position: unset;
        background: #f1f1f1;
        padding: 15px;
        margin: 0;
        select {
            width: 100%;
            margin-left: 0;
        }
        .map-content {
            max-width: unset;
        }
        // .content {
        //     p {
        //         height: 100%;
        //     }
        // }
    }
}

@media (max-width: 575px) {
    .map-content-container {
        .map-content {
            flex-direction: row;
            flex-wrap: wrap;
            .content {
                width: 100%;
            }
            .img-content {
                border-radius: unset;
                width: unset;
                height: unset;
                img {
                    max-width: 100%;
                    transform: unset;
                }
            }
            ::-webkit-scrollbar-track,
            ::-webkit-scrollbar-thumb {
                border-radius: unset;
            }
        }
    }
}
</style>
<script>
// import axios from 'axios';
// import PopupComponentVue from "../dashboard/PopupComponent.vue";

import { Loader, LoaderOptions } from "google-maps";

export default {
    data() {
        return {
            ready: false,
            ingredients: [],
            detail: "",
            locations_marker: [],
            map: "",
        };
    },
    beforeMount() {
        this.mapInit();

        // console.log(this.$popup_data.get_popup_data);
        // alert('dasdas');

        // let param_data = new Object;
        // param_data.shop = Shopify.shop;
        // param_data.type = "other";

        // let vm = this;
        // vm.fetchIp(param_data).then(function(param_data) {
        //     vm.getCollectionOrPage(param_data).then(param_data => {
        //         vm.getDesign(param_data);
        //     });
        // });
    },
    methods: {
        onChange(el) {
            let ingredient_id = el.target.value;
            this.selectMarker(ingredient_id);
        },
        selectMarker(ingredient_id) {
            let vm = this;
            vm.detail = "";
            vm.locations_marker.forEach(function (val, key) {
                val.setMap(null);
            });
            // marker.setMap(null);
            if (ingredient_id != "") {
                fetch(this.$popup_data.ingredient_detail + "/" + ingredient_id)
                    .then((response) => response.json())
                    .then((res) => {
                        // console.log(res.data);
                        vm.detail = res.data;
                        vm.loadMarker();
                    });
            }
            // this.loadMarker();
        },
        loadMarker() {
            var infowindow = new google.maps.InfoWindow();
            var map = this.map;
            var marker;
            let vm = this;
            let locations = _.merge(vm.detail.country, vm.detail.state);
            console.log(locations);
            _.forEach(locations, function (value, key) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.lat, value.lng),
                    map: map,
                });

                google.maps.event.addListener(
                    marker,
                    "click",
                    (function (marker, key) {
                        return function () {
                            console.log(value.name);
                            infowindow.setContent(
                                "<p>County / State: " + value.name + "</p>"
                            );
                            infowindow.open(map, marker);
                        };
                    })(marker, key)
                );
                vm.locations_marker.push(marker);
            });
            map.setCenter(marker.getPosition());
        },
        initZoomControl() {
            var vm = this;
            document.querySelector(".zoom-control-in").onclick = function () {
                vm.map.setZoom(vm.map.getZoom() + 1);
            };

            document.querySelector(".zoom-control-out").onclick = function () {
                vm.map.setZoom(vm.map.getZoom() - 1);
            };

            vm.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
                document.querySelector(".zoom-control")
            );
        },
        mapLoad() {
            // const loader = new Loader('AIzaSyCJCpOT3mre1PxU2JVAkAlzRpzNls4rVaE');
            const loader = new Loader(this.$popup_data.google_map_api_key);
            var vm = this;

            loader.load().then(function (google) {
                vm.map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 37.0902, lng: -95.7129 },
                    zoom: 4,
                    disableDefaultUI: true,
                });

                vm.initZoomControl();

                if (vm.ingredients.length > 0) {
                    let ingredient = _.first(vm.ingredients);
                    console.log(ingredient.id);
                    vm.selectMarker(ingredient.id);
                }
                // for (i = 0; i < locations.length; i++) {
                // marker = new google.maps.Marker({
                //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                //     map: map
                // });

                // google.maps.event.addListener(marker, 'click', (function (marker, i) {
                //     return function () {
                //         infowindow.setContent('Location: '+locations[i][0]);
                //         infowindow.open(map, marker);
                //     }
                // })(marker, i));
                // }
            });
        },
        mapInit() {
            // var locations = [
            //     ['Bondi Beach', -33.890542, 151.274856, 4],
            //     ['Coogee Beach', -33.923036, 151.259052, 5],
            //     ['Cronulla Beach', -34.028249, 151.157507, 3],
            //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
            //     ['Maroubra Beach', -33.950198, 151.259302, 1],
            //     ['USA',37.0902, -95.7129]
            // ];
            // let param_data = new Object;
            // param_data.shop = Shopify.shop;
            var vm = this;
            fetch(this.$popup_data.ingredient_get)
                .then((response) => response.json())
                .then((res) => {
                    console.log("res", res);
                    if (res.data.length > 0) {
                        vm.ingredients = res.data;
                        vm.mapLoad();
                    } else {
                        alert("Empty");
                    }
                });
        },
    },
};
</script>
