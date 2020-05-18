export default f => function(...args){
    let i = 0;
let oldl = console.log;
let olda = alert;
let oldp = prompt;
let v;
alert = console.log = nv => v = nv;
prompt = () => {let v = args[i]; i++; return v}
try{f();}finally{alert = olda; console.log = oldl; prompt = oldp;}
return v;
}