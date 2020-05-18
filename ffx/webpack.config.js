const {resolve} = require('path');
let webpack = require('webpack')
module.exports = (c => Object.assign({},c,{plugins: [new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  })].concat(c.plugins)}))(Object.assign(require('../webpack.config.js'),{entry: "./index.js", output: {
    path: __dirname,
    filename: "index.res.js"
  },}))