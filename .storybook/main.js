let next = require('../next.config.js')(null,{});
module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFial: c => next.webpack(c,{webpack: require('webpack')}),
};
