import React, { useState } from 'react'
import './chatlistitem.css'
import { toast } from 'react-toastify';
import toastOption from '../../config/toast';
import ConfirmDeletePopup from '../UI/ConfirmDeletePopup';


const ChatListItem = ({ onDeleteChatById, user }) => {
    const [deletePopup, setDeletePopup] = useState(false);

    const onConfirmDelete = async () => {
        toast.success("Success!", toastOption);
        onDeleteChatById(user._id);
        setDeletePopup(false)
    }

    const onCancelDelete = () => {
        setDeletePopup(false)
    }

    return (
        <div className='chatlist__item container d-flex m-3 p-0'>
            <div className='d-flex align-items-center' style={{marginLeft:"50px"}}>
                <div className='avatar m-3'>
                    <img src={user.image} alt="avatar_img" />
                </div>

                <div className="userMeta">
                    <p>{user.name}</p>
                    <span className="activeTime">32 mins ago</span>
                </div>
            </div>

            <button className='delete__btn ml-auto bg-light'>Remove</button>
        </div>
    )
}

export default ChatListItem