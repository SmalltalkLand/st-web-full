export let Macro = Symbol();
export default old => (type, props, ...children) => type === Macro ? props.macro(old,props,children) : old(type, props, ...children)