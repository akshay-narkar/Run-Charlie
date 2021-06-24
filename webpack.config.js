const path = require('path');

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
        // test: /\.s[ac]ss$/i,
        // use: [
        //   // Creates `style` nodes from JS strings
        //   'style-loader',
        //   // Translates CSS into CommonJS
        //   'css-loader',
        //   // Compiles Sass to CSS
        //   'sass-loader',
        // ],
      },

      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },

      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['env']
            // @babel/preset-env
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

    //  new webpack.optimize.SplitChunksPlugin({
    //   name: 'production-dependencies',
    //   filename: 'production-dependencies.bundle.js'
    // }),

    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};
