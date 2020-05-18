let files = new Proxy({});
export function readFile(f,c){return files[f].then(v => c(null,v.content))}
export function writeFile(f,v,c){return files[f].then(f => f.setContent(v).then(c.bind(null,null )))}