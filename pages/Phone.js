import React, {useState, useEffect} from 'react'
import {Menu} from '../components.dom/Menu.js'
let rapps = {0: {name: 'test',display: [{title: 'test'}]}};
export default props => {
    let [curapp,setCurApp] = useState();
let key = b => {
if(!curapp){return setCurApp(rapps[b])}
curapp.key(b);
};
let home = () => {
setCurApp(undefined);

}
let ok = () => {
if(curapp)curapp.ok();

}
let b = (<span><span onClick = {key.bind(null,'#')}>#</span></span>)
    return (<div>
    <Menu title = {<span onClick = {home}>{curapp ? (curapp.name) : 'Apps'}</span>} items = {[...(curapp ? curapp.display.map(i => ({title: i.title,onClick: i.onClick ? i.onClick.bind(null,{setCurApp}) : (() => {})})) : [])]} forceActivate = {true}></Menu>
    <div><span onClick = {ok}>Ok</span><span onClick = {home}>Home</span></div>
    <div><span onClick = {ok}>-</span><span onClick = {home}>-</span></div>
<div>{[...Array(10).keys()].map(n => (<span onClick = {key.bind(null,n)} key = {n}>{n.toString()}{n == 0 ? b : null}{Math.floor(n / 3) * 3 === n ? (<br />): (<></>)}</span>))}</div>
    </div>)
}