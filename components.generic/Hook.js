import React from 'react'
export default props => props.children(props.hook(...props.hookArgs || []))