import React, {useState, useEffect, useMemo} from 'react'
export default klass => props => {
let [state,setState] = useState();
let obj = useMemo(() => (o => {return o})(new klass(props)));
Object.defineProperty(obj,'state',{get: () => state,set: setState});
obj.props = props;
return obj.render() 
}