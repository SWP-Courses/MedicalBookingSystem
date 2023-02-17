import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
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
            <Link to="/" className="logo">
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
                <Link to="/booking" className="navbar-button">
                  ĐĂNG KÝ KHÁM
                </Link>
              )}
              {currentUser?.role === "doctor" && (
                <button className="navbar-button">LỊCH KHÁM</button>
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
                    <img src={`${API_IMAGE_URL}/image/${currentUser?.avatar?.filename}`} alt="" />
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
