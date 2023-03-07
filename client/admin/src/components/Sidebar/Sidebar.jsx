import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../Sidebar/sidebar.css'
import logo from '../../assets/images/avatar.jpg'
import SocketContext from '../../context/SocketProvider'
import { BsDot } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import onMessageNotification from '../../redux-action/messageNotificationAction'
const Sidebar = () => {
  const socket = useContext(SocketContext);
  const Notification = useSelector(state => state.messageNotification);
  const dispath = useDispatch();
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: "ri-dashboard-line"
    },
    {
      path: "/blog",
      name: "Blog",
      icon: "ri-file-line"
    },
    {
      path: "/doctor",
      name: "Doctor",
      icon: "ri-nurse-line"
    },
    {
      path: "/service",
      name: "Service",
      icon: "ri-service-line"
    },
    {
      path: "/medicine",
      name: "Medicine",
      icon: "ri-capsule-line"
    },
    {
      path: "/calendar",
      name: "Calendar",
      icon: "ri-calendar-2-line"
    },
    {
      path: "/chat",
      name: "Chat",
      icon: "ri-message-2-line"
    },
  ]

  useEffect(() => {
    if (socket) {
      socket.on("message_recieve", () => {
        dispath(onMessageNotification(true));
      });
    }
  }, [socket]);

  return (
    <div className='sidebar '>
      <div className='sidebar__top d-flex justify-content-center align-items-center'>
        <div className='sidebar__top__logo'>
          <img src={logo}></img>
        </div>
        <p className='sidebar__top__text'>Name admin</p>
      </div>

      <div className='sidebar__middle d-flex justify-content-center flex-column'>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeclassname='active'>
              <i className={item.icon}></i>
              <div className='link_text'>{item.name}</div>
              {Notification && item.name === "Chat" ? <BsDot className='text-danger ml-auto fs-3' /> : undefined}
            </NavLink>
          ))
        }
      </div>

      <button className='sidebar__bottom__btn btn '>
        Log out
      </button>
    </div>
  )
}

export default Sidebar