<template>
    <div
        v-if="show_hide"
        class="popup-container"
        :style="{ 'background-color': design.popup_box_background_color_opacity }"
    >
        <div
            :class="popup_body_class"
            :style="{ 'background-color': design.popup_box_color_opacity, width: design.popup_width + '%' }"
        >
            <!-- <popup-image-container></popup-image-container> -->
            <div class="popup-image_container">
                <img :src="design.background_image" alt />
            </div>
            <div class="popup-content">
                <h3
                    :style="{
                        'color': design.heading.color,
                        'font-size': 'calc(' + design.heading.font_size.number + design.heading.font_size.params + '* '+screen_percent+' / 100)',
                    }"
                >{{ design.heading.text }}</h3>
                <div :style="{'font-size': screen_percent+'%'}" v-html="design.message"></div>
                <button
                    v-if="design.button.status"
                    type="button"
                    :style="{
                        'cursor': 'pointer',
                        color: design.button.color,
                        'background-color': design.button.background_color,
                        'border': '1px solid ' + design.button.border_color,
                        'font-size': 'calc(' + design.button.font_size.number + design.button.font_size.params + '* '+screen_percent+' / 100)',
                        'padding': design.button.padding.number.top + design.button.padding.params + ' ' + design.button.padding.number.right + design.button.padding.params + ' ' + design.button.padding.number.bottom + design.button.padding.params + ' ' + design.button.padding.number.left + design.button.padding.params,
                        //'margin': design.button.spacing.number.top + design.button.spacing.params + ' ' + design.button.spacing.number.right + design.button.spacing.params + ' ' + design.button.spacing.number.bottom + design.button.spacing.params + ' ' + design.button.spacing.number.left + design.button.spacing.params
                    }"
                    @click="buttonAction"
                >{{ design.button.text }}</button>
            </div>
            <span class="close" @click="showHide">
                <svg
                    style="background-color:white; border-radius:50%"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                    <path
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                    />
                </svg>
            </span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.popup-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
    // overflow-y: scroll;
    .popup-body {
        width: 80%;
        background: #000;
        margin: 25px;
        border-radius: 3px;
        text-align: center;
        // box-shadow: 0px 7px 9px 1px rgb(0 0 255 / 20%);
        height: fit-content;
        align-self: center;
        display: flex;
        position: relative;
        max-height: 500px;
        overflow: auto;
        .popup-image_container,
        .popup-content {
            width: 50%;
        }
        .popup-image_container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
        .popup-content {
            padding: 15px;
            align-self: center;
        }
        .close {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 25px;
            // background: #fff;
            border-radius: 15px;
            cursor: pointer;
            // background: #fff;
        }
    }
    /* template_1 */
    // .popup-body.template_1 {
    // }
    /* template_2 */
    .popup-body.template_2 {
        .popup-image_container {
            order: 2;
        }
        .popup-content {
            order: 1;
        }
    }
    /* template_3 */
    .popup-body.template_3 {
        flex-flow: column;
        max-height: 100%;
        .popup-image_container,
        .popup-content {
            width: 100%;
        }
    }
}

@mixin responsive-design {
    .popup-container {
        .popup-body {
            width: 100% !important;
            max-height: 100%;
            .popup-image_container,
            .popup-content {
                width: 100%;
            }
        }

        .popup-body.template_1 {
            flex-flow: column;
        }
        .popup-body.template_2 {
            flex-flow: column;
            .popup-image_container {
                order: 1;
            }
            .popup-content {
                order: 2;
            }
        }
        .popup-body.template_3 {
            flex-flow: column;
        }
    }
}

[desktop-mobile-preview].mobile {
    @include responsive-design;
}

@media only screen and (max-width: 767px) {
    @include responsive-design;
}
</style>
<script>
import VueCookies from 'vue-cookies'
export default {
    props: {
        design: Object,
        general: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    mounted() {

        // console.log('ddddddddddddd',typeof this.general);
        // console.log(this.general);

        if (this.general.hasOwnProperty('session_duration')) {
            if (this.$cookies.isKey("multiple_popup_show_hide")) {
                this.show_hide = false;
            }
            this.screen_percent = '100';
        }
    },
    data() {
        return {
            show_hide: true,
            screen_percent: '57.16'
        }
    },
    // components: {
    //     VueCookies
    // },
    computed: {
        popup_body_class: function () {
            let temp_class = {
                'popup-body': true
            }
            // console.log(this.design);
            temp_class[this.design.template] = true;
            return temp_class;
        }
    },
    methods: {
        showHide() {
            this.show_hide = false;
            if (this.general.hasOwnProperty('session_duration')) {
                // this.$cookies.set("multiple_popup_show_hide",this.show_hide,10+'d');
                this.$cookies.set("multiple_popup_show_hide", this.show_hide, this.general.session_duration + 'd');
            }
        },
        buttonAction() {

            switch (this.design.button.action.type) {
                case "close":
                    this.showHide();
                    break;
                case "open_custome_link":
                    window.location.href = this.design.button.action.link;
                    break;
                case "open_custome_link_new_tab":
                    window.open(this.design.button.action.link);
                    break;
            }
        }
    }
}
</script>