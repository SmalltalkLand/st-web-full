import React, { useState } from 'react'
import MultiProxy from '../MultiProxy.js'
export default props => {
    let [module, setModule] = useState();
    (l => useEffect(() => {setModule(MultiProxy(l,l[0])) },[...l]))(Object.getOwnPropertyDescriptors(self).filter(d => d.name.startsWith('aster')))
    return props.children({module})
}