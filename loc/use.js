import p from './index.js'
import { useState } from 'react'
import {usePrevious} from '../uses.js'
export default () => {
    let [check, setCheck] = useState(7760);
    let old = usePrevious(check);
    return t => old === check ? p.t(t) : '#Memory Leak#' + p.t(t)
}