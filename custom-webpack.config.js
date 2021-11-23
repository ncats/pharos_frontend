const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ]
  }
};
