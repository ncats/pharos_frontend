const webpack = require('webpack');

module.exports = {
  externals: [
    /* Firebase has some troubles being webpacked when in
       in the Node environment */
    /^firebase/
  ],
  module: {
    rules: [
      {
        test: /\.svg$/i,
        loader: 'svg-inline-loader',
      }
    ]
  }
};
