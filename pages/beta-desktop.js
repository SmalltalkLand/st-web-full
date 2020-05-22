import React, {useState, useEffect, useRef, useMemo} from 'react'
import Window from '../components.dom/Window.js'
import Hook from '../components.generic/Hook.js'
import {pipe,identity} from 'ramda'
import wpipe, {wrapper} from '../wpipe.js'
import { Stage, Layer, Rect, Text, Shape } from 'react-konva';
import Konva from 'konva';
import loc from '../loc/index.js'
import swal from 'sweetalert'
import useEventListener from '@use-it/event-listener'
import {useAllNodes} from '../umo.js'
function removeShadowWithCaveat(elementWithShadow) {
    if (!elementWithShadow.parentNode) return elementWithShadow.cloneNode(true);
    
    var ref = elementWithShadow.cloneNode(true);
    while (elementWithShadow.lastChild) ref.appendChild( elementWithShadow.lastChild );
    elementWithShadow.parentNode.replaceChild(elementWithShadow, ref);

    return ref;
  }
  let cid = (id,name,elem = document.body) => {let e = elem.getElementById(id) || document.createElement(name); e.id = id; elem.appendChild(e); return e};
export default wpipe(wrapper(props => {
let [uname,setUName] = useState(null);
let [lang,setLang] = useState(null);
let [appDescs,setAppDescs] = useState([]);
try{uname = localStorage.getItem('st-uname') || uname;}catch(err){};
try{lang = localStorage.getItem('st-lang') || lang;}catch(err){}
let [loaded,setLoaded] = useState(false);
let [confirmed,setConfirmed] = useState(0);
let [smenu,setSMenu] = useState(false);
let dref = useRef();
let [nodes] = useAllNodes(document.body);
let [mynodes] = useAllNodes(ref.curent || document.createElement('div'));
let ref = useRef();
let loading = lang === 'en' ? 'Loading...' : lang === 'ru' ? 'загрузка' : 'Loading...';
let gitr;
let cn = useMemo(() => mynodes.filter(n => n.getAttribute('jscontroller') === 'iDPoPb' && !n.parentNode.parentNode.parentNode.parentNode.parentNode.st_input_bypass),[mynodes]);
let canvases = nodes.filter(n => n.nodeName === 'canvas').map(n => n.shadowRoot || n);
let [ss,setSS] = useState([]);
useEffect(() => {
setSS(ss = canvases.map(c => c.attachShadow({mode: 'open'})));
return () => {
setSS(ss = []);
};
},[canvases]);
let sr = e => (<div ref = {i => i.st_input_bypass = true}>{['jsaction','jscontroller'].map(e2 => <Hook key = {e} hook = {useState} hookArgs = {[e.getAttribute(e2)]}>{a1 => (<>
{'for'} {e2}
<input type = "text" value = {a1[0]} onChange = {evt => a1[1](evt.target.value)}></input>
<button onClick = {() => e.setAttribute(e2,a1[0])}>Save</button>
</>)}</Hook>)}<slot></slot></div>);
useEffect(() => {
    let srs = cn.map(n => (n2 => n2.attachShadow({mode: 'open'}))(n.shadowRoot || n));
    srs.forEach(s => ReactDOM.render(sr(s),s));
    return () => {
        srs.map(s => s.host).map(removeShadowWithCaveat);
    }
},[cn]);
useEffect(() => {try{self}catch(err){return;};self['app-st-_startMenu_desktop'] = {launch: setSMenu.bind(null,true)}; return () => {delete self['app-st-_startMenu_desktop']}},[setSMenu]);
let baitForGIT = (<input type = "text" style = {{display: 'none'}} ref = {elem => (v => {elem.focus(); elem.value = Math.random().toString();elem.blur();if(elem.parentNode.getAttribute('jsaction'))return v();})(() => gitr && gitr(elem))}></input>);
useEffect(() => {if(!lang)return;let o = loc.locale; loc.locale = lang; return () => {loc.locale = o}},[lang]);
if(!uname)return (<span ref = {ref}><Hook hook = {useState} hookArgs = {['']}>{a => (<>Name: <input type = "text" value = {a[0]} onChange = {pipe(e => e.target.value,a[1])}></input><button onClick = {setUName.bind(null,a[0])}>Submit</button></>)}</Hook></span>);
if(!lang)return (a => (<div ref = {ref}><Hook hook = {useState} hookArgs={[0]}>{i => {/*console.log(i[0]);i[0] = Number(i[0].toString().replace(name.replace(/\d/,''),''));*/return (<><iframe src = {`https://${a[i[0]] || 'en'}.wikipedia.org`}></iframe><button onClick = {setLang.bind(null,a[i[0]]|| 'en')}>Understand</button><button onClick = {() => {i[1](i[0] + 1); /*console.log(i[0],i[1])*/ }}>Dont</button></>)}}</Hook></div>))(['en','ru']);
if(self['Rust'] && !self['Rust'].getSetUp())return (<Hook hook = {useEffect} hookArgs = {[() => {self['Rust'].setUp(swal);}]}>{() => null}</Hook>);
if(!loaded)return (<span ref = {ref}><Hook hook = {useEffect} hookArgs = {[() => {setTimeout(setLoaded.bind(null,true),1500)}]}>{() => <div>{loading}<Hook hook = {useEventListener} hookArgs = {['keyup',evt => evt.key === 'c' && (() => {localStorage.removeItem('st-lang'); localStorage.removeItem('st-uname'); alert('Reload to continue'); location.reload()})()]}>{() => null}</Hook></div>}</Hook></span>);
if(!confirmed)return (<div ref = {ref}><button onClick = {pipe(setConfirmed.bind(null,2),() => {localStorage.setItem('st-lang',lang); localStorage.setItem('st-uname',uname);})}>Confirm</button><button onClick = {setConfirmed.bind(null,1)}>Dont</button></div>);
confirmed = confirmed === 1 ? false: true;
setConfirmed = pipe(v => v ? 2 : 1,setConfirmed);
let renderWindow = ({title,Rf}) => <Window title = {title}><Rf></Rf></Window>;
let canvas = (<Stage width = {dref.current && dref.current.width} height = {dref.current && dref.current.height}>
<Layer>
<Text text = {`Logged in as ${uname}`}></Text>
<Shape sceneFunc={(ctxt,s) => {self['Rust']?.drawWorldOn(ctxt)}}>

</Shape>
</Layer>
</Stage>);
if(smenu)return (<div ref = {ref}>{appDescs.map(d => <div key = {d.id} onClick = {() => {self['app-st-' + d.id].launch({React, useState, useEffect, useRef, useMemo}); setSMenu(false)}}>{d.name}</div>)}</div>);
return (<div ref = {ref}>{ss.map(s => (h => ReactDOM.createPortal(<div><slot></slot></div>,cid('st','div',s)))((oh => oh.host || oh)(s.host)))}{baitForGIT}{loc.t('Hello, #a#').replace('#a#',uname)}<button onClick = {setSMenu.bind(null,true)}>#</button></div>)
}),f => v => <div>{f(v)}</div>,f => v => v.modules ? wpipe(...[...v.modules.map(m => m.first),wrapper(f),...v.modules.map(m => m.second)])(v) : f(v),f => v => (s => f({...v,...s[0],setStateProp: s[1]}))(useState(() => ({}))))