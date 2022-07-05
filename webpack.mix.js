const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix
//     .webpackConfig({
//     output: {
//         filename: "[name].js",
//         chunkFilename: "public/js/[name].app.js",
//         publicPath: "/public",
//     },
// })

mix.webpackConfig({
    output: {
        publicPath: "/public/",
    },
});
mix.js("resources/js/app.js", "public/js")
    .js("resources/js/autopart.js", "public/js")
    .vue()
    .sass("resources/sass/app.scss", "public/css");

// mix.browserSync('319f-122-160-25-238.ngrok.io');
// mix.browserSync({proxy: 'google_map.wais.com'});
// mix.browserSync({
//     proxy: "127.0.0.1:8000",
//     https: false,
//     port: "8000",
// });
