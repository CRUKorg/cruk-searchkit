// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
var path = require('path');

module.exports = {
  plugins: [
    // your custom plugins
  ],
  resolve: {
    extensions:[".js", ".jsx", ".webpack.js", ".web.js","", ".scss", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src/components/'),
          path.resolve(__dirname, '../stories/')
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
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, '../node_modules/')
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
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        loaders: ["css"]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loaders: ['file']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
  },
  externals: {
   'jsdom': 'window',
   'react/lib/ExecutionEnvironment': true,
   'react/lib/ReactContext': 'window',
   'react/addons': true,
  }
};
