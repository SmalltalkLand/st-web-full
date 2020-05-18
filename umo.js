import { pipe } from 'ramda'
import React, { useState, useRef, useEffect, useMemo } from 'react'
let opts = { childList: true, subtree: true }
export function useMutationObserver(elem, c) {

    useEffect(() => {
        let o = new MutationObserver(c);
        o.observe(elem, opts);
        return () => o.disconnect();
    }, [elem, c])
}
export function allChildren(node) {
    return [].slice.call(node.childNodes).map(allChildren).reduce((a, b) => a.concat(b),[]).concat(node.shadowRoot ? allChildren(node.shadowRoot) : []).concat([node]);

}
let slice = l => l && [].slice.call(l);
export function useBetterMutationObserver(elem, c) {
    let [ms, setMS] = useState(() => Symbol());
    let mh = useMemo(() => ml => {
        ml.forEach(m => {

            m.ne_w = {
                target: m.target,
                addedNodes: slice(m.addedNodes)?.map(allChildren)?.reduce((a, b) => a.concat(b),[]), removedNodes: slice(m.removedNodes)?.map(allChildren)?.reduce((a, b) => a.concat(b),[]),
                baseAddedNodes: slice(m.addedNodes),baseRemovedNodes: slice(m.removedNodes)
            };
            m.ne_w.addedNodes?.forEach(n => {
                if (n.shadowRoot) {
                    n[ms] = new MutationObserver(mh);
                    n[ms].observe(n.shadowRoot, opts);
                };
            });
            m.ne_w.removedNodes?.forEach(n => {
                if (n[ms]) {
                    n[ms].disconnect();
                    delete n[ms];

                }

            });
        });
        c(ml.map(n => n.ne_w));
    },[elem,c]);
    useMutationObserver(elem, mh);
}
export function useAllNodes(elem) {
    let [elems, setElems] = useState(() => allChildren(elem));
    setElems = pipe(v => elems = v, setElems);
    useBetterMutationObserver(elem, ml => { ml.forEach(m => setElems(elems.concat(m.addedNodes || []).filter(n => !m.removedNodes?.includes(n)))) });
    return [elems]

}