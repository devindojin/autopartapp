<template>
    <nav class="mt-2">
        <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
        >
            <!-- Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library-->
            <li class="nav-item">
                <router-link exact-active-class="active" :class="{ 'active': $route.name === 'dashboard' }" :to="{ name: 'dashboard'}" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>Dashboard</p>
                </router-link>
            </li>
            <!-- <li class="nav-item">
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
            </li> -->
        </ul>
    </nav>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route)
    }
}
</script>
