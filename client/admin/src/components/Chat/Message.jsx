import React from 'react'

function Message({ msg, sender }) {
    return (
        <div className={sender !== 'admin' ? 'message-client' : 'message-admin'}>
            {msg}
        </div>
    )
}

export default Message 