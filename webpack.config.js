const path = require('path');
const SoundsPlugin = require('sounds-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {

    contentBase: './dist',

  },

  module: {
    rules: [
      {

        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },

      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
       
      {
        test: /\.(mp3|ogg|wav)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },

      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },

      {

        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,

        type: 'asset/resource',

      },
    ],
  },

  plugins: [

    new SoundsPlugin(),
    
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'index.html'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'assets', '**', '*'),
          to: path.resolve(__dirname, 'dist'),
        }],
    }),

    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};
