import * as Croquet from "@croquet/croquet"
import TestRenderer from 'react-test-renderer';
export function CRQReactView(React,c,props){return class MyView extends Croquet.View {
    constructor(model) {
        super(model);
        this._cv = <c {...props} crq_model = {model}></c>
        this._m = model;
    }

    update(time) {
        this._cv = <c {...props} crq_model = {this._m}></c>
    }
}}
export function CRQReactModel(React,hook){return class MyModel extends Croquet.Model{
constructor(){
    let C = () => {
        let s = React.useState();
        hook(s)
        React.useEffect(() => {Object.defineProperty(this,'state',{get: () => s[0],set: s[1]})},[s[0]]);
    return null};
this._r = TestRenderer.create(<C></C>)
}

}}
export function CRQSyncSqueak(vm){

    return class extends Croquet.Model{
get svm(){return vm}

    }
}
export function useModelView(React,m,v){
React.useEffect(() => {Croquet.startSession(`st: ${Math.random()}`, m, v, {}).then(session => {

});})

}