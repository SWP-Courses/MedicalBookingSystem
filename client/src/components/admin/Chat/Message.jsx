import React from 'react'
import dayjs from 'dayjs';
import "./style.css";

function Message({ msg, sender, create_at }) {
    return (
        <div className={sender !== 'admin' ? 'message-client message' : 'message-admin message'}>
            <h6>{msg}</h6>
            <p>{dayjs(create_at).format('DD/MM/YYYY')}</p>
        </div>
    )
}

export default Message 