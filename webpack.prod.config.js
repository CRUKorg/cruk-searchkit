var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context:path.join(__dirname),
  entry: {
    'index': ['babel-polyfill', './index.js'],
  },
  output: {
    path: path.join(__dirname, 'library'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      warnings: false,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
    extensions:[".js", ".jsx", ".webpack.js", ".web.js", ""]
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src'),
        ],
        loader: 'babel',
        query: {
          plugins: [
            "transform-class-properties",
            "transform-es2015-object-super",
            "transform-proto-to-assign",
            "transform-es2015-block-scoping",
            ["transform-es2015-classes", { "loose": true }]
          ],
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react')
          ]
        }
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './index.js')
        ],
        loader: 'babel',
        query: {
          plugins: [
            "transform-class-properties",
            "transform-es2015-object-super",
            "transform-proto-to-assign",
            "transform-es2015-block-scoping",
            ["transform-es2015-classes", { "loose": true }]
          ],
          presets: [
            require.resolve('babel-preset-es2015')
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loaders: ['file']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
