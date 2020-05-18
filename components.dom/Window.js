import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Draggable_ from 'react-draggable'
import { Menu, activate } from './Menu.js'
import useLoc from '../loc/use.js'
import '../ico.js'
import swal from 'sweetalert'
export let themes = {
    default: new Proxy({}, { get: (o, k) => o[k] || k }),
    expiremental: new Proxy({ O: 'ㅁ', 'X': 'א','-': '⼇'}, {get: (o,k) => o[k] || k}),
    text: new Proxy({'-': '⼇',O: '⺋'},{get: (o,k) => o[k] || k}),
    ico: new Proxy({wrappedTheme: [null],table: new Proxy({X: 'close'},{get: (o,k) => o[k] || k})},{get: (o,k) => o[k] ||  new Proxy(<i data-vi={o.table[k]}></i>,{get: (o,k2) => k2 === 'toString' || k2 === Symbol.toString ? () => o.wrappedTheme[0][k] : o[k2]})}),
};
themes.ico.wrappedTheme[0] = themes.default;
let MyTheme= themes.default;
let ThemeInit = props => {
    let [num,setNum] = useState();
return (<div>{Object.keys(themes).map(k => [k,themes[k]]).map(([k,v]) => (<div onClick = {() => {MyTheme = v; MyTheme.wrappedTheme && MyTheme.wrappedTheme.map((v,i) => swal(`SubTheme ${i} for ${k}`,{content: 'input'}).then(result => themes[result])); setNum(Math.random())}}>{k}</div>))}</div>)

}
export default props => {
    let loc = useLoc();
    let [tabIndex, setTabIndex] = useState(0 );
    let [isMaximized, setIsMaximized] = useState(false); let [ms, setMS] = useState(() => Symbol());let Draggable = props.Draggable || Draggable_; let theme = props.theme ||  MyTheme;return (
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
                <div>{props.theme_init ? (<div>
                <ThemeInit></ThemeInit>

                </div>) : props.tabs ? props.tabs[tabIndex].value : props.children}</div>
            </div>
        </Draggable>)
}