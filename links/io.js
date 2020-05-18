import io from 'socket.io-client';
import React, { useState } from 'react'
export default props => {
    let [socket, setSocket] = useState(() => { try { return io(location.hostname + ':' + location.port) } catch (err) { } });

    return props.children(socket);
}