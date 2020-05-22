import React, {useState, useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {useAllNodes} from '../umo.js'
import Hook from '../components.generic/Hook.js'
let cid = (id,name,elem = document.body) => {let e = elem.getElementById(id) || document.createElement(name); e.id = id; elem.appendChild(e); return e}
let InputTools = props => {
    let nodes = props.nodes;
    let [elem,setElem] = useState();
    let [input,setInput] = useState();
    let [s,setS] = useState(false);
    let rr = useRef();
    return (<>
    {props.children([setElem,setInput,rr])}
    {rr.current && (<Hook hook = {useEffect} hookArgs = {[() => {
    let n = [].slice.call(document.querySelectorAll('iframe')).filter(i => i.contentWindow && i.contentWindow.alert && i.contentWindow.querySelector && i.contentWindow.querySelector('vk-t'));
    let op = n.map(v => v.parentNode);
    n.forEach(r => rr.current.appendChild(r));
    return () => {
n.map((v,i) => op[i].appendChild(v));

    }
    },[rr.current]]}>{() => null}</Hook>)}
    <button onClick = {setS.bind(null,true)}>Shadow Tests</button>
    {s && (<InputTools nodes = {props.nodes}>{e => (e2 => <div ref = {pipe(n => n.shadowRoot || n.attachShadow({mode: 'open'}),n => cid('stest','div',n),n => ReactDOM.render(e2,n))}></div>)(<div ref = {e[0]}><input ref = {pipe(i => {i.focus(); i.value = Math.random().toString(); i.blur();return i},e[1])} style = {{display: 'none'}} type = "text"></input></div>)}</InputTools>)}
    {elem && (<Hook hook = {useAllNodes} hookArgs = {[elem]}>{nodes => (rnodes => <>{rnodes.map(n => [].filter.call(n.childNodes,nn => nn && nn.getAttribute('jscontroller') === 'mvYTse')).map(n => <>{n.map(nn => <>
    <Hook hook = {useRef}>{r => ReactDOM.createPortal(<div style = {{display: 'none'}} ref = {r} jsaction = {nn && nn.getAttribute('jsaction')}></div>,cid('st-action-git-test','div',nn.parentNode))}</Hook>
    </>)}</>)}</>)(nodes[0].filter(n => n && n.getAttribute && n.getAttribute('jsmodel') === 'vWNDde' && n.querySelector('input') === input))}</Hook>)}
    </>);
    }
export default InputTools;