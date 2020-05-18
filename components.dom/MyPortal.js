import React from 'react'
import $ from 'cash-dom'
export default props => (<span jsim={props.jsim} appendTo={$(props.target)}>{props.children}</span>)