import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.scss";
import blankAvatar from "../../assets/images/blank_avatar.jpg";
import Options from "../options/Options";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";

// const user = "doctor";
const user = null;
// const user = "customer";
export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname);

  return (
    <div className="navbarContainer">
      <div className="navbarTopWrapper">
        <div className="navbarTop">
          <div className="navbar-left">
            <Link to="/" className="logo">
              Health Care System
            </Link>
          </div>
          <div className="navbar-center">
            <label htmlFor="meme" className="searchBar">
              <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              <input
                type="text"
                className="searchInput"
                placeholder="Tìm kiếm bài viết"
                id="meme"
              />
            </label>
          </div>
          <div className="navbar-right">
            {(currentUser?.role === "customer" || !currentUser) && (
              <Link
                to={{
                  pathname: "/booking",
                  state: {
                    from: pathname,
                  },
                }}
                className="navbar-button"
              >
                ĐĂNG KÝ KHÁM
              </Link>
            )}
            {currentUser?.role === "doctor" && (
              <button className="navbar-button">LỊCH KHÁM</button>
            )}
            <div className="devideLine"></div>
            {!currentUser && (
              <Link
                to="/login"
                state={{
                  from: pathname,
                }}
                className="navbar-button"
              >
                ĐĂNG NHẬP
              </Link>
            )}

            {currentUser && (
              <div className="avatarContainer">
                <Link to="customer">
                  <img src={blankAvatar} alt="" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Options />
    </div>
  );
}
