const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  // root file
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    //absolute path
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,
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
  //tell WebPack that before it writes something to the output dist folder, it will clear everything that is in there.
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
