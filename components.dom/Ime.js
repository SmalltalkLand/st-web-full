import React, { useEffect } from 'react'
import {useAllNodes} from '../umo.js'
import wpipe, {wrapper} from '../wpipe.js'
import {andThen,pipe} from 'ramda'
let imet;
export let lt = {
'en': f => v => f(v),
'ru': f => v => f({...v,key: String.fromCodePoint(864 + 0x410 + (v.key.codePointAt(0) - 65 ))})

};
let eb;
export let ee = (f,d) => v => {
if(!eb){eb = v; return;};
let a = [eb,v];
eb = null;
a = a.map(val => val.codePointAt(0) - 65);
if(a[1] === 'x'){d(); return;};
let val = a.reduce((acc,v) => acc * 26 + v,0);
val = val + 0x1F600;
return f(String.fromCodePoint(val));
}
export default props => {
let [nodes] = useAllNodes(document.body);
let [emoji,setEmoji] = useState(false);
let ime = useMemo(() => pipe(Promise.resolve.bind(Promise),wpipe(...[
    wrapper(andThen(props.im)),
    props.lang ? andThen(lt[props.lang]) : wrapper(x => x),
    emoji ? andThen(ee.bind(null,setEmoji.bind(null,false))) : wrapper(x => x),
    ...props.hooks.map(h => h.ab).filter(x => x)
    .map(h => f => andThen(v => h.after(f(h.before(v)))))
]),Promise.resolve.bind(Promise)),[props.hooks,props.im,emoji])
let f = useMemo(() => t => evt => (async () => {
    if(!ime)return;
if(imet === evt.target)return;
let o = imet;
imet = evt.target;
imet.dispatchEvent(new KeyboardEvent(t,{...await ime({...evt})}));
imet = o;
})(),[ime]);
useEffect(() => {
    let kd = f('keydown');
    let ku = f('keyup');
nodes.forEach(n => {n.addEventListener('keydown',kd);n.addEventListener('keyup',ku)});
return () => {
    nodes.forEach(n => {n.removeEventListener('keydown',kd);n.removeEventListener('keyup',ku)});

}
},[nodes]);
return props.children({setEmoji});

}