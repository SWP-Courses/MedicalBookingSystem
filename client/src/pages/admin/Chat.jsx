import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import Converstation from '~/components/admin/Chat/Converstation';
import "./App.css"
import SocketContext from '~/context/SocketProvider';
import { v4 as uuidv4 } from 'uuid';
import ROUTER from '~/api/adminRouter';
import axios from "axios";
import { useDispatch } from 'react-redux';
import onMessageNotification from '~/redux-action/messageNotificationAction';
import ChatBoxMessage from '~/components/admin/Chat/ChatBoxMessage';

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const message = useRef();
  const [messageList, setMessageList] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [conversationFilter, setConversationFilter] = useState([]);
  const [conversationID, setConversationID] = useState();
  const [newConverstation, setNewConverstation] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [NewMessageUserId, setNewMessageUserId] = useState([]);
  const dispath = useDispatch();

  const addNewMessageUserId = (user_id) => {
    const isNewMessage = NewMessageUserId.includes(user_id);
    if (!isNewMessage) {
      setNewMessageUserId(pre => [...pre, user_id]);
    }
  }

  const removeMessageUserId = async (user_id) => {
    setNewMessageUserId(pre => pre.filter(id => id !== user_id));
    try {
      const data = {
        "role": "admin",
        "sender_id": user_id,
      }
      await axios.post(`${ROUTER}/api/message/status`, data);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = {
      message: message.current.value,
      sender_id: "admin",
      recipient_id: conversationID,
      create_at: new Date()
    }
    setMessageList(message => [...message, data]);
    message.current.value = "";
    socket.emit("send_message", data)
    await axios.post(`${ROUTER}/api/message`, data);
  }

  const onSellectConversation = useCallback(
    async (recipientId) => {
      try {
        setConversationID(recipientId);
        const data = {
          sender_id: recipientId,
          recipient_id: "admin"
        }
        const result = await axios.post(`${ROUTER}/api/message/all`, data);
        setMessageList(result.data.message);
      } catch (error) {
        console.log(error);
      }
    },
    []
  )


  const filterConversation = (search) => {
    if (search.length == 0) {
      setConversationFilter(conversation)
      return;
    }
    const conversationFilter = conversation.filter(item => item.fullname.includes(search));
    console.log(conversationFilter);
    setConversationFilter(conversationFilter)
  }

  useEffect(() => {
    const getConversation = async () => {
      try {
        const result = await axios.get(`${ROUTER}/api/message/conversation`);
        setConversation(result.data);
        setConversationFilter(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConversation();
  }, [newConverstation])

  useEffect(() => {
    if (socket) {
      socket.on("message_recieve", newMessage => {
        addNewMessageUserId(newMessage.sender_id);
        setNewMessage(newMessage);
        console.log(newMessage)
      });
    }
  }, [socket]);

  useEffect(() => {
    if (!newMessage) return;

    const isNewConversation = conversation.every(item => item.sender_id !== newMessage.sender_id);

    if (isNewConversation) {
      setNewConverstation(!newConverstation);
    }

    if (!conversationID) return;

    if (conversationID !== newMessage.sender_id) return;

    if (conversationID == newMessage.sender_id) {
      setMessageList(message => [...message, newMessage]);
    }
  }, [newMessage])

  useEffect(() => {
    const getConversationHaveNewMessage = async () => {
      try {
        const result = await axios.get(`${ROUTER}/api/message/new-message`);
        setNewMessageUserId(result.data)
      } catch (error) {
        console.log(error);
      }
    }
    dispath(onMessageNotification(false));
    getConversationHaveNewMessage();
  }, [])


  return (
    <div className='bg-white container w-100 h-100 d-flex gap-3'>
      <div className='bg-light w-25 h-100 py-3 d-flex flex-column align-items-center px-3 gap-3'>
        <input type="text" onChange={(e) => filterConversation(e.target.value)} className="form-control" placeholder="search" />

        {
          conversationFilter.map(item => <Converstation removeMessageUserId={removeMessageUserId} NewMessageUserId={NewMessageUserId} conversationID={conversationID} onClick={() => onSellectConversation(item.sender_id)} key={uuidv4()} data={item} />)
        }

      </div>
      <div className=' w-75 d-flex flex-column vh-100'>

        {
          conversationID ?
            <>
              <ChatBoxMessage messageList={messageList} />
              <form className='d-flex p-2 w-100 bottom-0 bg-light h-8'>
                <input type="text" ref={message} className="form-control" placeholder="message" />
                <button className='btn' onClick={(e) => sendMessage(e)}>
                  <AiOutlineSend />
                </button>
              </form>
            </>
            :
            <div className="w-100 h-100 justify-content-center align-items-center d-flex">
              <h4 className=''>Select Converstation</h4>
            </div>
        }

      </div>
    </div>
  )
}

export default Chat