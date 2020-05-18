import createSelf from './createSelf.js'
import poolp from './poolp.js'
import {pipe} from 'ramda'
export default pipe(poolp,f => (a => f(open(...a) || createSelf('cusw').open(...a)))(['about:blank',null,'chrome']))