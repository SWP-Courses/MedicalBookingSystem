import React, { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem'

const ChatList = ({ users }) => {

  const [chatList, setChatList] = useState(users);

  const onDeleteChatById = (id) => {
    if (!id) return
    setChatList(list => list.filter(list => list._id !== id));
  }

  useEffect(() => {
    if (!users) return;
    setChatList(users);
  }, [users])

  if (!chatList) return (
    <p>Loading...</p>
  )

  return (
    <>
      <div className='w-100 d-flex justify-content-start align-items-center'>
        <input type="text" className="form-control" style={{ width: "25%", height: "37.34px" }} placeholder="Search by name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>

      <div className='mt-1 p-3'>
      {
        chatList
          ? chatList.map((user, index) => <ChatListItem onDeleteChatById={onDeleteChatById}
                                                      key={user.id}
                                                      user={user}/>)
          : undefined
      }
      </div>

    </>

  )
}

export default ChatList