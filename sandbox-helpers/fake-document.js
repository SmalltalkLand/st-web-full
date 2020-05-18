export default () => {
    let v;
    let d = (v = document.createElement('div')).attachShadow({mode: 'closed'});
    d.createElement = document.createElement.bind(document);
    return d;
}