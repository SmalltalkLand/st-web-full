import React from 'react'
export default props => {
    let { activeTab, label } = props;
    let className = 'tab-list-item';

    if (activeTab === label) {
        className += ' tab-list-active';
    };
    return ( <li className = { className }
    onClick = {() => {
                props.onClick(label);
            }}>
        </li>)

}