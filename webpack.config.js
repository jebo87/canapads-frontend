const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const resolve = require('path').resolve;

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.[hash].css');


    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.[hash].js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    include: [resolve('.')],
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }, {
                    test: /\.(png|jpg|gif)$/,
                    use: [{

                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }]
                }
            ]
        },
        resolve: {
            alias: {
              // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
              'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
            }
          },
        // devtool: 'source-map',
        plugins: [
            CSSExtract,
            new HtmlWebpackPlugin({
                filename: path.join(__dirname, 'public', 'index.html'),
                title: 'My app',
                template: path.join(__dirname, 'src', 'index.html')
            }),
            new CleanWebpackPlugin(['public']),
            new webpack.DefinePlugin({
                '_API_': (isProduction ? (JSON.stringify('https://api.makakolabs.ca')) : (JSON.stringify('http://localhost:8087')))
            }),
            new webpack.EnvironmentPlugin(['MapboxAccessToken'])


        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            historyApiFallback: true,
            contentBase: path.join(__dirname, 'public'),

        }
    }
}