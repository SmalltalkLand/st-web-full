import React, { useState, useRef } from 'react'
import Window from '../components.dom/Window.js'
import DynProxy from '../components.dom/DynProxy.js'
import { Menu, activate } from '../components.dom/Menu.js'
import Hook from '../components.generic/Hook.js'
import MultiHook from '../components.generic/MultiHook.js'
import useLoc from '../loc/use.js'
import useEventListener from '@use-it/event-listener'
import SugarShare from '../components.Sugar/Share.js'
import Inspector from '../pages/Inspect.js'
import ReactDOM from 'react-dom'
import { usePrevious } from '../uses.js'
import {useBetterMutationObserver} from '../umo.js'
export function useHaloKit(buttonCheck) {
    let hh = evt => {
        if (!buttonCheck(evt)) return;
        let evtN = Object.assign(new Event('halo'), { haloRender: evt => { }, haloData: {} });
        evt.target.dispatchEvent(evtN);
        evtN.haloRender(evt);
    }
    useBetterMutationObserver(document.body, ml => {
        ml.forEach(m => {
            m.addedNodes?.forEach(n => n.addEventListener('click', hh));
            m.removedNodes?.forEach(n => n.removeEventListener('click', hh));

        })

    })

}