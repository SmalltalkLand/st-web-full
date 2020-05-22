import {identity} from 'ramda'
export default (...fl) => fl.reduce((f,vf) => vf(f),identity)
export let wrapper = f => f2 => v => f(f2(v));