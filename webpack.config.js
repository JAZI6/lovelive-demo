const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/js/main.js",　　　　//模块的入口文件
    output: {
        filename: "[name].js",      //打包后输出文件的文件名
        path: __dirname + '/dist',   //打包后的文件存放的地方;注："__dirname"是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
        publicPath: './dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',   //处理css中的图片引入，url-loader
                        options: {
                            limit: 10240,
                            name: 'img/[name]-[hash:6].[ext]'
                            /*文件路径相关的引用必须使用file-loader(参数为name,outputPath,publicPath)
                            但是use里不必要特别写出file-loader
                            */
                        }
                    }
                ]
                
            },
            {
                test: /\.html$/,    //处理html中的img引入图片
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            name: '../img/[name]-[hash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                },
                exclude: path.resolve(__dirname,'node_modules')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('./dist'),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template:'./src/component/index.html',　　//为新生成的index.html指定模版
            hash: true,
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/img',
                to: __dirname + '/dist/img'
            }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        }),
        //new BundleAnalyzerPlugin()
    ],
    // webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // test: /\.js$/,
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: 'vendor', //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    //项目里配置了自动提取node_modules里用到的模块如jquery，也可以在原模板里面通过第三方cdn引入，又是另一种配置了。
    devServer: {
        contentBase: './dist'
    },
    devtool: 'inline-source-map'
};