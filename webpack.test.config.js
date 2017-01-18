var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill'
  ],
  resolve: {
    extensions:[".js", ".jsx", ".webpack.js", ".web.js","", ".scss", ".json"]
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src/components/')
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
          presets: ["airbnb", "react", "es2015"]
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
    ]
  },
  externals: {
   'jsdom': 'window',
   'google': 'window.google',
   'react/lib/ExecutionEnvironment': true,
   'react/lib/ReactContext': 'window',
   'react/addons': true,
  }
};
