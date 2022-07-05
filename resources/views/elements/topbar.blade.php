<nav class="main-header navbar navbar-expand-md navbar-light navbar-white m-0 p-0">
    <div class="container-fluid">
        {{-- <a href="../../index3.html" class="navbar-brand"> --}}
        {{-- <router-link
            :class="{'app-name': true}"
            :to="{ name: 'dashboard' }"
        >
            <span class="brand-text font-weight-light">{{ config('app.name') }}</span>
        </router-link> --}}
        {{-- </a> --}}

        <button class="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse order-3" id="navbarCollapse">
            <!-- Left navbar links -->
            <top-bar-component></top-bar-component>

        </div>
</div>
</nav >