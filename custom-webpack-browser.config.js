const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        loader: 'svg-inline-loader',
      },
      {
        test: /molstar\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ]
  }
};
