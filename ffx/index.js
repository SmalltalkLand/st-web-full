import './fills.js'
import React, {useState,useMemo,useRef} from 'react'
import {pipe,identity} from 'ramda'
import interact from 'interactjs'
import useEventListener from '@use-it/event-listener'
//import 'https://aframe.io/releases/1.0.4/aframe.min.js'
import ReactDOM from 'react-dom'
import { useHaloKit } from '../halokit.dom/index.js';
import desktop from '../pages/desktop.js';
import Window from '../components.dom/Window.js'
import * as Morphs from '../morphs.js'
import * as MyMorphs from '../pages/Morph.js'
import Hook from '../components.generic/Hook.js'
import {useAllNodes, allChildren} from '../umo.js'
import Hook from '../components.generic/Hook.js'
import { useAsync } from "react-async"
import RemoteInput from '../components.dom/RemoteInput.js';
import template from '../template.js'
let draggable = opts => i => i.draggable(opts);
try{
    document;
    let __ex_root;
    let el_require;
    let ___ex_page = false;
    let wrappedJSObject;
    let __electron;
    let browser_;
    try{browser_ = browser}catch(err){try{browser_ = chrome}catch(err){}}
    let browser = browser_;
    let hostname = new Promise(c => browser.storage.sync.get(['hostname'],c)?.then(c));
    self.addEventListener('message',evt => {
        let d = evt.data;
        if(d.type === 'setHostname'){
            (s => s.sync || s)(browser.storage).set({hostname: d.data},() => {});
            hostname = Promise.resolve(d.data);
        }

    })
    try{wrappedJSObject = self.wrappedJSObject}catch(err){/*chrome*/}
    let h = (_) => hostname;
    if(___ex_page || wrappedJSObject?.StForceExPage){
let c = [].slice.call(document.querySelector('#app').childNodes);
__ex_root = document.querySelector('#app').attachShadow({mode: 'closed'});
c.forEach(o => __ex_root.appendChild(o))
    }
    if(__electron){
el_require = self.require || self.wrappedJSOject.require;
    }
let d = document.createElement('div');
let HTMLMorphic = window.wrappedJSObject?.lively?.morphic || window.wrappedJSObject
let HTMLMorphs = new Proxy(Morphs,{get: (o,k) => o[k](HTMLMorphic)})
let cid = (id,name,elem = document.body) => {let e = elem.getElementById(id) || document.createElement(name); e.id = id; elem.appendChild(e); return e}
let Pokemon = props => {
let poke = n => n.pokemon || /*n.src.match(//).length*/ false;
let nodes = useAllNodes().map(poke).filter(identity);

}
let World = props => {
    let [world,setWorld] = useState();
let Tag = HTMLMorphic === window.wrappedJSObject ? 'canvas' : 'div';
    return (<><Tag ref = {elem => {setWorld(new HTMLMorphic.WorldMorph(elem.wrappedJSObject))}}></Tag>{props.children(world)}</>)
}
let App = props => {
    let {isPending: hisp,data: hh} = useAsync({promiseFn: h});
let [enabled,setEnabled] = useState(false);
let [henabled,setHEnabled] = useState(false);
let [desktop,setDesktop] = useState();
let [denabled,setDEnabled] = useState(false);
let [rate,setRate] = useState(5);
let [nodes] = useAllNodes(document.body);
let scenes = nodes.filter(n => n.nodeName.toLowerCase() === 'a-scene');
let myElemsA = scenes.map(e => cid('af-st','a-box',e))
let ref = useRef();
let MyNodes = ref.current && (c => nodes.filter(n => c.includes(n)))(allChildren(ref.current));
let om = evt => {
    let d = evt.data;
    if(location.hostname !== hh)return;
    if(d.type === 'postToExParent')parent.postMessage(d.data);
    if(d.type === 'onParentMessage'){
        let f = pipe(template(d.data),v => parent.postMessage(v));
        parent.addEventListener('message',f);
    };
};
useHaloKit(useMemo(() => evt => (henabled || (MyNodes && MyNodes.includes(evt.target))) && evt.button === 1,[henabled,MyNodes]));
    return (<div ref = {ref}>
    {hisp && !hh ? null : (<div>
    <Hook hook = {useEventListener} hookArgs={['message',om]}>{() => null}</Hook>
    {(s => <RemoteInput src = {s} type = "number" value = {rate} onChange = {evt => {setRate(evt.target.value)}}></RemoteInput>)(hh.replace('/desktop','/rate'))}
    </div>)}
    {myElemsA.map(e => ReactDOM.createPortal(<a-box></a-box>,e))}
<span ref = {pipe(interact,draggable({}))} classList = {['ex-thing']}>
    <div onClick = {() => setEnabled(!enabled)}>Enable St</div>
    {enabled && (<div><button onClick = {() => setHEnabled(!henabled)}>Halos</button>
    {denabled && (ReactDOM.createPortal(<div><Window>{(Desktop => <Desktop ex = {true} el_require = {el_require}></Desktop>)(desktop)}</Window></div>,cid('st-desktop','div')))}
    <button onClick = {() => {Promise.resolve(desktop || import('../pages/desktop.js').then(m => setDesktop(m.default))).then(()  => {setDEnabled(true)})}}>Desktop</button></div>)}
</span>
    </div>)
}
ReactDOM.render(<App></App>,d);
document.body.appendChild(d);
if(wrappedJSObject)Object.defineProperty(wrappedJSObject,'requestStEvalEx',{get: async () => s => eval(s)})
}catch(err){
try{
    browser;
    
}catch(err2){
throw err

}

}