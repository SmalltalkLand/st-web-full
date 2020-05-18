import React, { useEffect } from 'react'
import { locale } from '../loc/index.js'
import useLoc from '../loc/use.js'
import {pipe,apply,unapply} from 'ramda'
Object.defineProperty(self, 'מסמך', { get: () => document });
let pp;
let hetable = {
    'תוחלת': 'span',

};
try { pp = parent.parent } catch (err) { };
let defprop = (tf,...args) => {
    Object.defineProperty(tf(self), ...args.slice(0,args.length - 1),args[args.length](self));
    if (pp) Object.defineProperty(tf(pp), ...args.slice(0,args.length - 1),args[args.length](self));

}
defprop(x => x, 'hetable', x => ({get: () => hetable}))
defprop(x => x.Document.prototype, 'בורר', x => ({ get: () => x.Document.prototype.querySelector }));
defprop(x => x.HTMLElement.prototype, 'לצרף', x => ({ get: () => x.HTMLElement.prototype.appendChild }));
defprop(x => x.HTMLElement.prototype, 'הסר', x => ({ get: () => x.HTMLElement.prototype.removeChild }));
defprop(x => x.Document.prototype, 'ליצור אלמנט', x => ({ get: () => unapply(pipe(a => a.map((item,index) => index == 0 ? (() => `${customElements.get(item) ? item : x.hetable[item] || item}`)(): item),apply(x.Document.prototype.createElement))) }));
export default props => {
    useEffect(() => { let old = locale; locale = 'he'; return () => {locale = old } })
    (new Function('code', 'with(new Proxy({},{has: (o,k) = true}))return eval(code)'))(``);
return (<div></div>)
}