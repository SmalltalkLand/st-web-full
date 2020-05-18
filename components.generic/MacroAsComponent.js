import React from 'react'
export default macro => props => macro(React.createElement,props, props.children)