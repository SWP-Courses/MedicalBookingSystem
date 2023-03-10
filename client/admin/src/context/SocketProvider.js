import socketio from "socket.io-client";
import React, { createContext, memo, useContext } from "react";
import { SOCKET_ROUTER } from "../api/Router";


const SocketContext = createContext();

export const SocketProvider = memo(({ children }) => {
    let socket;
    socket = socketio.connect(SOCKET_ROUTER, {
        query: {
            userId: 'admin'
        }
    });
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>

    )
})

export default SocketContext

