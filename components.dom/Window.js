import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Draggable_ from 'react-draggable'
import { Menu, activate } from './Menu.js'
import useLoc from '../loc/use.js'
import '../ico.js'
let themes = {
    default: new Proxy({}, { get: (o, k) => o[k] || k }),
    expiremental: new Proxy({ O: 'ㅁ', 'X': 'א'}, {get: (o,k) => o[k] || k}),
    ico: new Proxy({theme: 'default',table: new Proxy({X: 'close'},{get: (o,k) => o[k] || k})},{get: (o,k) => o[k] ||  new Proxy(<i data-vi={o.table[k]}></i>,{get: (o,k2) => k2 === 'toString' || k2 === Symbol.toString ? () => themes[o.theme][k] : o[k2]})}),
};
export default props => {
    let loc = useLoc();
    let [tabIndex, setTabIndex] = useState(0 );
    let [isMaximized, setIsMaximized] = useState(false); let [ms, setMS] = useState(() => Symbol());let Draggable = props.Draggable || Draggable_; let theme = props.theme ||  themes[props.dtheme || 'default'];return (
        <Draggable handle={".handle"} {...(props.drag || {})}>
            <div style={{ width: isMaximized ? '100%' : props.width, height: isMaximized ? '100%' : props.height }}>
                {(isMaximized ? (props.portal || ReactDOM.createPortal).bind(props.portalThis || ReactDOM, props.winMenuBarArea) : x => x)(<><div>
                    {(menuItems => props.titlebar ? (props.titlebar({ setIsMaximized, isMaximized, menuItems, onClose: props.onClose })) : (<>
                        <button onClick={props.onClose}>{theme['X']}</button>
                        {props.setMinimized && (<button onClick={() => props.setMinimized(!props.minimized)}>{theme['-']}</button>)}
                        <button onClick={() => setIsMaximized(!isMaximized)}>{theme['O']}</button>
                        <span className={"handle"}>{props.tabs ? (<>{props.tabs.map((t, i) => (<div key={t.title + i} onClick={() => setTabIndex(i)}>{t.title}</div>))}</>) : props.title || themes['##########################']}</span>
                        <Menu id={ms} title={props.tabs ? props.tabs[tabIndex].title : props.title || themes['##########################']} items={menuItems}></Menu>
                        <button onClick={activate.bind(null, ms)}>{themes['v']}</button>
                    </>))([
                        { title: theme['X'] + loc('Close'), onClick: props.onClose },
                        { title: theme['-'] + loc('Mimimize'), onClick: () => props.setMimimized && props.setMinimized(!props.minimized)},
                        { title: theme['O'] + loc('Maximize'), onClick: () => setIsMaximized(!isMaximized) },
                        { title: theme['v'] + loc('Menu'), onClick: activate.bind(null, ms)}
                    ])}
                </div></>)}
                <div>{props.tabs ? props.tabs[tabIndex].value : props.children}</div>
            </div>
        </Draggable>)
}