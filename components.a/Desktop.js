import React, {useState,useMemo} from 'react'
import Dism from '../Dism.js'
let MD = new Proxy({div: 'a-box',[(<></>).type]: (<></>).type},{get: (o,k) => k.startsWith('a-') ? k : o[k]})
let MyDism = (props) = {
// tslint:disable-next-line
    return (e => e)(<>{props.children(() => e => null).map(e => (V => (<V {...e.props}></V>))(MD[e.type]))}</>);
};
let d = Dism(MyDism);
export default props => {
    let [windows, setWindows] = useState([]);
    setWindows = pipe(w => windows = w, setWindows);
    let cw = w => () => { setWindows(windows.filter(nw => nw !== w)); };
    let rw = w => (<div>{w.render(props,{windows,setWindows,rw})}</div>);
    return (<div><a-scene croquet = {{sessionName: `st-a-desktop-${props.id}`}}>{d(<>
{windows.map(rw)}

    </>)}</a-scene></div>)
}