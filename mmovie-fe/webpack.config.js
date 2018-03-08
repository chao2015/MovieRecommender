/*
* @Author: chao2015
* @Date:   2018-03-08 09:27:58
* @Last Modified by:   chao2015
* @Last Modified time: 2018-03-08 14:39:07
*/

var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online, 区分环境：开发/线上
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name){
    return{
        template  : './src/view/'+ name + '.html',
        filename  : 'view/'+ name + '.html',
        inject    : true,
        hash      : true,
        chunks    : ['common', name]
    };
};
var config = {
    entry: {
        'common': ['./src/page/common/index.js', 'webpack-dev-server/client?http://localhost:8080/'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    output: {
        //生成文件的目录
        path: './dist',
        //指定访问文件的路径
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jquery'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
}; 

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8089/');
}


module.exports = config;