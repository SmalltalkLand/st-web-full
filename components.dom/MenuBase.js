import React, { useState, useEffect, useMemo } from 'react'
import wpipe, {wrapper} from '../wpipe.js'
let menus = {};
export function Menu(props) {
    let [isActivated, setIsActivated] = useState(props.preactivate ? true : false);
    if (props.forceActivate)isActivated = true;
    let [evt, setEvent] = useState(null);
    let [queue, setQueue] = useState([]);
    let children = useMemo(() => wpipe(wrapper(props.children),...props.hooks.map(h => h.child).filter(x => x)),[props.children,props.hooks]);
    useEffect(() => { let o = menus[props.id]; menus[props.id] = { ...Object.assign({},...props.hooks.map(h => h.prop).filter(x => x)),activate: (evt_) => { setIsActivated(true); setEvent(evt_.persist()) }, deactivate: () => { setEvent(null); setIsActivated(false);},message: (a) => setQueue(queue.concat([a]))}; return () => {menus[props.id] = o }},[props.id,setIsActivated,props.hooks])
    return (<div style={{ display: isActivated ? 'block' : 'none','--st-menu': 'true',...Object.assign({},...props.hooks.map(h => h.style).filter(x => x)) }}>{children({ evt, readMessage: () => { let q = queue[0]; setQueue(queue = queue.slice(1));return q }})}</div>)
}
export function getTag(id) {

    return menus[id]
}