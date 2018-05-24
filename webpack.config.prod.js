import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.IS_BROWSER': true,
  __DEV__: false
};

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  entry: ["babel-polyfill", path.resolve(__dirname, 'app/index')],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/app/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      favicon: 'app/img/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new CopyWebpackPlugin([
          {
              from: path.resolve(__dirname, 'app/img/'),
              to: path.resolve(__dirname, 'dist/img/'),
              toType: 'dir'
          }
      ], {
          ignore: [
              '*.psd'
          ],
          copyUnmodified: true
    }),
    new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
          noInfo: true, // set to false to see a list of every file being bundled.
          options: {
            sassLoader: {
              includePaths: [path.resolve(__dirname, 'src', 'scss')]
            },
            context: '/',
            postcss: () => [autoprefixer],
          }
        })
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?name=[name].[ext]'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'},
      {test: /\.(jpeg|jpg|png|gif|ico)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')}
    ]
  }
};
