import { proxy } from 'web-worker-proxy'
import DynProxy from './components.dom/DynProxy.js'
import stp from './stp.js'
export default st => {
    let v;
    get = () => v;
    set = (_v) => v = _v;
    proxy(DynProxy(get),stp(st))
    return [get,set]
}