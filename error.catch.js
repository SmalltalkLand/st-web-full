import er from './error_catcher.js'
let w = eval('f => __webpack_require__ = f(__webpack_require__)');
w(req => (...args) => {try{return req(...args)}catch(err){return er(req,err,...args)}})