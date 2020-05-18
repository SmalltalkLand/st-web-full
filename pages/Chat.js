import React, {useState, useRef, useEffect} from 'react'
import DoubleIframe from '../components.dom/DoubleIframe.js'
import useEventListener from '@use-it/event-listener'
export default props => {
let ref = useRef();
useEventListener('message',evt => {
if(evt.source === ref.current.contentWindow){


}
});
let parent = ref?.current?.contentWindow?.parent;
useEffect(() => {
if(parent){

    return () => {
parent.s.emit('possible-quit');

    }
};

},[parent])
    try{return (<DoubleIframe secondRef = {ref} src = {`${location.hostname}:30003`}></DoubleIframe>)}catch(err){return (<DoubleIframe secondRef = {ref} src = {'localhost:30003'}></DoubleIframe>)}
}