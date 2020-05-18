import createSelf from './createSelf.js'
import add from './wwp.js'
let a;
(a = add('st-ex'))[1](new Proxy(createSelf('default'), {get: (o,k) => o[k] || self[k]}))