<template>
    <!-- <nav class="mt-2">
        <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
        >

            <li class="nav-item">
                <router-link exact-active-class="active" :class="{ 'active': $route.name === 'dashboard' }" :to="{ name: 'dashboard'}" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>Dashboard</p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link exact-active-class="active" :to="{ name: 'faq'}" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>FAQ</p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link exact-active-class="active" :to="{ name: 'help'}" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>Help</p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link exact-active-class="active" :to="{ name: 'plan'}" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>Plan</p>
                </router-link>
            </li>
        </ul>
    </nav>-->

    <ul class="navbar-nav">
        <!-- <li class="nav-item">
            <router-link
                :class="{ 'active': $route.name === 'dashboard' }"
                :to="{ name: 'dashboard' }"
                class="nav-link"
            >
                Dashboard
            </router-link>
        </li> -->

        <li class="nav-item">
            <router-link
                :class="{ active: $route.name === 'product' }"
                :to="{ name: 'product' }"
                class="nav-link"
            >
                Product
            </router-link>
        </li>

        <!-- <li class="nav-item">
            <router-link
                :class="{ 'active': $route.name === 'country' }"
                :to="{ name: 'country' }"
                class="nav-link"
            >
                Country
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :class="{ 'active': $route.name === 'category' }"
                :to="{ name: 'category' }"
                class="nav-link"
            >
                Category
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :class="{ 'active': $route.name === 'ingredient' }"
                :to="{ name: 'ingredient' }"
                class="nav-link"
            >
                Ingredient
            </router-link>
        </li> -->
        <!-- <li class="nav-item">
            <router-link exact-active-class="active" :to="{ name: 'faq' }" class="nav-link">
                FAQ
            </router-link>
        </li>
        <li class="nav-item">
            <router-link exact-active-class="active" :to="{ name: 'help' }" class="nav-link">
                Help
            </router-link>
        </li>
        <li class="nav-item">
            <router-link exact-active-class="active" :to="{ name: 'plan' }" class="nav-link">
                Plan
            </router-link>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped>
@import "../../sass/variables";
li.nav-item {
    .nav-link {
        border-bottom: 2px solid white;
    }
    .nav-link.active,
    .nav-link:hover {
        background-color: #edeeef;
        border-bottom: 2px solid $p-action-primary;
    }
}
</style>

<script>
export default {
    mounted() {
        console.log(this.$route);
    },
};
</script>
