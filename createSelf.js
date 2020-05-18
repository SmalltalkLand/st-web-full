import { create } from 'web-worker-proxy'
import stp from './stp.js'
export default st => create(stp(st))