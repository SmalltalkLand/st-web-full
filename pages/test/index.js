import React from 'react'
import '../../monofills.js'
import nevts from '../../nevts.js'
React.createElement.handlers = [nevts];
export default props => (<div onEventHalo={evt => { }}></div>)