const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',

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
};