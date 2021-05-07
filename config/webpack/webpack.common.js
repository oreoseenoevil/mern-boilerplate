const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const CURRENT_WORKING_DIR = process.cwd()

module.exports = {
  entry: [
    '@babel/polyfill',
  ]
}
