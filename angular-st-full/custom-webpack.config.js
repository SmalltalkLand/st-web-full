const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const oldc = require('../webpack.config.js')
let mf = oldc.plugins.filter(p => p instanceof ModuleFederationPlugin)[0];
let mo = mf.options;
module.exports = {
plugins: [new ModuleFederationPlugin({
    name: 'angular-driver',
    remotes: {
        st: 'base'
    },
    shared: mo.shared,
})]

}