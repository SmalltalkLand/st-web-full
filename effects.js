import * as svg from 'svg-inline-loader!./fx.svg'
let f = async () => {let s;document.body.style.filter = (document.body.style.filter || '').replace(/contrast\(.*\)/,'') + (s= `contrast(500%) url(data:image/vg+xml;utf8,${svg}#index)`);while(document.body.style.filter.includes(s))await new Promise(requestAnimationFrame); await f()};
f()