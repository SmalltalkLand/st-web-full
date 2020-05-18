import {src,dest,series,parallel} from 'gulp'
import {pipe, props} from 'ramda'
import * as webpack from 'webpack-stream'
import * as config from '../webpack.config.js'
import {Stream} from 'stream'
import React from 'react'
let {createElement} = React;
let ce = createElement;
let optsF = f => (opts,...args) => Object.assign({},opts,f(...args));
let reactGulp = rf => {let f;return (f = e => (v => v && (v instanceof Stream ? v : f(v)))(e.type(e.props,{src,dest,series,parallel})))(rf((props,extra) => extra[props.func](...props.args)))};
export default pipe(optsF(() => ({webpack: pipe(optsF(() => ({})),webpack)})),opts => opts && (({dev,root,dest_,webpack}) => src(root).pipe(webpack(config)).pipe(dest(dest_)))(opts))