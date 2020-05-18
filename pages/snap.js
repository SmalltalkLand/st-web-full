import React from 'react'
import DoubleIframe from '../components.dom/DoubleIframe.js'
import {partialRight} from 'lodash'
export default props => {


    return (<DoubleIframe src={'https://snap.berkeley.edu/snap/snap.html'} firstRef={w => {
        w.contentWindow.createFunction = (args, code) =>
            partialRight(new Function(...args, 'parentStuff', code), {
                iframeProps: props, createDOMWindow: tag => {
                    let e = document.createElement(tag); props.newWindow({ render: () => (<div ref={d => { d.appendChild(e) }}></div>) }); return e
                }
            });

    }}></DoubleIframe>)
}