const postcsspresetenv = require('postcss-preset-env')
const postcssnormalize = require('postcss-normalize')

module.exports = () => {
  return {
    plugins: [
      postcsspresetenv({}),
      postcssnormalize({}),
      require('autoprefixer')
    ]
  }
}
