import React, { useEffect, useRef, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import ChatContent from '../components/ChatContent/ChatContent'
import ChatList from '../components/ChatList/ChatList'

const Chat = () => {
  const userList = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      id: 1,
      name: "Tim Hover",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      id: 2,
      name: "Hamaad Dejesus",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
      id: 3,
      name: "Eleni Hobbs",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
      id: 4,
      name: "Elsa Black",
    },
    {
      image:
        "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
      id: 5,
      name: "Kayley Mellor",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
      id: 6,
      name: "Allen Woodley",
    },
  ];

  const [createChat, setCreateChat] = useState(false);
  const [chatContent, setChatContent] = useState(null);
  const userName = useRef();

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row'>
        {/* Header */}
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          {
            createChat 
              ? <button onClick={() => setCreateChat(false)} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button> 
              : <h4 className='m-0'>CHAT</h4>
          }         
        </div>
        
        {
          createChat 
            ? <ChatContent chatContent={chatContent}
                            userName={userName}/> 
            : <ChatList users={userList}/>
        }

      </div>
    </div>
  )
}

export default Chat