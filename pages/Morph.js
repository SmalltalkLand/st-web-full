import React, {useEffect} from 'react'
import FuncFromClass from '../components.generic/ClsToFunc.js'
import ClsToFunc_ from '../components.generic/ClsToFunc.js'
import {  identity, props } from 'ramda';
import ad from '../ad.js'
let ClsToFunc = c => Object.assign(ClsToFunc_(c),{__orig: c})
let ClsMorph;
export let Morph = ClsToFunc(ClsMorph = class Morph{
render(){

    return (<>{(this.props.wrap || identity)(<>{this.state.children.map(c => ad(new c.constructor(),c).render())}</>)}</>)
}

});
let ClsWorld;
export let WorldMorph = ClsToFunc(ClsWorld = class extends ClsMorph{


})
let ClsSandbox;
export let Sandbox = ClsToFunc(ClsSandbox = class extends ClsMorph{

    render(){

        return (<WorldMorph></WorldMorph>)
    }
})