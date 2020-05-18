export default $ => ($sym => [old => $ ? (new_ => (type, props, ...children) => type === $sym ? new_(type, props, children) : old(type, Object.assign({}, props, typeof type === 'string' ? {
    ref: element => {                // merge existing ref prop
        if (props && props.ref) {
            if (typeof props.ref === 'function') {
                props.ref(element)
            } else if (typeof props.ref === 'object') {
                props.ref.current = element
            }
        }
        if (props && props.appends && props.jsim === $sym) {
            props.appends.forEach(a => {
                a.each(added => {
                    element.appendChild(added);
                })

            })

        }
        if (props && props.appendTo && props.jsim === $sym) {
            props.appendTo.first().each(a => a.appendChild(element))

        }
    }
} : {}), ...children))((type, props, children) => {
    let elem = props.elem;
    if (typeof elem === 'string') elem = $(elem);
    return $.fn[props.selector].call(elem, ...children)
}) : old, $sym])(Symbol())