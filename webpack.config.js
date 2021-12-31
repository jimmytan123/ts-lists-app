//https://webpack.js.org/guides/typescript/

const path = require('path');

module.exports = {
  mode: 'development',
  // root file
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    //absolute path
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        //a regular expression, tell Typescript to check files end with .ts
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
  },
};
