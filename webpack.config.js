const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'server/dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[hash].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/[name].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: 'index.html'
      }),
      new Dotenv({
        path: `./.env${env.file ? `.${env.file}` : ''}`
      })
    ],
    devServer: {
      port: 3001,
      historyApiFallback: true,
      compress: true
    }
  }
}
