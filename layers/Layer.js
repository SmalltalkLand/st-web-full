import React from 'react'
let exportsSymbol = new Symbol()
export default class Layer {
    constructor(k) {
        let shim = new Symbol();
        self.System.register(shim, [], () => module => import(`../layerShims/${module}`));
        let s = new Symbol();
        self.System.register(s, [shim], (shimFunc) => { });
        let shimMap = new Proxy({}, { get: (o, k) => o[k] || (o[k] = new Symbol()) });
        self.System.register(shimMap['_getMap'], [], () => shimMap);
        this.shimMap = shimMap;
        Layer.LayerTable[k] = this;
    }
    handleWebpackImport(m,n) {
        try {
            let i = self.System.import(this.shimMap[m])({ next: n });
            try {
                if (i instanceof Function && i({}).$$typeof.toString().includes('react.')) {

                    return this.react(i);
                }
                } catch (err) { };
            return i

        } catch (err) {

            return n();
        }

    }
    react(i) {

        return props => <props.Border color={'yellow'}>{ i(props) }</props.Border>
    }
    static markExports(obj) {

        obj[exportsSymbol] = true;

        return obj
    }
}
Layer.LayerTable = {};
export let markExports = Layer.markExports.bind(Layer);