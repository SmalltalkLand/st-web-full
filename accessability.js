import React, {useState,useMemo, useEffect} from 'react'
import {useBetterMutationObserver,allChildren} from './umo.js'
export default props => {
let [dom,setDOM] = useState(true);

let [enabled,setEnabled] = useState();
let [reader,setReader] = useState();
let hs = useMemo(() => Symbol());
let oh = useMemo(() => evt => {if(enabled && reader){
if(evt.target.nodeType === Node.TEXT_NODE){var utterThis = new SpeechSynthesisUtterance(node.nodeValue);self.speechSynthesis.speak(utterThis);}

}},[reader,enabled])
try{if(dom)useBetterMutationObserver(document.body,ml => {ml.forEach(m => {
if(m?.addedNodes)m?.addedNodes?.filter(n => n.nodeType === Node.TEXT_NODE).forEach(tn => {var utterThis = new SpeechSynthesisUtterance(`Added: ${tn.nodeValue}`);if(enabled && reader)self.speechSynthesis.speak(utterThis);})
m?.addedNodes?.forEach(n => n.addEventListener('hover',n[hs] = oh));
m?.removedNodes?.forEach(n => n.removeEventListener('hover',n[hs]));
m?.removedNodes?.forEach(n => delete n[hs])
})})}catch(err){setDOM(false)};
if(dom){useEffect(() => {let nodes = allChildren(document.body).map(n => {n.addEventListener('hover',n[hs] = oh); return n}); return () => {nodes.forEach(n => {n.removeEventListener('hover',n[hs]); delete n[hs]})}});}
return props.children({enabled: [enabled,setEnabled],reader: [reader,setReader]})

}