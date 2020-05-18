export function MyMorph({Morph}){
return class extends Morph{}

}
export function TextMorph({Morph, TextMorph}){return TextMorph || (class extends Morph{render(){return this.text}})}
export function ObjectsTool({Morph, TextMorph, WorldMorph, Sandbox}){let objects = {}; return class extends Morph{
constructor(){super(); let s; this.children = [s = new Sandbox()]; }

}}