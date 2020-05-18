export function JSToSqueak(Morphic){let f; return f = tree => {return {tree: tree,get pointers(){
return [2,2,{get pointers(){return tree.children.map(f)}}]
},set pointers(v){
tree.children = v[2].pointers.map(obj => obj.tree)

}}}}