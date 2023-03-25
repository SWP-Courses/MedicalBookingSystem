import React from 'react'
import "./style.css";
import dayjs from 'dayjs';

function Message({ msg, sender, create_at }) {
    return (
        <div className={sender !== 'admin' ? 'message-admin message' : 'message-client message'}>
            <h6>{msg}</h6>
            <p>{dayjs(create_at).format('HH:mm:ss DD/MM/YYYY ')}</p>
        </div>
    )
}

export default Message 