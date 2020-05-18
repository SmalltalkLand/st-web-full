module.exports = require('./next.config.js')(null,{}).webpack({plugins: [],module: {rules: [{
    test: /.jsx?/,
    use: [{loader: 'babel-loader',options: {presets: ['next/babel']}}]
}]}},{webpack: require('webpack')})