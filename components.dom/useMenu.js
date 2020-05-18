import React, { useState} from 'react'
import { Menu, activate } from './Menu.js'
export default props => {
    let [isMenu, setIsMenu] = useState(false);
    let [id, setID] = useState(() => Symbol());
    let e = isMenu ? (<Menu {...props} id={id}></Menu>) : (<></>);
    return [e, evt => { setIsMenu(true); activate(id); }]
}