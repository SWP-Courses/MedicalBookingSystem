import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Sidebar/sidebar.css";
import logo from "~/assets/images/avatar.jpg";
import SocketContext from "~/context/SocketProvider";
import { BsDot } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import onMessageNotification from "~/redux-action/messageNotificationAction";
import { AuthContext } from "~/context/authContext";
const Sidebar = () => {
  const { socket } = useContext(SocketContext);
  const { currentUser, logout } = useContext(AuthContext);
  // console.log(socket);
  const Notification = useSelector((state) => state.messageNotification);
  const dispath = useDispatch();
  const menuItem = [
    {
      path: "/staff",
      name: "Dashboard",
      icon: "ri-dashboard-line",
    },
    {
      path: "/staff/blog",
      name: "Blog",
      icon: "ri-file-line",
    },
    {
      path: "/staff/doctor",
      name: "Doctor",
      icon: "ri-nurse-line",
    },
    {
      path: "/staff/service",
      name: "Service",
      icon: "ri-service-line",
    },
    {
      path: "/staff/medicine",
      name: "Medicine",
      icon: "ri-capsule-line",
    },
    {
      path: "/staff/calendar",
      name: "Calendar",
      icon: "ri-calendar-2-line",
    },
  ];

  // {
  //   path: "/staff/chat",
  //     name: "Chat",
  //       icon: "ri-message-2-line"
  // },

  useEffect(() => {
    if (socket) {
      socket.on("message_recieve", () => {
        dispath(onMessageNotification(true));
      });
    }
  }, [socket]);

  return (
    <div className="sidebar ">
      <div className="sidebar__top d-flex justify-content-center align-items-center">
        <div className="sidebar__top__logo">
          <img src={logo}></img>
        </div>
        <p className="sidebar__top__text">
          {currentUser?.fullname || "Staff Name"}
        </p>
      </div>

      <div className="sidebar__middle d-flex justify-content-center flex-column">
        {currentUser.role === "consultant" && (
          <NavLink
            to="/staff/chat"
            key={"chat"}
            className="link"
            exact={true}
            activeclassname="active"
          >
            <i className={"ri-message-2-line"}></i>
            <div className="link_text">Chat</div>
          </NavLink>
        )}

        {currentUser.role === "cashier" && (
          <NavLink
            to="/staff/payment"
            key="payment"
            className="link"
            exact={true}
            activeclassname="active"
          >
            <i className={"ri-message-2-line"}></i>
            <div className="link_text">Payment</div>
          </NavLink>
        )}

        {currentUser.role !== "cashier" &&
          currentUser.role !== "consultant" &&
          menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              exact={true}
              activeclassname="active"
            >
              <i className={item.icon}></i>
              <div className="link_text">{item.name}</div>
              {Notification && item.name === "Chat" ? (
                <BsDot className="text-danger ml-auto fs-3" />
              ) : undefined}
            </NavLink>
          ))}
      </div>

      <button className="sidebar__bottom__btn btn " onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
