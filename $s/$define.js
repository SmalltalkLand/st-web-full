import $ from "cash-dom";
let s = new Symbol();
$.fn[s] = function (sym, f) { this[sym] = f; return sym }
$[s] = function (sym, f) {return this.fn[s](sym,f)}
return s