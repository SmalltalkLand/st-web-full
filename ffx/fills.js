import '../monofills.js'
let o = {};
self = new Proxy(self,{set: (_o,k,v) => {k in _o ? _o[k] = v : o[k] = v; return true},get: (oo,k) => (v => v instanceof Function ? v.bind(oo) : v)(o[k] || oo[k]),defineProperty: (oo,k,p) => Object.defineProperty(o,k,p)})