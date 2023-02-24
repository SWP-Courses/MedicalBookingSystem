import { faBook, faCalendar, faCalendarDays, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.scss";
import blankAvatar from "../../assets/images/blank_avatar.jpg";
import Options from "../options/Options";
import { Link, useLocation } from "react-router-dom";
import logo from '~/assets/images/logo.jpg'

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "~/context/authContext";

import { Dropdown } from "react-bootstrap";
import API_URL, { API_IMAGE_URL } from "~/api/Router";

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; 


export default function Navbar() {

  const { currentUser, logout } = useContext(AuthContext);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1,2,3,4,5])
    }, 5000)
  }, [])

  //Functions 
  const handleLogout =() => {
    logout()
  }

  return (
    <div className="navbarContainer">
      <div className="navbarTopWrapper">
        <div className="navbarTop container-fluid row">
          <div className="navbar-left col-lg-3 col-sm-3">
            <Link to="/">
              <img
                src={logo}
                alt='logo'
                className="logo"
              />
            </Link>
          </div>
          <div className="navbar-center col-lg-4 col-sm-9">
            <Tippy
              visible={false && searchResult.length > 0}
              interactive={true}
              render={attrs => (
                <div className="searchResult">
                  <div className="box" tabIndex="-1" {...attrs}>
                    <h6 className="titleSearch">
                    <FontAwesomeIcon icon={faBook} />
                      <span className="ml-3">
                        Bài Viết 
                      </span>
                    </h6>
                  </div>
                </div>
              )}
            >
              <label htmlFor="meme" className="searchBar">
                <Tippy content='Tìm Kiếm'>
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#337AB7" width="24" height="22" viewBox="0 0 24 22">
                    <g fill="none" fill-rule="#337AB7" >
                                            <g transform="translate(-1436 -112) translate(0 50) translate(0 33) translate(1436 29)">
                                                <rect width="22.6" height="19.6" x=".7" y="1.7" stroke="#292940" stroke-width="1.4" rx="4"/>
                                                <path fill="#337AB7" d="M0 6H24V7.6H0z"/>
                                                <g fill="#337AB7" transform="translate(5)">
                                                    <rect width="1.6" height="3" rx=".8"/>
                                                    <rect width="1.6" height="3" x="12" rx=".8"/>
                                                </g>
                                                <rect width="1.6" height="3" x="11" fill="#337AB7" rx=".8"/>
                                                <g fill="#337AB7">
                                                    <path d="M4 0H5.6V8H4z" transform="translate(7.4 10)"/>
                                                    <path d="M4 0L5.6 0 5.6 8 4 8z" transform="translate(7.4 10) rotate(90 4.8 4)"/>
                                                </g>
                                            </g>
                    </g>
                  </svg>
                  <Link to="/booking" className="navbar-button">
                    ĐĂNG KÝ KHÁM
                  </Link>
                </>
              )}
              {currentUser?.role === "doctor" && (
                <>
                  <FontAwesomeIcon icon={faCalendarDays} style={{color: 'var(--secondary-color)'}}/>
                  <button className="navbar-button">LỊCH KHÁM</button>
                </>
              )}
            </div>
            <div className="devideLine"></div>
            <div className="navItemContainer">
              {!currentUser && (
                <Link to="/login" className="navbar-button">
                  ĐĂNG NHẬP
                </Link>
              )}

              {currentUser && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="avatarContainer"
                    as="div"
                  >
                    <img src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`} alt="" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as="div">
                      <Link
                        className="dropdown-item"
                        to={"/" + currentUser.role}
                      >
                        Thông tin cá nhân
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="div">
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
      <Options />
    </div>
  );
}
