let func;
export default func = win => {
    let apply = Function.prototype.apply.call.bind(Function.prototype.apply);
let h = {
apply: (o,t,args) => o.name.includes('eventListener') ? t['onD' + o.name](...args) : o.name === 'open' ? func(apply(o,t,args.map(a => a.replace(/(height( *)=|width( *)=)( *)[\d]*/gi,'')))) : apply(o,t,args)

};
win.open = new Proxy(win.open,h);
let ep = win.HTMLElement.prototype;
ep.addEventListener = new Proxy(ep.addEventListener,h);
ep.removeEventListener = new Proxy(ep.removeEventListener,h);
return win;
}