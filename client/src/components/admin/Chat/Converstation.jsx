import React, { memo, useContext, useEffect, useState } from 'react'
// import SocketContext from '../../context/SocketProvider';
import { BsDot } from "react-icons/bs";

function Converstation({ data, onClick, conversationID, NewMessageUserId, removeMessageUserId }) {
    const [notification, setNotification] = useState();

    useEffect(() => {
        if (NewMessageUserId.length && data) {
            if (NewMessageUserId.includes(data.sender_id)) {
                setNotification(true);
            }
        }
    }, [NewMessageUserId])


    const onSellectConversion = () => {
        onClick();
        setNotification(false);
        removeMessageUserId(data.sender_id)
    }

    return (
        <button className={conversationID == data.sender_id ? `btn w-100 bg-secondary text-white p-2 rounded  position-relative` : `btn w-100 bg-light p-2 rounded position-relative`}
            onClick={() => onSellectConversion()}
        >
            <h6 className="m-0 text-start">{data?.fullname}</h6>
            <p className="m-0 text-start">{data?.email}</p>
            {
                notification ? <BsDot className='position-absolute top-0 end-0 fs-1 text-danger' /> : undefined
            }
        </button>
    )
}

export default memo(Converstation)