import {
  faBook,
  faCalendar,
  faCaretDown,
  faCalendarDays,
  faSearch,
  faRightToBracket,
  faBriefcaseMedical,
  faSliders,
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
import { fontSize } from "@mui/system";


export default function Navbar() {
  const {pathname} = useLocation();
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
      <div className="navbarTop container-xxl">
        <div className="row align-items-center">
          <div className="col-3 col-md-3 col-lg-3 navbar-left text-center" onClick={() => navigate('/')}>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="col-lg-4 d-none d-md-none d-lg-block navbar-center">
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
              <label htmlFor="meme" className="searchBar  rounded-pill">
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
          <div className="col-6 col-md-6 justify-content-md-center justify-content-lg col-lg-4 navbar-right">
            <div className="navItemContainer d-none d-md-block d-lg-block">
              {(currentUser?.role === "customer" || !currentUser) && (
                <>
                  <Link to="/booking" className="navbar-button">
                    <FontAwesomeIcon
                      icon={faBriefcaseMedical}
                      style={{ color: "var(--secondary-color)" }}
                    />
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
            <div className="devideLine d-none d-md-block"></div>
            <div className="navItemContainer d-none d-md-block">
              {!currentUser && (
                <>
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    style={{
                      fontSize: "18px",
                      color: "var(--secondary-color)",
                    }}
                  />
                  <Link to="/login" state={{guest: pathname}} className="navbar-button">
                    <span>ĐĂNG NHẬP</span>
                  </Link>
                </>
              )}
              {currentUser && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle className="toggle-dropdown">
                      <div
                        className="user-border pr-md-2"
                      // onClick={() => setShowDropDown(true)}
                      >
                        {currentUser?.avatar?.bucketName ? (
                          <img
                            src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`}
                            alt=""
                            className="avatar__Container"
                          />
                        ) : (
                          <img
                            src={currentUser?.avatar?.filename}
                            alt=""
                            className="avatar__Container"
                          />
                        )}
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="drop-down__custome">
                        <div className="user-profile">
                          <Link
                            className="drop-down__item"
                            to={`/${currentUser.role}${
                              currentUser.role == "customer" ? "/profile" : ""
                            }`}
                          >
                            Thông tin cá nhân
                          </Link>
                        </div>
                        <Dropdown.Divider style={{ margin: '0px' }} />
                        <div className="logout">
                          <span
                            className="drop-down__item"
                            onClick={handleLogout}
                          >
                            Đăng xuất
                          </span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </div>
          </div>
          <div className="col-3 col-md-3 d-lg-none text-md-center" data-bs-toggle="offcanvas"  aria-controls="offcanvasExample">
            <FontAwesomeIcon icon={faSliders} style={{ color: 'var(--secondary-color)', fontSize: '25px', cursor: 'pointer' }} />
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            {/* <div class="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div> */}
          </div>
        </div>
      </div>
      <Options />

    </div>
  );
}
