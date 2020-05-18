
import React, { useState, useRef, useEffect } from 'react'
import { Observable } from 'rxjs';
import { publish } from 'rxjs/operators'
import { create } from 'web-worker-proxy'
import swal from 'sweetalert';
import {pipe,identity} from 'ramda'
import { useAsync } from "react-async"
import {andThen} from 'ramda'
import createSelf from '../createSelf.js'
import Window from '../components.dom/Window.js'
import DynProxy from '../components.dom/DynProxy.js'
import DoubleIframe from '../components.dom/DoubleIframe.js'
import { Menu, activate } from '../components.dom/Menu.js'
import Hook from '../components.generic/Hook.js'
import MultiHook from '../components.generic/MultiHook.js'
import useLoc from '../loc/use.js'
import useEventListener from '@use-it/event-listener'
import SugarShare from '../components.Sugar/Share.js'
import EventViewer from './EventViewer.js'
import Inspector from './Inspect.js'
import ReactDOM from 'react-dom'
import '../ico.js'
import { usePrevious } from '../uses.js'
import caffieneMacro from '../links/caffiene.js'
import '../monofills.js'
import nevts from '../nevts.js'
import { useHaloKit } from '../halokit.dom/index.js'
import macro, { Macro } from '../plugins/macro.js'
import $plugin from '../plugins/$plugin.js'
import MyDism from './MyDism.js'
import Dism from '../Dism.js'
import { useAllNodes, useBetterMutationObserver } from '../umo.js'
import wip from '../wip-alert.js'
import IoComponent from '../links/io.js'
import {locale} from '../loc/index.js'

let jp, CashElement, $;
let os;
try { os = self } catch (err) { }
let self;
try {
    self = eval('self')
} catch (err) {
    try {
        self = global
    } catch (err) {
        self = os;
        if (!os) {
            self = {};

        }

    }
}
React.createElement.handlers = [macro, nevts];
Object.defineProperty(self, `desk_locale$${Math.random()}`, { get: () => locale, set: v => locale = v });
export let exs = {};
export function SetExs(exs_) { exs = exs_ }
Object.defineProperty(self, `desk_exs$${Math.random()}`, {get: () => exs,set: SetExs})
(async () => {
    try { $ = await import('cash-dom').default;[jp, CashElement] = $plugin($); React.createElement.handlers.push(jp); } catch (err) { } })();
