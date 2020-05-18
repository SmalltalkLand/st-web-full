import React from 'react'
import ReactDOM from 'react-dom'
export default props => (<iframe src={'about:blank'} ref={/*props.firstRef*/elem => {
    if(elem)ReactDOM.render(<body><iframe {...props} ref={props.secondRef}></iframe></body>, elem.contentWindow.document.body);
}}></iframe>)