import wpipe, {wrapper} from './wpipe.js'
export default (lang,{getHooks}) => ((v => v[`create${lang}`].bind(v))
((p => window.trustedTypes ? trustedTypes.createPolicy(`${lang}-${Math.random()}`,p) : p)
(new Proxy({},{get: (o,k) => (h => wpipe(...[wrapper(v => v),...h.map(h => h.wrap).filter(x => x)]))(getHooks()),has: (o,k) => true}))))