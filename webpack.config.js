// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',

//   entry: path.resolve(__dirname, 'src/main.tsx'),

//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.[contenthash].js',
//     clean: true,
//   },

//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//   },

//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'public/index.html',
//     }),
//   ],

//   devServer: {
//     port: 3000,
//     open: true,
//     hot: true,
//     historyApiFallback: true,
//   },
// };
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',

  entry: path.resolve(__dirname, 'src/main.tsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],

  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
