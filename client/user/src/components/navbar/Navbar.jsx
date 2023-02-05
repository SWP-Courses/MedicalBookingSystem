import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.scss";
import blankAvatar from "../../assets/images/blank_avatar.jpg";
import Options from "../options/Options";
import { Link } from "react-router-dom";

const user = "customer";
export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="navbarTop">
        <div className="navbar-left">
          <span className="logo">Health Care System</span>
        </div>
        <div className="navbar-center">
          <div className="searchBar">
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="Tìm kiếm bài viết"
            />
          </div>
        </div>
        <div className="navbar-right">
          {(user === "customer" || !user) && (
            <Link to="/info/Booking" className="navbar-button">
              ĐĂNG KÝ KHÁM
            </Link>
          )}
          {user === "doctor" && (
            <button className="navbar-button">LỊCH KHÁM</button>
          )}
          <div className="devideLine"></div>
          {!user && <button className="navbar-button">ĐĂNG NHẬP</button>}
          {user && (
            <div className="avatarContainer">
              <img src={blankAvatar} alt="" />
            </div>
          )}
        </div>
      </div>
      <Options />
    </div>
  );
}
