import "./customer.scss";

import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import { API_IMAGE_URL } from "~/api/Router";
import { Link, Outlet, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const routers = [
  { path: "/customer/profile", title: "Thông tin cá nhân" },
  { path: "/customer/upcoming-booking", title: "Lịch khám đã đặt" },
  { path: "/customer/history", title: "Lịch sử khám" },
  { path: "/customer/saved-blog", title: "Bài viết yêu thích" },
];

export default function CustomerLayout() {
  const { pathname } = useLocation();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="customer">
      <div className="userSidebar">
        <div className="userInfo">
          {currentUser?.avatar?.bucketName ? (
            <img
              src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`}
              alt=""
            />
          ) : (
            <img src={currentUser?.avatar?.filename} alt="" />
          )}

          <span className="userName">{currentUser?.fullname}</span>
        </div>
        <div className="profileActions">
          {routers?.map((route) => (
            <Link
              key={uuidv4()}
              to={route.path}
              className={`action ${route.path === pathname && "active"}`}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="userContent">
        <Outlet />
      </div>
    </div>
  );
}
