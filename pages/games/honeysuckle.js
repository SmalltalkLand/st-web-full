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
        if(collided.length)props.onCollidedChanged(collided)
    }, [allBoxes])
    return (<div {...props} style={props}></div>)
}
let Player = props => {
    let [top, setTop] = useState(0);
    setTop = pipe(v => top = v, setTop);
    let [left, setLeft] = useState(0);
    setLeft = pipe(v => left = v,setLeft)
    let [id, setID] = useState({});
    useEventListener('keydown', evt => {
        setID(Object.assign({}, id, {
            top: ['w', 's'].includes(evt.key) ? setInterval(() => evt.key === 'w' ? setTop(top + 12) : setTop(top - 12), 300) : id.top,
            left: ['a', 'd'].includes(evt.key) ? setInterval(() => evt.key === 'd' ? setLeft(left + 12) : setLeft(left - 12), 300) : id.left
        }))
    });
    useEventListener('keyup', evt => {
        setID(Object.assign({}, id, {
            top: ['w', 's'].includes(evt.key) ? clearInterval(id.top) && null : id.top,
            left: ['a', 'd'].includes(evt.key) ? clearInterval(id.left) && null : id.left
        }))

    })
    return (<Box {...props} top={top} left={left} type={'player'}></Box>)
}
export default props => {

    return (<>
        <Player></Player>
    </>)
}