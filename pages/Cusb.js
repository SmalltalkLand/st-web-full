import React, { useState, useEffect } from 'react'
import { pipe } from 'ramda'
import {debounce} from 'lodash'
import DoubleIframe from '../components.dom/DoubleIframe.js'
import { useBetterMutationObserver } from '../umo.js'
/*import ex from 'raw-loader!../index.ex.js'*/
export default props => {
    let [url, setUrl] = useState(`http://${'localhost:3000'}`);
    let [curl, setCurl] = useState(url);
    let [win, setWin] = useState();
    let [exs, setExs] = useState([]);
    function exContext(ex) {
        return w => {
            let onMessages = [];
            w.__bOnMessages = onMessages;
            w.browser = {};
            w.browser.getContent = () => win;
            w.browser.runtime = {};
            w.browser.runtime.postMessage = (target, message) => target.__bOnMessages.forEach(h => h(message));
            w.browser.runtime.onMessage = f => onMessages = w.__bOnMessages = onMessages.concat([f]);

            if (typeof ex.code === 'function') {
                ex.code(w);
            } else if (typeof ex.code === 'string') {
                w.eval(ex.code)

            }
        }
    }
    useEffect(() => {
        if(!win)return;
        let oldFunc = win.Function;
        let sts = Math.random();
        let get;
        win.Function = new Proxy(oldFunc, {
            get: get = (o, k) => k === 'prototype' ? new Proxy(o[k], {}) : o[k],
            construct: (o, args) => (b => (f => Object.setPrototypeOf(b ? (...args) => f()(...args) : f,get(o,'prototype')))(new o(...args.map(a => typeof a === 'string' ? a.includes(sts.toString()) ? a : (s => { b = true; return s })(`return (function(args){return function(){/*${sts}*/${a}}})(arguments)`) : a))))()
        });
        return () => {
            win.Function = oldFunc;

        }
    }, [win]);
    try{useBetterMutationObserver(win.document, ml => {
        ml.forEach(m => {
            m.addedNodes.filter(n => n instanceof win.TextNode).forEach(n => {
                let content = n.textContent;
                let utterance = new props.SpeechSynthesisUtterance();
                utterance.text = content;
                utterance.lang = win.lang || 'en';
            })
        });
    })}catch(err){}
    return (<>
        <input type="text" value={curl} onChange={pipe(evt => evt.target.value, v => { setCurl(v); return v },debounce(setUrl,2000))}></input>
        <DoubleIframe src={'/proxy/' + url} secondRef={pipe(w => w?.contentWindow, setWin)}></DoubleIframe>
        {exs.concat([/*{id: 'internal',code: ex}*/],[...(props.extensions || [])]).map(ex => (<DoubleIframe key={ex.id} src={'about:blank'} secondRef={pipe(w => w.contentWindow,exContext(ex))}></DoubleIframe>))}
    </>)
}