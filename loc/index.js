import * as Polyglot from 'node-polyglot'
export let locale = 'en';
export default new Proxy({ t: function (s) {return this[locale]?.t(s) || s }}, { get: (o, k) => { import(`./langs/${k}.js`).then(v => o[k] = new Polyglot({ phrases: v })).catch(err => { }); return o[k] }})/*new Polyglot({ phrases: new Proxy({}, { get: (o, k) => { import(`./langs/${k}.js`).then(v => o[k] = v); return o[k] }})})*/