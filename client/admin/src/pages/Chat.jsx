import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Converstation from '../components/Chat/Converstation';
import ChatContent from '../components/ChatContent/ChatContent'
import ChatList from '../components/ChatList/ChatList'

const Chat = () => {

  const [createChat, setCreateChat] = useState(false);
  const [chatContent, setChatContent] = useState(null);
  const userName = useRef();

  return (
    <div className='bg-light container w-100 h-100 d-flex gap-3'>
      <div className='bg-primary w-25 h-100 py-3 d-flex flex-column align-items-center px-3 gap-3'>
        <input type="text" class="form-control" placeholder="search" />
        <Converstation />
        <Converstation />
        <Converstation />
        <Converstation />
      </div>
      <div className='bg-primary w-75 h-100 position-relative '>
        <div className='d-flex p-2 position-absolute w-100 bottom-0'>
          <input type="text" class="form-control" placeholder="message" />
          <button className='btn'>
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat