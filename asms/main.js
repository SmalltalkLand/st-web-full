import {apply,unapply,pipe} from 'ramda'
let MyAsm;
export default MyAsm = unapply(pipe(a => [a[0],Object.assign(a[1],{pipe,apply,unapply}),a[2]],apply(function MyAsm_(stdlib, foreign, heap){
"use asm";
var pipe = foriegn.pipe
var argsvf = new stdlib.Float64Array;
var gdf = function(mode){mode = mode|0;}
function argsf(args){
var old = argsvf;
argsvf = args;
var ogd = gdf;
function lgdf(mode){
mode = mode|0;
if(mode === 0){gd = ogd;return argsf = old;};
return argsf
}
gdf = lgdf;
}
return {}
})))