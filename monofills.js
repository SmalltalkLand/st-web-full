import React from 'react'
try { var self_ = self; } catch (err) { var self_ = global }
//self_.Symbol = new Proxy(self_.Symbol, { construct: (o, args, t) => Function.prototype.apply.call(o, t, args) })
React.createElement = (old => (...args) => ((React.createElement.handlers || []).slice().reverse().reduce((acc, cur) => cur(acc), old))(...args))(React.createElement);
/*self_.document = self_.document || {
    addEventListener: () => { },
    createElement: () => ({})};
try { Object.defineProperty(self_, 'window', { get: () => self_ }) } catch (err) { }*/