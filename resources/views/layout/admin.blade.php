<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ \Osiset\ShopifyApp\Util::getShopifyConfig('app_name') }}</title>
    {{-- <link rel="stylesheet" href="{{ mix('/css/app.css') }}"> --}}
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    {{-- @include('shopify-app::partials.polaris_skeleton_css') --}}
</head>

<body class="hold-transition layout-top-nav">
    {{-- <div class="app-wrapper">
            <div class="app-content">
                <main id="app" role="main">
                    @include('elements.topbar')
                    @include('elements.sidebar')
                    <div class="content-wrapper" style="min-height: 300px;">
                        @yield('content')
                    </div>
                </main>
            </div>
        </div> --}}



    <div  id="app" class="content-wrapper">
        @include('elements.topbar')
        
            @yield('content')

    </div>


    {{-- <script src="{{ mix('/js/app.js') }}"></script> --}}
    <script src="{{ asset('js/app.js') }}"></script>
    @if (\Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_enabled'))
        <script
                src="https://unpkg.com/@shopify/app-bridge{{ \Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version')? '@' . config('shopify-app.appbridge_version'): '' }}">
        </script>
        <script
                src="https://unpkg.com/@shopify/app-bridge-utils{{ \Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version')? '@' . config('shopify-app.appbridge_version'): '' }}">
        </script>
        <script @if (\Osiset\ShopifyApp\Util::getShopifyConfig('turbo_enabled')) data-turbolinks-eval="false" @endif>
            var AppBridge = window['app-bridge'];
            var actions = AppBridge.actions;
            var utils = window['app-bridge-utils'];
            var createApp = AppBridge.default;
            var app = createApp({
                apiKey: "{{ \Osiset\ShopifyApp\Util::getShopifyConfig('api_key', $shopDomain ?? Auth::user()->name) }}",
                shopOrigin: "{{ $shopDomain ?? Auth::user()->name }}",
                host: "{{ \Request::get('host') }}",
                forceRedirect: true,
            });
            var actions = AppBridge.actions;
            var Redirect = actions.Redirect;
            $(document).ready(function() {
                const redirect = Redirect.create(app);
                $(document).on('click', 'a.list-group-item.list-group-item-action', function(e) {
                    redirect.dispatch(Redirect.Action.REMOTE, $(this).attr('href'));
                    e.preventDefault();
                })
            });
        </script>

        @include('shopify-app::partials.token_handler')
        @include('shopify-app::partials.flash_messages')
    @endif
    @yield('scripts')
</body>

</html>
