import {saveAs} from 'file-saver'
import 'web-streams-polyfill'
let self_; try{self_ = self}catch(err){self_ = global};
self_.saveAs = saveAs;