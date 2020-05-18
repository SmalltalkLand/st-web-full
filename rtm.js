import {pipe,apply,unapply} from 'ramda'
let w = eval('f => __webpack_require__ = f(__webpack_require__)');
let fvar = f => (...args) => {let v; return f(v,a => v = a,...args)};
w(f => fvar(unapply(pipe(apply((modc,setModc,mod,...args) => Object.assign([setModc(mod),...args],{modc,setModc})),(args) => [f(...args),args],([res,args]) => args.mod.indexOf(':') === -1 ? [res] : [(l => f(l)(f,res))(args.modc.split(':'))],([res]) => res))))