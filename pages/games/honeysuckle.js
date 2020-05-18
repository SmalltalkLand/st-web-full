import React, { useState, useEffect } from 'react'
import useEventListener from '@use-it/event-listener'
import { pipe } from 'ramda'
let allBoxes = [];
function intersectRect(r1, r2) {
    return !(r2.left > r1.left + r1.width ||
        r2.left + r2.width < r1.left ||
        r2.top > r1.top + r1.height ||
        r2.top + r2.height < r1.top);
}
let Box = props => {
    useEffect(() => {
        allBoxes = allBoxes.concat([props]); return () => {
            allBoxes = allBoxes.filter(b => b !== props)
        }
    }, [props]);
    useEffect(() => {
        let collided = allBoxes.filter(b => intersectRect(b, props)).filter(b => b !== self);
        if(collided.length && props.onCollidedChanged)props.onCollidedChanged(collided)
    }, [allBoxes])
    return (<div {...props} className = {props.type} style = {{top: props.top,left: props.left,'backgroundColor': props.color,width: props.width,height:props.height,position: 'relative'}}></div>)
}
let Player = props => {
    let [top, setTop] = useState(0);
    setTop = pipe(v => top = v, v => {return v},setTop);
    let [left, setLeft] = useState(0);
    setLeft = pipe(v => left = v,setLeft)
    let [id, setID] = useState({});
    setID = pipe(v => id = v,setID);
    let okd;
    setTop = (old => v => v < self.innerHeight - 20 && old(v))(setTop);
    setLeft = (old => v => v < self.innerWidth - 20 && old(v))(setLeft);
    let g;
    let [falling,setFalling] = useState(0);
    setFalling = pipe(v => falling = v,setFalling);
    useEffect(g = () => {
        let t = 300;
        if(top >= self.innerHeight - 40){setFalling(0);let v; let tm = setTimeout(pipe(g,vv => v = vv),t);return () => v ? v() : clearTimeout(tm)};
        setFalling(falling + 0.5);
        setTop(top + falling);
        let v;
        let af = setTimeout(pipe(g,vv => v = vv),t);
        return () => v ? v() : clearTimeout(af)

    },[]);
    useEventListener('keydown', okd = (evt,res = false) => {
        setID({
            top: (['w', 's'].includes(evt.key) ? evt.key === 'w' ? setTop(top - 12)  : evt.key === 's' && setTop(top + 12) && ((res ? id.top !== undefined : false) || setTimeout(okd.bind(null,evt,true),500)) : id.top),
            left: (['a', 'd'].includes(evt.key) ? evt.key === 'd' ? setLeft(left + 12) : evt.key === 'a' && setLeft(left - 12) && ((res ? id.left !== undefined : false) || setTimeout(okd.bind(null,evt,true),500)) : id.left)
        })
    });
    useEventListener('keyup', evt => {
        console.log(id);
            setID(/*Object.assign(*/{}/*, id, {
                top: ['w', 's'].includes(evt.key) ? clearInterval(id.top) : id.top,
                left: ['a', 'd'].includes(evt.key) ? clearInterval(id.left) : id.left
            })*/)


    })
    return (<Box {...props} top={top} left={left} type={'player'} color = {'red'} width = {'20px'} height = {'20px'}></Box>)
}
export default props => {

    return (<>
        <Player></Player>
    </>)
}