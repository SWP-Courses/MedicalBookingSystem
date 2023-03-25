import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import SocketContext from '~/context/SocketProvider';
import Message from './Message'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import API_URL from '../../api/Router';
import { Link } from 'react-router-dom';

function ChatBox({ messageList, setMessageList }) {
    const message = useRef();
    const { socket } = useContext(SocketContext);
    const { userId } = useContext(SocketContext);
    const { currentUser } = useContext(SocketContext);
    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();
    const [boxChat, setBoxChat] = useState(true);

    const sendMessage = async () => {
        try {
            const data = {
                message: message.current.value,
                sender_id: userId,
                recipient_id: "admin",
                email: currentUser ? currentUser.email : email,
                fullname: currentUser ? currentUser.fullname : fullName,
                create_at: new Date()
            }
            console.log(data);
            setMessageList(message => [...message, data]);
            socket.emit("send_message", data)
            await axios.post(`${API_URL}/message`, data);
            message.current.value = "";
        } catch (error) {
            console.log(error);
        }
    }

    const onCofirmInfo = () => {
        if (fullName.length === 0 || email.length === 0) return;
        setBoxChat(false);
    }

    useEffect(() => {
        if (!currentUser) {
            setMessageList([])
        }
        if (currentUser) {
            setBoxChat(false);
        }
    }, [currentUser])



    return (
        <div className="chat-box">
            <div className='message-container'>
                {
                    (messageList) &&
                    messageList.map(message => <Message key={uuidv4()} create_at={message.created_at} msg={message.message} sender={message.recipient_id} />)
                }
                {
                    // <div className="mt-3 d-flex flex-column">
                    //     <div className="input-group mb-3">
                    //         <div className="input-group-prepend">
                    //             <span className="input-group-text" id="basic-addon1">Email</span>
                    //         </div>
                    //         <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                    //     </div>

                    //     <div className="input-group mb-3">
                    //         <div className="input-group-prepend">
                    //             <span className="input-group-text" id="basic-addon1">FullName</span>
                    //         </div>
                    //         <input type="text" onChange={(e) => setFullName(e.target.value)} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                    //     </div>
                    //     <button onClick={() => onCofirmInfo()} type="button" class="btn btn-primary m-auto">Confirm</button>
                    // </div>
                    !currentUser &&
                    <div className="mt-3 d-flex flex-column text-center h-100 align-items-center justify-content-center">
                        <p style={{ color: 'black' }}>Please login</p>
                        <Link to="/login">
                            <button type="button" class="btn btn-primary">Login</button>
                        </Link>
                    </div>
                }
            </div>
            <div className='d-flex p-2 position-absolute w-100  bottom-0'>
                {currentUser &&
                    <>
                        <input ref={message} type="text" className="form-control" placeholder="message" />
                        <button className='btn' onClick={() => sendMessage()}>
                            <AiOutlineSend />
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default ChatBox