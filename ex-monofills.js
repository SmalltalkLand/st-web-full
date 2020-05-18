export default ex => {
	if (!self.chrome && !self.browser) return;
Function = new Proxy(Function,{construct: (o,args,t) => args.filter(a => typeof a === 'string') ? new ex.Function(...args.slice(null,args.length-1),`with(new Proxy({},{has: (o,k) => true}))${args[args.length]}`) : Reflect.construct(o,args,t)})
} 