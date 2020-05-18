import swal from 'sweetalert';
export default f => async (...args) => { let v; if (await swal('WIP')) v = f(...args); if (v && v.then) v = await v; return v }