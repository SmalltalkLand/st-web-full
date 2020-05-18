import React, { useState, useRef } from 'react'
import Desktop from './desktop.js'
import ReactDOM from 'react-dom'
import {useBetterMutationObserver,allChildren} from '../umo.js'
export default props => {
    let [shown, setShown] = useState(false);
    let titleRef = useRef();
    let [tabNodes, setTabNodes] = useState([]);
    let [ts, setTS] = useState(() => Symbol());
    try {
        useBetterMutationObserver(document.body, ml => {
            ml.forEach(m => {
                if (m.target === document.body) {
                    let an = m.baseAddedNodes?.filter(n => !n.desktop && !allChildren(n).filter(c => c.desktop).length);
                    setTabNodes(tabNodes = tabNodes.concat(an || []));
                    an?.forEach(n => n[ts] = true)
                }
                if (m.target.style['--st-tabZone']) {
                    m.baseRemovedNodes?.filter(n => n[ts])?.forEach(n => {
                        setTabNodes(tabNodes = tabNodes.filter(nn => nn !== n));
                        delete n[ts];
                    })

                }
            })
        })
    } catch (err) { };
    let p = <div><div ref={titleRef}></div><button onClick={() => setShown(!shown)}>{'-'}</button></div>;
    try { if (document.querySelector('.st-bar.host')) p = ReactDOM.createPortal(p, document.querySelector('.st-bar.host')); } catch (err) { };
    return (<div>
        {p}
        {shown && (<Desktop {...props} exTabNodes={tabNodes}exTitleRef={titleRef.current && titleRef} ex={true}></Desktop>)}
    </div>)

}