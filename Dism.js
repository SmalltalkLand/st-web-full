import React from 'react'
import {pipe, apply, unapply} from 'ramda'
import ClassToFunction from './components.generic/ClsToFunc.js'
export default Dism => {
    let componentMap = new Map();
    let noDISM = Symbol();
    let r = (element, ref) => element && (Type => (<Type {...element.props} ref={elem => {
        [ref, element.props.ref].forEach(r => {
            if (typeof r === 'function') {
                r(elem)
            } else if (typeof r === 'object') {
                r.current = elem
            }
        });
    }}>{element.props.children instanceof Function ? unapply(pipe(apply(element.props.children), e => (<Dism elem={element}>{ref => r(e, ref())}</Dism>))) : (<Dism elem={element}>{ref => element.props.children.map(e => r(e, ref()))}</Dism>)}</Type>)((['string', 'symbol'].includes(typeof element.type) || welement.type[noDISM]) ? element.type : (v => { componentMap.set(element.type, v); return v })(componentMap.get(element, type, pipe(element.type?.prototype?.render ? ClassToFunction(element.type) : element.type, r)))));
    r.noDISM = noDISM;
    return r
}