var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        'swiper': path.join(__dirname, 'swiper.vue')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        libraryTarget:'umd',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/]},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.less$/, loader: "css?sourceMap!postcss!less?sourceMap"}
        ]
    },
    postcss: [autoprefixer({browsers: ['last 2 versions', 'Android 2.3']})],
    babel: {
        "presets": ["es2015"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
        })
    ]
};

if (process.env.NODE_ENV === 'dev') {
    module.exports.devtool = '#eval-source-map';
} else {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
}
