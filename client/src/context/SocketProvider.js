import socketio from "socket.io-client";
import React, { createContext, memo, useContext } from "react";
import { SOCKET_ROUTER } from "~/api/Router";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "./authContext";

const SocketContext = createContext();

export const SocketProvider = memo(({ children, userId }) => {
    let socket;
    const { currentUser } = useContext(AuthContext);
    userId = currentUser ? currentUser._id : uuidv4();
    socket = socketio.connect(SOCKET_ROUTER, {
        query: {
            userId: userId
        }
    });
    return (
        <SocketContext.Provider value={{ socket, userId, currentUser }}>
            {children}
        </SocketContext.Provider>

    )
})

export default SocketContext

