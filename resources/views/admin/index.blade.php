@extends('layout.admin')

@section('content')
    <!-- You are: (shop domain name) -->
    {{-- <p>You are: {{ $shopDomain ?? Auth::user()->name }}</p> --}}

    {{-- <section class="content">
        <layout-component></layout-component>
    </section> --}}
    <layout-component></layout-component>

    {{-- <example-component></example-component>
    <example-component-2></example-component-2> --}}
    {{-- <fblogintemplate></fblogintemplate> --}}
@endsection

@section('scripts')
    @parent
    <script>
        // Vue.component('example-component-2', window.example_component_2);
        let popup_data = new Object;
        // $route_all = Illuminate\Support\Facades\Route::getRoutes()->get();
        popup_data['google_map_api_key'] = '{{ env('MIX_GOOGLE_MAP_API_KEY') }}';
        popup_data['route_name'] = {
            'variant_get': '{{ route('variant_get') }}',
            'variant_update': '{{ route('variant_update') }}',
            'variant_get_by_product_id': '{{ route('variant_get_by_product_id') }}',
        };
        @php
            if (config('shopify-app.appbridge_enabled')) {
                $user = Auth::user();
            } else {
                $user = \App\Models\User::first();
            }
        @endphp

        popup_data['shop'] = '{{ $user->name }}';

        popup_data['upgrade'] = {
            'message': 'Please upgrade plan'
        }


        popup_data['shop_id'] = '{{ $user->id }}';
        popup_data['appbridge_enabled'] == '{{ config('shopify-app.appbridge_enabled') }}';


        popup_data.message = function(message, success = true) {
            @if (config('shopify-app.appbridge_enabled'))
                let obj = {
                    message: message,
                    duration: 3000,
                }
                if (!success) {
                    obj.isError = true;
                }
                var toastNotice = actions.Toast.create(app, obj);
                toastNotice.dispatch(actions.Toast.Action.SHOW);
            @else
                alert(message);
            @endif
        }
        popup_data['route'] = function(name) {
            return this.route_name[name];
        }
        popup_data['asset'] = function(name) {
            return '{{ asset('') }}' + name;
        }
        popup_data['csrf_token'] = "{{ csrf_token() }}";
        Vue.prototype.$popup_data = popup_data;
        // Vue.component('fblogintemplate',  {
        //     name: 'fblogintemplate',
        //     template: '#fblogintemplate'
        // });
        const app_vue = new Vue({
            el: '#app',
            router: window.router,
            mounted() {
                // console.log(localStorage.mp_current_route);
                if (localStorage.mp_current_route) {
                    this.$router.push(localStorage.mp_current_route);
                }
            },
            watch: {
                $route(to, from) {
                    localStorage.mp_current_route = to.path;
                }
            }
        });
    </script>
    <script>
        //actions.TitleBar.create(app, { title: 'Welcome' });
    </script>
@endsection
