import * as Polyglot from 'node-polyglot'
export default new Proxy({ locale: 'en',t: function (s) {
    let sn = this[this.locale]?.t(s);
    if(this.locale === 'en')return s;
    if(!sn)console.log('No Locale');
    return sn || s;
}}, { get: (o, k) => { if(o[k])return o[k]; import(`./langs/${k}.js`).then(v => o[k] = /*new Polyglot({ phrases: v })*/ {t: l => v[l]}).catch(err => { }); return o[k] }})/*new Polyglot({ phrases: new Proxy({}, { get: (o, k) => { import(`./langs/${k}.js`).then(v => o[k] = v); return o[k] }})})*/