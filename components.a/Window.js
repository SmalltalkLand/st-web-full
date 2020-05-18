import React, {useState} from 'react'
export default props => {

return (<>
<script src="https://unpkg.com/aframe-click-drag-component"></script>
<a-box click-drag>

{props.children}
</a-box>
</>)
}