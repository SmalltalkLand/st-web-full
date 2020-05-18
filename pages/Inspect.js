import React, { useState } from 'react'
import useLoc from '../loc/use.js'
import Debugger from '../components.dom/Debugger.js'
import Tabs from '../components.dom/Tabs.js'
let EventMap = new Map();
export default props => {
    let [text, setText] = useState();
    let [selk, setSelk] = useState();
    let keyValues = obj => { return Object.keys(obj).map(k => [k,obj[k]]).concat(obj.hfunc ? props.Haskell.send(obj.hfunc,"messages") : []).concat(EventMap.get(obj) || []); };
    let loc = useLoc();
    useEffect(() => {
        let evts = [];
        let evt = (...args) => { if (!props.obj.on) return;props.obj.on(...args); evts.push(args); };
        evt('message', m => { EventMap.set(props.obj, (EventMap.get(obj) || []).concat([['message', m]])); });;
        return () => {
            evts.forEach(args => props.obj.off(...args))

        }
    }, [props.obj])
    return (<div>
    <Tabs>
    <div title = {'Basic'}>
        <div>{keyValues(props.obj).map(([k,v]) => (<div onDoubleClick={() => props.setObj(v)} onClick={() => setSelk(k)}>{k.toString()}</div>))}</div>
        <textarea value={selk && props.obj[selk].toString()}></textarea><textarea value={text} onChange={evt => setText(evt.target.value)}></textarea>
        <button onClick={() => { (function () { eval(text) }).call(props.obj); }}>{loc('Do It!')}</button>
        </div>
        {props.obj instanceof Error && (<Debugger self = {props.self} error = {props.obj} title = {'Debug'}></Debugger>)}
        </Tabs>
    </div>)
}