const path = require('path');

const vueSrc = './src';

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, vueSrc),
      },
      extensions: ['.js', '.vue', '.json'],
    },
  },
  lintOnSave: false,
};
