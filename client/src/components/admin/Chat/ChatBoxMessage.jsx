import React, { useRef, useEffect } from 'react'
import Message from './Message'
import { v4 as uuidv4 } from 'uuid';

function ChatBoxMessage({ messageList }) {
    const messageContainerRef = useRef(null);

    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }, [messageList]);

    return (
        <div className='w-100 h-100 bg-light p-2 d-flex flex-column h-92 overflow-auto' ref={messageContainerRef}>
            {
                messageList ?
                    messageList.map(message => <Message key={uuidv4()} create_at={message.create_at} msg={message.message} sender={message.recipient_id} />)
                    : <h3>Select chat</h3>
            }
        </div>
    )
}

export default ChatBoxMessage