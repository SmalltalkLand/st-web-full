import React, {useEffect, useRef, useState, useMemo} from 'react'
import {pipe, concat} from 'ramda'
import {useAllNodes} from '../umo.js'
import Tabs from '../components.dom/Tabs.js'
import DoubleIframe from '../components.dom/DoubleIframe.js'
import Cusb from './Cusb.js'
import '../ico.js'
let SecureBrowser = props => {
let [url,setURL] = useState();
(<>
<input type = {'text'} value = {url} onChange = {pipe(evt => evt.target.value,setURL)}></input>
<DoubleIframe src = {url}></DoubleIframe>
</>)

}
export default props => {
    try{document}catch(err){return null};
    let ref = useRef();
let nodes = useAllNodes();
let root = nodes.filter(n => ref.current && (n.parentNode === document.body || n.parentNode === ref.current));
let nonTabRoot = root.filter(n => !((n.classList.includes('__next') && n.childNodes[0].classList.includes('st-tabs')) || n.classList.includes('st-tabs')));
useEffect(() => {return () => {nonTabRoot.forEach(n => document.body.appendChild(n))}},[nonTabRoot]);
let [cusbEnabled,setCusbEnabled] = useState(false);
let Ex = useMemo(() => win => {},[]);
return (<div className = "st-tabs">
<Tabs>
<div title = {"Webpage"} ref = {elem => {nonTabRoot.forEach(n => elem.appendChild(n)); ref.current = elem}}></div>
<SecureBrowser title = {"Browser"}></SecureBrowser>
<div title = {"Cusb"}>{cusbEnabled ? (<Cusb {...props} extensions = {(props.extensions || []).concat([{id: 'Tabs',code: Ex}])}></Cusb>) : (<button onClick = {setCusbEnabled.bind(null,true)}>Enable Cusb</button>)}</div>
</Tabs>

</div>)
}