let dw = [{ render: (desk, api) => (<div></div>) }];
let OOBENULL = Symbol();
let OOBEEXTERNAL = Symbol();
let sw = createSelf('default');
let ex = createSelf('st-ex');
let getExSqueaks = async (props) => {
    let all_ = await ex.document.querySelectorAll('iframe[src$=squeak.html]');
    let nall = document.querySelectorAll('iframe[src$=squeak.html]')
    let length = await all_.length;
    let all = await Promise.all([].slice.call(new Proxy(all_, {get: (o,k) => k === 'length' ? length : o[k]})));
    let squeaks = await Promise.all(all.map((t, i) => Promise.all([t.contentWindow.SqueakJS.vm, t.contentWindow.Squeak, (c => Promise.all([Promise.resolve(c), Promise.resolve([(f => new Proxy(f(), {apply: (_,t,args) => Function.prototype.apply.call(f,t,args)}))(new Promise(c => $(c).one('click',c)))])]))(nall[i].contentWindow.document.querySelector('canvas'))])));
    return squeaks
}
let getExOnEvent = async (props) => await ex.stOnEvent
let dism = Dism(MyDism);
let pp, pppp;
try { pp = parent?.parent } catch (err) { };
try { pppp = pp?.parent?.parent } catch (err) {}
export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}
export default props => {
    let [windows, setWindows] = useState([]);
    setWindows = pipe(w => windows = w, setWindows);
    function wtraceObservable({ getWindows, setWindows }) {
        return new Observable(s => {
            setWindows(getWindows().concat([{
                title: 'Observable Pusher', render: (desk, api) => (<div><Hook hook={useState}>{([value, setValue]) => (<><Inspector obj={value} setObj={setValue}></Inspector><button onClick={() => { s.next(value); setValue({}); }}>{loc('Next')}</button></>)}</Hook></div>)}]))

        })
    }
    let [eof, setEOF] = useState();
    let [eo, setEO] = useState(() => new Observable(s => setEOF(s.next.bind(s))).pipe(publish()));
    useEffect(() => {
        if (props.StDebug) {
            let vs = viewEvents(eo);
            return () => { vs(); }
        }
    }, [eo, props.StDebug]); 
    function viewEvents(observable) {
        let ws;
        setWindows(windows.concat(ws = [{
            title: 'Event Viewer', render: (desk, api) => (<EventViewer observable={observable} triggerEvent={eof}></EventViewer>)}]))
        return () => {
            setWindows(windows.filter(w => !ws.includes(w)))

        }
    }
    let [sid, setSid] = useState(() => Symbol());
    useEffect(() => {
        if (windows.length === 0) setWindows(dw.map(o => Object.assign({}, o, {activateStart: activate.bind(null,sid)})));
    }, [windows])
    let [mid, setMID] = useState(() => Symbol());
    let loc = useLoc();
    let titleWin = useRef();
    let [oobeStage, setOOBEStage] = useState(OOBENULL);
    try { var pp = parent?.parent } catch (err) { var pp = null };
    useEventListener('oobestart', evt => { setOOBEStage(0); }, pp);
    useEventListener('message', evt => { });
    let cw = w => () => { setWindows(windows.filter(nw => nw !== w)); };
    let rw = w => (<div key={w.title}><Hook hook={useState} hookArgs={[false]}>{([minimized, setMinimized]) => <Window onClose={cw(w)} miminized={minimized} setMinimized={setMinimized} winMenuBarArea={DynProxy(() => titleWin.current)} title={(oobeStage === OOBENULL || oobeStage === OOBEEXTERNAL ? '' : loc('#OOBE#')) + w.title}>{w.render(props, { windows, setWindows, rw })}</Window>}</Hook></div>);
    let oobestages = [<div>
        <button onClick={() => setOOBEStage(OOBENULL)}>{loc('Done?')}</button>
    </div>];

    let exobserve = useAsync({ promiseFn: getExOnEvent });
    let rebodyRef = useRef();
    if (pp && location.href === 'about:blank') {
        useBetterMutationObserver(pp.document.body.querySelector('iframe:not(iframe[src*=about:blank])').contentWindow, ml => {
            ml.forEach(m => {
                m.addedNodes?.forEach(n => rebodyRef?.current?.appendChild(n))
            })
        })
        useBetterMutationObserver(rebodyRef.current,ml => {
            ml.forEach(m => {
                m.removedNodes;
            })
        })
    }
    let [sugar, setSugar] = useState();
    useEffect(() => {
        try { var define = self.define; } catch (err) { return; };
        if (self.__Sugar) {
            define(["sugar-web/activity/activity", "sugar-web/env"], function (activity,env) {

                setSugar({ activity, env })

            });

        }
    }, []);
    useEffect(() => {
        if (sugar) { setOOBEStage = (o => Object.assign(s => { if (s === OOBENULL) { sugar.activity.setup(); setOOBEStage = setOOBEStage.__so; let o = sugar.activity.setup; sugar.activity.setup = () => { }; } return o(s); }, { __so: o }))(setOOBEStage); }
        else { setOOBEStage = setOOBEStage.__so || setOOBEStage }
    }, [sugar, setOOBEStage]);
    let sqk = useAsync({ promiseFn: getExSqueaks });

    let [hdd, setHDD] = useState(() => Symbol());
    try { useHaloKit(evt => evt.button === 1); } catch (err) { };
    useEventListener('halo', evt => {
        let hd;
        hd = evt.haloData[hdd] = {};
    });
    let [hevt, setHEvt] = useState();
    let [hof, setHOF] = useState();
    let [ho, setHO] = useState(() => new Observable(s => setHOF(s.next.bind(s))));
    useEffect(() => { let s = eof && ho.subscribe((h) => eof({ type: 'halo', data: h })); return () => { s?.unsubscribe() } }, [eof, ho]);
    useEffect(() => { if (props.StDebug) { let o = wtraceObservable({ getWindows: () => windows, setWindows }); let s = eof && o.subscribe(h => eof({ type: 'user', data: h })); return () => {s?.unsubscribe() } }},[eof, props.StDebug])
    useEffect(() => { let s = exobserve.data && eo?.subscribe(exobserve.data); return () => { s?.unsubscribe(); } }, [exobserve.data, eo]);
    let md = props.StDebug ? dism : identity;
    let shost = useRef();
    let [shNodes, setShNodes] = useState([]);
    let exnodes;
    try { [exnodes] = (props.ex ? useAllNodes : useState.bind(null, []))(document.body); } catch (err) { };
    return (md(<Hook hook={useState}>{([presence, setPresence]) => <div ref={elem => {
        if(elem)elem.desktop = true
    }} onEventHalo={setHEvt}>
        <IoComponent>{socket => (<>
            {locale === 'he' && (<Hook hook={useAsync} hookArgs={[{ promiseFn: props => import('./hebe-desktop.js') }]}>{({ data }) => data && (Hebes => <Hebes></Hebes>)(data)}</Hook>)}
            {props.url && (<Window><DoubleIframe src={'/proxy/' + props.url} secondRef={pipe(w => w.contentWindow, w => {
                let stElem = w.document.querySelector('st') || w.document.createElement('div');
            })}></DoubleIframe></Window>)}
            <Hook hook={useRef}>{ref => (<>
                <Hook hook={useRef}>{iframeRef => (<>
                <DoubleIframe src={'/Langs'} secondRef={elem => elem && (() => {
                    elem.contentWindow.vk = ref;
                        elem.contentWindow.__host = elem;
                        iframeRef.current = elem;
                    })()}></DoubleIframe>
                    <Hook hook={useEventListener} hookArgs={['halo', evt => {
                        evt.target.contentWindow.dispatchEvent(evt);
                    }, iframeRef.current]}>{() => null}</Hook>
                </>)}</Hook>
                <Window title={'vk'}><div ref={ref}></div></Window>
            </>)}</Hook>
        <Hook hook={useEffect} hookArgs={[() => {
            let evt = hevt;
            setHEvt(hevt = null);
            if (!evt) return;
            hof && hof(evt);
        }, hevt]}>{() => null}</Hook>
        <Macro macro={caffieneMacro(CashElement)}></Macro>
            {oobeStage === OOBENULL || oobeStage === OOBEEXTERNAL ? (<><div ref={e => { if (props?.exTitleRef?.current && e) props.exTitleRef.current.appendChild(e) }}><span ref={titleWin}></span><span classList={['st-bar', props.ex || 'host']} ref={shost}>{shost.current && (<Hook hook={useAllNodes} hookArgs={[shost.current || document.createElement('span')]}>{([nodes]) => { setShNodes(nodes); return null }}</Hook>)}</span><button onClick={activate.bind(null, sid)}>{loc('Start')}</button><button onClick={activate.bind(null, mid)}>{'v'}</button></div>
            <Menu id={sid} title={loc('Start')} items={[]}></Menu>
                <Menu id={mid} title={loc('Global Menu')} items={[{ title: loc('Start'), onClick: activate.bind(null, sid) }, {
                    title: loc('All nodes'), onClick: () => setWindows(windows.concat([{
                        title: loc('All Nodes'),
                        render: () => (<Hook hook={useAllNodes} hookArgs={[document.body]}>{([nodes]) => (<Inspector obj={nodes} setObj={o => {
                            setWindows(windows.concat([{
                                title: 'Node Inspector', render: () => (<Hook hook={useState} hookArgs={[o]}>{([obj, setObj]) => (<Inspector obj={obj} setObj={setObj}></Inspector>)}</Hook>)
                            }]))
                        }}></Inspector>)}</Hook>)
                    }].concat(shNodes.length ? [{
                        title: loc('Pop Out Extension Nodes'),
                        onClick: wip(() => { setWindows(windows.concat([{ title: 'Ex Link Nodes', render: () => (<span append={$(shNodes)} jsim={CashElement}></span>) }])) }),
                    }] : []).concat([{
                        title: loc('Inspect Socket'),
                        onClick: () => setWindows(windows.concat([{
                            title: loc('Socket'),
                            render: () => (<Hook hook={useState} hookArgs={[socket]}>{([obj, setObj]) => (<Inspector obj={obj} setObj={setObj}></Inspector>)}</Hook>)
                    }]))
                }])))
            }]}></Menu></>) : (<Hook hook={useState} hookArgs={[[]]}>{([messageQ, setMessageQ]) => <Hook hook={useEventListener} hookArgs={['message', evt => { setMessageQ(messageQ.concat([evt])); evt.stopImmediatePropagation(); }]}>{() => (<Hook hook={useEffect} hookArgs={[() => () => messageQ.forEach(self.dispatchEvent.bind(self))]}>{() => oobestages[oobeStage]}</Hook>)}</Hook>}</Hook>)}
            {windows.map(rw)}
            <Window><div ref={rebodyRef}></div></Window>
            {props.exTabNodes && (<Window title={'body'}><div ref={e => { if(e)props.exTabNodes.forEach(e.appendChild.bind(e)); }}></div></Window>)}
        {sqk.data && (<Window title={'Squeak'}><Hook hook={useState} hookArgs={[sqk.data]}>{([obj, setObj]) => (<Inspector obj={obj} setObj={andThen(setObj)}></Inspector>)}</Hook></Window>)}
        {(props.StDebug) && (<Hook hook={useState} hookArgs={[]}>{([obj, setObj]) => (<><Inspector obj={obj} setObj={setObj}></Inspector><MultiHook hooks={[{ f: useState, args: [() => Symbol()] }, {
            f: useState,
            args: [],
        }, {f: useState,args: []}]}>{([s, setS],[evt,setEvt],[timeout,set_Timeout]) => (<Hook hook={useEventListener} hookArgs={['click', evt => {
            if (evt.___st_d_done) return;
            if (evt.button === 1) { activate(s, evt); setEvt(evt); evt.stopPropagation(); evt.stopImmediatePropagation(); evt.___st_d_done = true; set_Timeout(setTimeout(() => evt.target.dispatchEvent(evt),5000))};
            }]}>{() => <Menu onClick={() => {
                    clearTimeout(timeout);
                    set_Timeout(null);
                }} id={s} items={[{
                title: 'pass', onClick: () => {
                    evt.target.dispatchEvent(evt);
                }
            }]}></Menu>}</Hook>)}</MultiHook></>)}</Hook>)}
        {sugar && (<Hook hook={useState} hookArgs={[[]]}>{([dataQ, setDataQ]) => <SugarShare {...sugar} setPresence={setPresence} onNetworkDataReceived={v => setDataQ(dataQ.concat([v]))}>
            {ReactDOM.createPortal(<div>
                <button className={"toolbutton"} id={"activity-button"} title={"My Activity"}></button>
                <button className={"toolbutton"} title={"Inspect"} onClick={() => setWindows(windows.concat([{
                    title: 'Sugar Inspector',
                    render: () => (<Hook hook={useState} hookArgs={[dataQ]}>{([obj, setObj]) => <Inspector obj={obj} setObj={setObj}></Inspector>}</Hook>)
                }]))}>{loc('Inspect')}</button>
                <button className={"toolbutton pull-right"} id={"stop-button"} title={"Stop"}></button>
            </div>, document.querySelector('#main-toolbar'))}
        </SugarShare>}</Hook>)}
        {oobeStage === OOBEEXTERNAL ? (<Window title={loc('oobe')}><Hook hook={useState} hookArgs={[false]}>{([wprepStage, setWprepStage]) => wprepStage ? (<><DoubleIframe src={'/desktop'}></DoubleIframe><Hook hook={useState} hookArgs={[false]}>{([oobelock, setOOBELock]) => oobelock || (<><button onClick={() => { setWprepStage(false); self.dispatchEvent(new Event('stopoobe')); }}> {loc('Stop oobe')}</button><button onClick={() => setOOBELock(true)}>{loc('hide controls for oobe')}</button></>)}</Hook></>) : (<button onClick={() => { setWprepStage(true); self.dispatchEvent(new Event('startoobe')); }}>{loc('Start oobe')}</button>)}</Hook></Window>) : (<></>)}
    </>)}</IoComponent>
            </div>}</Hook>));
}