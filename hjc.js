let isInC = false;
let sd = 'try{st_debugger__.do()}catch(err){}';
let colons = {}
let h = {
    apply: (f => f.call.bind(f))((s,o,t,args) => Reflect.construct(s,args,t)),
construct: (o,args,t) => {
    let oc = isInC;
    isInC = true;
    let v = Reflect.construct(o,oc ? args : args.map(v => (typeof v === 'string' && !oc) ? (s => Object.keys(colons).reduce((acc,c) => acc.replace(new RegExp(`:${c} (.*)`),(match,g1) => colons[c](g1)),s))(v.replace('debugger',sd)).replace(/await2 ([\S]*) in ([\S]*) (.*)/,(m,g1,n,g2) => `${g1}.then(${n} => {${g2}})`) : v),t)
    isInC = oc;
    return v
}
};
Function.prototype.toString = new Proxy(Function.prototype.toString,{
apply: (o,t,args) => Function.prototype.apply.call(o,t,args).replace(sd,'debugger')

})
Function.prototype.constructor = new Proxy(Function.prototype.constructor,h)