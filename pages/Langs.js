import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useAsync } from "react-async"
import {pipe,identity} from 'ramda'
import DoubleIframe from '../components.dom/DoubleIframe'
let LoadKeyboard = ({lang}) => import(`./keyboards/${lang}/default.js`)
let Keyboard = props => {
    const { data, error, isPending } = useAsync({ promiseFn: LoadKeyboard, lang: props.lang })
    if (props.lang === 'en') return null;
    if (isPending) return (<div></div>);
    let MyKeyboard = data;
    if (data) return (<MyKeyboard {...props}></MyKeyboard>)
}
export default props => {
    let parentsParent;
    try { parentsParent = parent?.parent } catch (err) { return null }
    let vk;
    try { vk = self.vk } catch (err) { };
    let h = evt => {
        if (!evt.st_done) { evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation(); evt.target.dispatchEvent(Object.assign(new KeyboardEvent(evt.type, {key: (parentsParent._ime_key || identity)(evt.key),code: (parentsParent._ime_code || identity)(evt.code)}), {st_done: true})) } };
    (b => { useEffect(() => { b.addEventListener('keydown', h, true); b.addEventListener('keyup', h, true); return () => { b.removeEventListener('keydown', h, true); b.removeEventListener('keyup', h, true) } }); })(parentsParent.document.body);
    useEffect(() => {
        let c = () => { };
        if (vk?.current) ReactDOM.render(<div><Keyboard {...props} lang={parentsParent?.St__language || 'en'}></Keyboard></div>, vk.current);
        if (parentsParent?.St__language === 'he') {
            let e; vk?.current?.ownerDocument.appendChild(e = document.createElement('div')); ReactDOM.render(e, <DoubleIframe src={'/hebe-desktop'}></DoubleIframe>); c = pipe(c, () => { e.parentNode.removeChild(e); }); };
        return c 
    }, [vk?.current, props]);
    return (<div><div style={{ display: 'none' }}>{Math.random()}</div></div>)
}