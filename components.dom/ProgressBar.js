import React, {useState} from 'react'
import {pipe,andThen,tap} from 'ramda'
import '../ico.js'
export default props => {
let [debug,setDebug] = useState(false);
if(debug)return null;
    return (<div><div className = {'bar'} style = {{width: props.percent}}></div><i vi-icon = "close" onClick = {pipe(props.debug,tap(() => setDebug(true)),andThen(() => setDebug(false )))}></i></div>)
}