import React, { useState } from 'react'
import Window from './Window.js'
import { Menu as Menu_, getTag as getTag_ } from './MenuBase.js'
import useEventListener from '@use-it/event-listener'
import useLoc from '../loc/use.js'
import useMenu from './useMenu.js'
import wpipe, {wrapper} from '../wpipe.js'
export function Menu(props) {
    let loc = useLoc();
    let [e, mactivate] = useMenu({ title: loc('About #title#').replace(/#title#/,props.title),items: []});
    useEventListener('click', (evt) => {
        if(getComputedStyle(evt.target)
        .getPropertyValue('--st-menu'))return;getTag_(props.id).deactivate(); })
    return (<div onEventHalo={evt => { }}><Menu_ hooks = {[...props.hooks.map(h => h.base).filter(x => x),{child: f => wpipe(...[wrapper(v => f(v)),...props.hooks.map(h => h.child).filter(x => x).map(h => f => v => f(h(v))),f => oc => <>{f(<>{oc}</>)}</>])}]} id={props.id} preactivate = {props.preactivate} forceActivate = {props.forceActivate}>{({ readMessage, evt }) => (<Window drag={{ [evt && evt.clientX && evt.clientY ? 'position' : 0]: [evt?.clientX, evt?.clientY] }} titlebar={(tp) => (<span>{props.title}</span>)}>{e}<div onContextMenu={mactivate}>{props.items.map(i => (<div onClick={(evt) => { props.onClick && props.onClick(i,evt);i.onClick(evt) }}>{i.title}</div>))}</div></Window>)}</Menu_></div>)
}
export function activate(id,evt) { getTag_(id).activate(evt) }
export function Global(props){
let [menuList,setMenuList] = useState([]);
return (<>{props.children({menuList, setMenuList})}{menuList.map(m => <Menu {...m} hooks = {m.hooks.concat(props.hooks)}></Menu>)}</>)
}