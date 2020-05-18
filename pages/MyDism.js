import React from 'react'
export default props => {

    return (<div>{props.children(() => e => { let f; e.addEventListener('halo', f = evt => { evt.haloRender = (old => (n => evt => { if (old) old(evt); n(evt); })(evt => { }))(evt.haloRender);evt.haloData.haloCancel = (old => () => { let v = old(); e.removeEventListener('halo', f); return v })(evt.haloData.haloCancel) }); })}</div>)
}