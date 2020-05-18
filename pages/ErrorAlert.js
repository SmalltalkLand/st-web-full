import React, { useEffect } from 'react'
import swal from '@sweetalert/with-react';
export default props => {
    useEffect(() => {
        let c = () => (<div>
            <h3>Error</h3>
            {props.error.toString()}
            <button onClick={props.debug}>{'Debug'}</button>
            <button onClick={() => { setTimeout(1000000, () => {swal(c()) }) }}>{'Delay'}</button>
        </div>);
        if (props.error) swal(c())
    }, [props.error])
    return null;
}