import $ from 'cash-dom'
import React, {useState,useEffect } from 'react'
import $plugin from '../plugins/$plugin.js'
import with_ from '../with.js'
export default props => {
    let [sym, setSym] = useState(() => Symbol());
    let [dsym, setDSYM] = useState(() => Symbol());
    let my$fn = $.fn[sym] || ($.fn[sym] = new Proxy($.fn, { get: (o, k) => (o[dsym] || (o[dsym] = {}))[k] || o[k], set: (o, k, v) => (o[dsym] || (o[dsym] = {}))[k] = v }));
    let my$ = Object.assign((...args) => Object.setPrototypeOf($(...args),my$fn), { fn: my$fn });
    useEffect(() => () => { delete $.fn[sym]; delete $.fn[dsym] });
    let f = with_(new Proxy({ $: my$ }, { has: (o, k) => true }), props.code);
    let [$sym, set$sym] = useState();
    useEffect(() => { let p; React.createElement.handlers = (React.createElement.handlers || []).concat([(p = $plugin(my$))[0]]); set$sym(p[1]); return () => { React.createElement.handlers = (React.createElement.handlers || []).filter(_p => _p !== p) } })
    return f();
}