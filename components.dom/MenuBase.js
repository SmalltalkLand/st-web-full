import React, { useState, useEffect } from 'react'
let menus = {};
export function Menu(props) {
    let [isActivated, setIsActivated] = useState(props.preactivate ? true : false);
    if (props.forceActivate)isActivated = true;
    let [evt, setEvent] = useState(null);
    let [queue, setQueue] = useState([]);
    useEffect(() => { let o = menus[props.id]; menus[props.id] = { activate: (evt_) => { setIsActivated(true); setEvent(evt_.persist()) }, deactivate: () => { setEvent(null); setIsActivated(false);},message: (a) => setQueue(queue.concat([a]))}; return () => {menus[props.id] = o }},[props.id,setIsActivated])
    return (<div style={{ display: isActivated ? 'block' : 'none','--st-menu': 'true' }}>{props.children({ evt, readMessage: () => { let q = queue[0]; setQueue(queue = queue.slice(1));return q }})}</div>)
}
export function getTag(id) {

    return menus[id]
}