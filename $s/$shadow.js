import $ from "cash-dom";
let s = new Symbol();
S.fn[s] = function () { return this.map((i, e) => e.shadowRoot || e.attachShadow({mode: 'open'})) };
return s