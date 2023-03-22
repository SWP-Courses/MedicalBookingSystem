import React from 'react'
import "./style.css";

function Message({ msg, sender }) {
    return (
        <div className={sender !== 'admin' ? 'message-admin' : 'message-client'}>
            {msg}
        </div>
    )
}

export default Message 