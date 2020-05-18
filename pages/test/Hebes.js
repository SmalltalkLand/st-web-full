//Tests utf8 by embedding a proxied page with hebes on it
//this can also be used for ****
import React from 'react'
import DoubleIframe from '../../components.dom/DoubleIframe.js'
export default props => {

    return (<DoubleIframe src={'/proxy/file://F:/hebes/index.html'}></DoubleIframe>)
}