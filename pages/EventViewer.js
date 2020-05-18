import React, { useState, useEffect } from 'react'
import { Observable, of } from 'rxjs'
import { map, mergeAll } from 'rxjs/operators'
import ErrorAlert from './ErrorAlert.js'
export default props => {
    let [events, setEvents] = useState([]);
    let [o, setO] = useState();
    let [error, setError] = useState();
    useEffect(() => { setO(props.observable.pipe(map(v => v.stream ? v.stream.pipe(map(nv => ({ type: 'streamdata', data: {value: nv,parent: v}}))) : of(v)),mergeAll()))},[props.observable])
    useEffect(() => { let s = o.subscribe(evt => setEvents(events.concat([evt])),setError); return () => { s.unsubscribe(); } },[o])
    return (<><ErrorAlert error={error}></ErrorAlert></>)
}