import React, {useEffect} from 'react'
import FuncFromClass from '../components.generic/ClsToFunc.js'
import ClsToFunc_ from '../components.generic/ClsToFunc.js'
import {  identity, props } from 'ramda';
import ad from '../ad.js'
import Dism from '../Dism.js'
import MyDism from './MyDism.js'
import bp from '../bp.js'
import Window from '../components.dom/Window.js'
import * as Morphs from '../morphs.js'
let dism; 
let ClsToFunc = c => Object.assign(ClsToFunc_(c),{__orig: c})
let ClsMorph;
export let Morph = ClsToFunc(ClsMorph = class Morph{
    get children(){return this.state.children}
set children(v){this.state.children = v}
render(){
if(this.props. __sInjected)this.stste = this.props. __sInjected;
    return (<>{(this.props.wrap || identity)(<>{(this.state).children.map(c => ad((cns => cns.__orig ? new c.__orig() : new c())(c.constructor()),c,{parent: this}).render())}</>)}</>)
}

});
let ClsWorld;
export let WorldMorph = ClsToFunc(ClsWorld = class extends ClsMorph{
    get hand(){return {}}
    constructor(elem){if(elem)ReactDOM.render(<WorldMorph __sInjected = {this}></WorldMorph>,elem)}
render(){return <div onMouseEnter={() => this.state.e = true} onMouseExit = {() => this.stste.e = false}>{dism(super.render())}</div>}

})
let ClsSandbox;
export let Sandbox = ClsToFunc(ClsSandbox = class extends ClsMorph{

    render(){

        return (<WorldMorph __sInjected = {this.state}></WorldMorph>)
    }
})
let ClsMWindow;
export let MWindow = ClsToFunc(ClsMWindow = class extends ClsMorph{
render(){return (<Window>{super.render()}</Window>)}

});
let ClsEmbed;
export let Embed = ClsToFunc(ClsEmbed = class extends ClsMorph{
render(){let Self = this;return (<Self.state.tag ref = {elem => {this.state.world = new this.state.worldCls(elem)}}></Self.state.tag>)}

})
export let MClss = new Proxy(Morphs,{get: (o,k) => o[k]({Morph: ClsMorph,Window: MWindow,Sandbox: ClsSandbox,Embed: ClsEmbed})})
try{self; dism = Dism(bp(MyDism,{morphic: true,Morph,WorldMorph,Sandbox}))}catch(err){dism = e => e};