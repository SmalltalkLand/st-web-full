let ac;
try{ac = AudioContext}catch(err){};
export default ac && new ac();