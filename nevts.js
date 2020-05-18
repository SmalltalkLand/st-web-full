/**
 * Convert a string from camelCase to kebab-case
 * @param {string} string - The base string (ostensibly camelCase)
 * @return { string } - A kebab-case string
 */
const toKebabCase = string => string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

/** @type {Symbol} - Used to save reference to active listeners */
const listeners = Symbol('jsx-native-events/event-listeners')

const eventPattern = /^onEvent/

export default function jsx(old) {
    return (type, props, ...children) => {
        const newProps = { ...props }
        if (typeof type === 'string') {
            newProps.ref = (elem) => {
                // merge existing ref prop
                if (props && props.ref) {
                    if (typeof props.ref === 'function') {
                        props.ref(elem)
                    } else if (typeof props.ref === 'object') {
                        props.ref.current = elem
                    }
                }

                if (elem) {
                    if (props) {
                        const keys = Object.keys(props)
                        /** Get all keys that have the `onEvent` prefix */
                        keys
                            .filter(key => key.match(eventPattern))
                            .map(key =>
                                ({
                                    key,
                                    eventName: toKebabCase(
                                        key.replace('onEvent', '')
                                    ).replace('-', '')
                                })
                            )
                            .map(({ eventName, key }) => {
                                /** Add the listeners Map if not present */
                                if (!elem[listeners]) {
                                    elem[listeners] = new Map()
                                }

                                /** If the listener hasn't be attached, attach it */
                                if (!elem[listeners].has(eventName)) {
                                    elem.addEventListener(eventName, props[key])
                                    /** Save a reference to avoid listening to the same value twice */
                                    elem[listeners].set(eventName, props[key])
                                }
                            })
                    }
                }
            }
        }

        return old.apply(null, [type, newProps, ...children])
    }
}