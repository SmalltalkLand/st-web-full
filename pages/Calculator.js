import Calculator from './react-calculator/src/containers/Calculator/index.js'
import React, {useState,useMemo} from 'react'
import ReactDOM from 'react-dom'
import Chat from './Chat.js'
const {createPortal} = ReactDOM;
const allEqual = arr => arr.every( v => v === arr[0] )
function letter(v,l,[string,setString]){
    setString(`${string}${String.fromCodePoint(65 + l + (3 * Number(v)))}`)
    
        }
function fletter(o,[string,setString],lang){
if(lang === 'en')return;

}
export default props => {
    let [mode,setMode] = useState('normal');
    let [tpAmount,setTPAmount] = useState(0);
    let [tpt,setTpt] = useState(null);
    let [tpn,setTPN] = useState();
    setTPN = pipe(v => tpn = v,setTPN);
    let embed = useMemo(() => Symbol());
    let [notes,setNotes] = useState();
    function type(value,[string,setString]){
        tpt && (clearTimeout(tpt));
tpAmount++;
setTpt(setTimeout(() => {setTPAmount(0); let o = tpn; setTPN([]);if(allEqual(o) && props.lang === 'en'){let v = o[0]; let l = o.length; letter(v,l,[string,setString])}else{fletter(o,[string,setString],props.lang)}},300));
setTPN(tpm.concat([value]));
    }
function acceptAction(value,[result,setResult],third){
    if(value === 'a'){setResult(`#Apps (Num: ${result})
    1) Notepad
        #>`); setMode('apps-menu');return true}
    if(mode === 'notepad'){

setResult(notes);
type(value,[notes,setNotes]);
return true;
    }
    if(mode === 'apps-menu'){
if(value.toString() === 1 && third === embed){setMode('notepad')}
return true
    }
return;

}
function display(result_,prev){
    let result = result_;
    if(result[result.length - 1] === '>' && result[result.length - 2]=== '#'){let digit = result[result.length]; result = result.substring(0,result.length - 1);acceptAction(digit,[result,v => result = v],embed) }
let pem = props?.display ? props.display(result,prev) : prev(result);
pem = (o => <>{p}</>)(pem);
if(mode === 'cheat-chat' && result === props.password && !props.embed){return (<>{pem}{(Chat => <Chat></Chat>)(props.Chat || Chat)}</>)}
return pem
}
return props.embed ? null : (<><Calculator {...props} display = {display} evals = {[f => s => (v => v)(f(s))]}acceptAction = {acceptAction}></Calculator>{mode === 'cheat' && createPortal(<div></div>,props.cheatRef.current)}</>)
}