<template>
    <div class="desktop-mobile-container">
        <div class="p-1 bg-secondary bg-gradient text-white text-center">
            <button
                @click="changePreview('mobile')"
                type="button"
                class="btn btn-success preview-button"
            >
                <i class="fa fa-mobile"></i>
            </button>
            <button
                @click="changePreview('desktop')"
                type="button"
                class="btn btn-success preview-button"
            >
                <i class="fa fa-desktop"></i>
            </button>
        </div>
        <div
            class="p-3 bg-light bg-gradient text-white d-flex align-items-center justify-content-center"
        >
            <div desktop-mobile-preview :class="{ 'mobile': isMobile, 'desktop': isDesktop }">
                <popup-component :design="design"></popup-component>
            </div>
        </div>

        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.desktop-mobile-container {
    padding: 30px 0px 0px 0px;
    width: 100%;
    position: absolute;
    top: 0;
    .preview-button {
        width: 50px;
    }
}
[desktop-mobile-preview] {
    // background: #f1f2f3;
    border: 20px solid #ccc;
    border-radius: 20px;
}
[desktop-mobile-preview].desktop {
    width: 100%;
    height: 600px;
}
[desktop-mobile-preview].mobile {
    width: 460px;
    height: 700px;
}
</style>


<script>
// import Vue from 'vue';
import PopupComponent from './PopupComponent';

export default {
    props: {
        design: Object
    },
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    data: function () {
        return {
            isMobile: false,
            isDesktop: true,
        }
    },
    components: {
        'popup-component': PopupComponent
    },
    methods: {
        changePreview: function (preview) {
            this.isDesktop = preview == 'desktop';
            this.isMobile = preview == 'mobile';

        },
        handleScroll: function (e) {
            if(window.innerWidth >= 992) {
                if (window.scrollY > 340) {
                    $('.desktop-mobile-container').css('top', window.scrollY - 325);
                } else {
                    $('.desktop-mobile-container').css('top', 0);
                }
            } else {
                $('.desktop-mobile-container').css('top', 0);
            }
        }
    }
}
</script>