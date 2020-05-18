import React, {useState,useEffect,useMemo} from 'react'
import {pipe} from 'ramda'
export default props => {
    let [fs,setFS] = useState();
    setFS = pipe(v => fs = v,setFS);
    let [obj,setObj] = useState();
    let [cf,setCF] = useState();
    let oef = (nf) => {
        setFS(fs.concat([nf]));
        nf.onPop = () => {setFS(fs.filter(f => f !== nf))};
        }
let debugger_ = useMemo(() => new Debugger(props.self),[props.self]);
let dh = useMemo(() => (frame) => {
debugger_.onEnterFrame = oef

},[])
if(props.error)debugger_.getNewestFrame().evalWithBindings('if(props)throw props().error',{props: debugger_.getNewestFrame().this?.makeDebuggeeValue(() => props)})
    return (<div>{fs.map(f => <div key = {f.toString()} onClick = {() => setCF(f)}>{f.arguments.map(arg => (<span key = {arg.toString()} onClick = {() => setObj(arg)}>{arg.unsafeDereference().toString()}</span>))}</div>)}{cf && (<div></div>)}</div>)
}