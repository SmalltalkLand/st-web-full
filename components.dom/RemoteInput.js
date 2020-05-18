import React, {useRef,useMemo} from 'react'
export default props => {
let ref = useRef();
return (<>
<input {...props} ref = {ref} style = {{display: 'none',...(props.style || {})}}></input>
<iframe src = {props.src} ref = {useMemo(win => {win.contentWindow._ref = ref},[ref])}></iframe>
</>)
}