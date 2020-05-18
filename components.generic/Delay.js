import React, { useEffect, useState } from 'react'
export default props => {
    let [done, setDone] = useState(false);
    useEffect(() => {
        setDone(false); setTimeout(props.time, () => {
            setDone(true)
        });
    }, [props.time, ...props.secrets])
    return props.children(done)
}