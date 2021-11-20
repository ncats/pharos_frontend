const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      }
    ]
  }
};
