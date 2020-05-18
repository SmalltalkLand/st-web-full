let sts = Symbol();
let n = Math.random();
let o = self[sts] = self[n] = {sts,n}
let b = o.buttons = new Map();
self.addEventListener('keyup',evt => {b.set(evt.key,(b.get(evt.key) || []).concat([evt]))})