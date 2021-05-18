const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const CURRENT_WORKING_DIR = process.cwd()

module.exports = {
  entry: [path.join(CURRENT_WORKING_DIR, 'client/app/index.js')],
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      app: 'client/app'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'client/public/assets',
          to:'assets'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /(node_modules)/
      }
    ]
  }
}
