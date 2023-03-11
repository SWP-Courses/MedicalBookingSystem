import {
  faBook,
  faCalendar,
  faCaretDown,
  faCalendarDays,
  faSearch,
  faRightToBracket,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BookIcon } from "~/assets/icons/book_service_icon.svg";
import "./navbar.scss";
import Options from "../options/Options";
import { AuthContext } from "~/context/authContext";
import API_URL, { API_IMAGE_URL } from "~/api/Router";
import logo from "~/assets/images/logo.jpg";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [searchResult, setSearchResult] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3, 4, 5]);
    }, 5000);
  }, []);

  //Functions
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbarContainer">
      <div className="navbarTopWrapper">
        <div className="navbarTop container-fluid row">
          <div className="navbar-left col-lg-3 col-sm-3">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>
          <div className="navbar-center col-lg-4 col-sm-9">
            <Tippy
              visible={false && searchResult.length > 0}
              interactive={true}
              render={(attrs) => (
                <div className="searchResult">
                  <div className="box" tabIndex="-1" {...attrs}>
                    <h6 className="titleSearch">
                      <FontAwesomeIcon icon={faBook} />
                      <span className="ml-3">Bài Viết</span>
                    </h6>
                  </div>
                </div>
              )}
            >
              <label htmlFor="meme" className="searchBar">
                <Tippy content="Tìm Kiếm">
                  <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                </Tippy>
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Tìm kiếm bài viết"
                  id="meme"
                />
              </label>
            </Tippy>
          </div>
          <div className="navbar-right col-lg-5">
            <div className="navItemContainer">
              {(currentUser?.role === "customer" || !currentUser) && (
                <>
                  <Link to="/booking" className="navbar-button">
                    <BookIcon />
                    ĐĂNG KÝ KHÁM
                  </Link>
                </>
              )}

              {currentUser?.role === "doctor" && (
                <>
                  <Link
                    to="/doctor"
                    state={{ redirect: "doctorSchedule" }}
                    className="navbar-button"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ color: "var(--secondary-color)" }}
                    />
                    LỊCH KHÁM
                  </Link>
                </>
              )}
            </div>
            <div className="devideLine"></div>
            <div className="navItemContainer">
              {!currentUser && (
                <>
                  <FontAwesomeIcon icon={faRightToBracket} style={{ fontSize: '18px', color: "var(--secondary-color)" }} />
                  <Link to="/login" className="navbar-button">
                    <span>ĐĂNG NHẬP</span>
                  </Link>
                </>
              )}
              {currentUser && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle className="toggle-dropdown">
                      <div
                        className="user-border"
                        // onClick={() => setShowDropDown(true)}
                      >
                        <img
                          src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`}
                          alt=""
                          className="avatar__Container"
                        />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="drop-down__custome">
                        <div className="user-profile">
                          <Link
                            className="drop-down__item"
                            to={"/" + currentUser.role}
                          >
                            Thông tin cá nhân
                          </Link>
                        </div>
                        <Dropdown.Divider style={{margin: '0px'}} />
                        <div className="logout">
                          <span className="drop-down__item" onClick={handleLogout}>
                            Đăng xuất
                          </span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )
              }
            </div>
          </div>
        </div>
      </div>
      <Options />
    </div>
  );
}
