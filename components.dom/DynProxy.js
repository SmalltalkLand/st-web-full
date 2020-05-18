export default of => new Proxy({}, {
    get: (o, k) => of()[k],
    set: (o, k, v) => { of()[k] = v },
    apply: (_, t, args) => Function.prototype.apply.call(of(), t, args),
    construct: (_, args, t) => Reflect.construct(of(), args, t),
    ownKeys: (_) => Object.getOwnPropertyNames(ok()),

})