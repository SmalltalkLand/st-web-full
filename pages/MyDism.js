import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import audio from '../audio.js'
let gf;
let MorphState = props => {

    return (props.children)
}
export default props => {
let [delve,setDelve] = useState();
ussEffect(() => {
let a = props.elem?.audio;
if(!a)return;
let delayNull = audio.createDelay(0);
a.connect(delayNull);

return () => {a.disconnect(delayNull)}
},[props.elem?.audio]);
    return (e => delve ? ReactDOM.createPortal(e,delve) : e)(<div onEventHalo = {evt => {}} onEventGrab = {evt => {if(gf)return gf(evt);gf = n => {setDelve(n.target); gf = null}; }}>{delve && (<button onClick = {() => setDelve(null)}>{'undelve'}</button>)}{(c => props.elem?.morphState ? <MorphState morphState = {props.elem?.morphState}>{c()}</MorphState>: c())(() => props.children(() => e => {}))}</div>)
}