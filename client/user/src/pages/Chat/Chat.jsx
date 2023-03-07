import React, { useContext, useEffect, useState } from 'react';
import "./style.css";
import { AiOutlineMessage } from "react-icons/ai";
import ChatBox from './ChatBox';
import SocketContext from '~/context/SocketProvider';
import axios from 'axios';
import API_URL from "../../api/Router";
import { id } from 'date-fns/locale';
import { BsDot } from "react-icons/bs";

function Chat() {
    const [isOpenChatBox, setisOpenChatBox] = useState(false);
    const { socket, currentUser } = useContext(SocketContext);
    const [messageList, setMessageList] = useState([]);
    const [notification, setNotification] = useState(false);

    const getAllMessage = async (currentUser) => {
        const data = {
            sender_id: currentUser._id,
            recipient_id: "admin"
        }
        const result = await axios.post(`${API_URL}/message/all`, data);
        setMessageList(result.data.message);
    }

    const onOpenChatBox = () => {
        setisOpenChatBox(!isOpenChatBox);
        setNotification(false);
    }

    useEffect(() => {
        if (currentUser) {
            getAllMessage(currentUser);
        }
    }, [currentUser])


    useEffect(() => {
        if (socket) {
            socket.on("message_recieve", newMessage => {
                setMessageList(message => [...message, newMessage]);
                setNotification(true);
            });
        }
    }, [socket])

    return (
        <div className="chat-container">
            {isOpenChatBox && <ChatBox messageList={messageList} setMessageList={setMessageList} />}
            <div className="chat-icon" onClick={() => onOpenChatBox()}>
                {notification && <BsDot className='position-absolute top-0 end-0 fs-1 text-danger' />}
                <AiOutlineMessage />

            </div>
        </div>
    )
}

export default Chat