import ReactDOM from 'react-dom'
import React from 'react'
export default CashElement => (ce, props, children) => { try { return CashElement && ce(React.Fragment, {}, ce('div', { appendTo: (b => ce(CashElement, { elem: ce(CashElement, { elem: ce(CashElement, { elem: b, selector: 'find' }, '#dashboard'), selector: 'add' }, b), selector: 'first' }))(ce(CashElement, { elem: 'body', selector: 'first' })), jsim: CashElement }), document.querySelector('#sqSpinner') && ReactDOM.createPortal(ce('div', { id: 'sqSpinner' }, ce('div')), document.querySelector('#sqSpinner'))) } catch (err) { }}