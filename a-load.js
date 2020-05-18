import React, {useMemo} from 'react'
import {useBetterMutationObserver} from './umo.js'
let os = Symbol();
let ms = Symbol();
let m = {div: a => {
    let b;
a.appendChild(b = document.createElement('a-box'))
return [b,ml => {}];
}};
export default props => {
    let mh;
useBetterMutationObserver(mh = useMemo(ml => {
ml.forEach(m => {
    let ff;
    let nf;
    let f = a => [a.filter(ff = n => !n.nodeName.toLowerCase().startsWith('a-') && !['st-null','slot','template'].includes(n.nodeName.toLowerCase())).map(n => {
        let anode = document.createElement('a-entity');
        anode[os] = n;
        let [nn,r] = m[n.nodeName](anode);
        props.onConvert(anode,n)
        let rf = ml => {r(ml);mh(ml) };
        anode[ms] = new MutationObserver(rf);
        anode[ms].haver = rf;
        anode[ms].observe(n,{attributes: true})
        let nul;
        n.parentNode.replaceChild(n,nul = document.createElement('st-null'));
        let s = nul.attachShadow({mode: 'open'});
        s.appendChild(anode);
        nn.appendChild(document.createElement('slot'));
        nf(n);
    }),a.filter(n => !ff(n)).map(n => {
if(n[ms]?.haver){let m = new MutationObserver(n[ms]?.haver); m.haver = n[ms]?.haver; n[ms] = m; m.observe({attributes: true}) }
nf(n);
    })]
    nf = n => {
        f([].slice.call(n.childNodes));
        n.shadowRoot && nf(n.shadowRoot);

    }
f(m.baseAddedNodes);
m.removedNodes.filter(n => n[ms]).map(n => n[ms].disconnect());

})
}),[props.onConvert])

}