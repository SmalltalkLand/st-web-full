let MultiProxy;
export default MultiProxy = (objects,setter) => new Proxy(objects, {
    get: (o, k) => o.reduce((p, c) => p || c[k], null),
    ownKeys: (o) => o.map(Object.keys.bind(Object)).reduce((a, b) => a.concat(b), []),
    getOwnPropertyDescriptor: (o, k) => o.reduce((p, c) => p || (Object.getOwnPropertyDescriptor(c, k)), null),
    getPrototypeOf: (o) => MultiProxy(objects.map(Object.getPrototypeOf.bind(Object)), Object.getPrototypeOf(setter)),

    set: (o, k, v) => setter[k] = v,
    deleteProperty: (o, k) => { delete setter[k] },
    defineProperty: (o,p,attrs) => Object.defineProperty(setter,p,attrs)
})