import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'eval-source-map',
  entry: [
    './app/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'app/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js?'+ (new Date().getTime())
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.IS_BROWSER': true,
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'styles', 'scss')]
        },
        context: '/',
        postcss: () => [autoprefixer],
      }
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './app/sw.js',
    })
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpeg|jpg|png|gif|ico)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /(\.css|\.scss)$/, loaders: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')}
    ]
  }
};
