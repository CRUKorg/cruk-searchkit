var webpackConfig = require('./webpack.test.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  var karmaConfiguration = {
    browsers: ['Chrome_without_security', 'PhantomJS'],
    // you can define custom flags
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },
    files: [
      'https://maps.googleapis.com/maps/api/js?libraries=places&amp;key=AIzaSyA46fPfmcYux_82Keez7rrpksTTDLvjEAs',
      'webpack.tests.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'webpack.tests.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    singleRun: true,
    // webpack config object
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    }
  };

  config.set(karmaConfiguration);
};
