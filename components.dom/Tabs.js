import React, {useState} from 'react'
import Tab from './Tab.js'
export default props => {
let [activeTab,setActiveTab] = useState(() => props.children[0].props.label);
return (<div className = {'tabs'}><ol className = {"tab-list"}>{props.children.map((child) => {
    const { label } = child.props;

    return (
      <Tab
        activeTab={activeTab}
        key={label}
        label={label}
        onClick={onClickTabItem}
      />
    );
  })}</ol>        <div className="tab-content">
          {props.children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div></div>)

}