export default st => { try { return self && new Proxy({ postMessage: self.postMessage.bind(self), addEventListener: self.addEventListener.bind(self), removeEventListener: self.removeEventListener.bind(self) }, { get: (o, k) => (...args) => o[k](...args.map(a => Object.assign(a, { st }).map(v => v instanceof Function ? (evt) => evt.data.st === st && v(evt.data) : v))) }) } catch (err) { }};