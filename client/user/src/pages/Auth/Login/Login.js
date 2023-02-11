import { useContext, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "animate.css";
import { validateEmail } from "~/utils";
import { checkStringContainInPhoneNumber } from "~/utils";

import "./Login.scss";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const { login, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const errorAlert = useRef();
  const errorPassword = useRef();

  const inputRef = useRef();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("R3");
  const [isloading, setIsLoading] = useState(false);

  console.log(user);

  const hanldeLogin = (type) => {
    // case phone or email is empty
    if (!user) {
      errorAlert.current.innerText = "Vui lòng nhập số điện thoại hoặc email";
      inputRef.current.focus();
      return;
    }

    if (!password) {
      errorPassword.current.innerText = "Vui lòng nhập mật khẩu";
      return;
    }

    // validate phone
    let isPhoneNumber = true;
    let phone = user.trim();
    if (!validateEmail(user) && !user.includes('@')) {
      const isContainsString = checkStringContainInPhoneNumber(phone);

      if (isContainsString) {
        toast.error("SDT không được chứa kí tự");
        isPhoneNumber = false;
        return;
      }else if(+phone.charAt(0) !== 0) {
        toast.error("SDT phải bắt đầu bằng số 0");
        isPhoneNumber = false;
        return;
      }else if(phone.length < 10 || phone.length > 11) {
        toast.error("SDT phải có 10 hoặc 11 số ");
        isPhoneNumber = false;
        return;
      }

      setIsLoading(true);

      if(isPhoneNumber) {
        const loginUser = {
          role_code: userType,
          phone: user,
          password: password,
        }
        console.log(loginUser);
        login(loginUser, setIsLoading);
        return;
      }
    }

    // validate email
    if(validateEmail(user)) {
      let loginUser = {
        role_code: userType,
        email: user,
        password: password,
      };    
      console.log(loginUser);
      login(loginUser);
    }else {
      toast.error('sai email')
      return;
    }

    if (type === "google") {
      alert("login google");
    }
  };

  const hanldeEmptyInput = (e) => {
    if (!e.target.value) {
      e.target.className = "input-box mt-3 error";
      errorAlert.current.innerText = "Vui lòng nhập số điện thoại hoặc email";
      if (!password) {
        errorPassword.current.innerText = "Vui lòng nhập mật khẩu";
      }
    } else {
      e.target.className = "input-box mt-3";
    }
  };

  const hanldeOnBlurInput = (e) => {
    if (e.target.value) {
      e.target.className = "input-box mt-3";
      errorAlert.current.innerText = "";
      if (password) {
        errorPassword.current.innerText = "";
      }
    }
  };

  return (
    <div className="Login-Wrapper animate__animated animate__fadeInDown">
      <div className="Login-header">
        <div className="logo">
          <img
            src=""
            alt="logo"
            onClick={() => navigate("/")}
            className="logo"
          />
        </div>
      </div>
      <div className="login-main">
        <div className="login-body">
          <select
            className="select"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="R3">Khách Hàng</option>
            <option value="R2">Bác Sỹ</option>
          </select>
          <div className="form-body">
            <div className="form-content">
              <h2>Đăng Nhập</h2>
              <input
                type={user}
                placeholder="số điện thoại hoặc email"
                className="input-box"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onBlur={(e) => {
                  hanldeEmptyInput(e);
                }}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
                ref={inputRef}
              />
              <span className="errorAlert" ref={errorAlert}></span>
              {/* {user ?  undefined: 'Vui lòng nhập số điện thoại hoặc email'} */}
              <input
                type="password"
                placeholder="mật khẩu"
                className="input-box mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => {
                  hanldeEmptyInput(e);
                }}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
              <span className="errorAlert" ref={errorPassword}></span>
              {/* {password ?  undefined: 'Vui lòng nhập mật khẩu'} */}
              <p
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Quên mật khẩu
              </p>
              <button
                className="btn-sign-in"
                onClick={() => hanldeLogin("default")}
                disabled={isloading}
              >
                { isloading && <FontAwesomeIcon icon={faSpinner} className='loader-icon'/>}
                Đăng Nhập
              </button>
              <div className="separate mt-3">
                <div className="line"></div>
                <span>Hoặc</span>
                <div className="line"></div>
              </div>
              <div>
                <div
                  className="login-google mt-3"
                  onClick={() => hanldeLogin("google")}
                >
                  <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                </div>
              </div> 
              <div className="sign-up mt-3">
                <span>Bạn Chưa Có Tài Khoản ?</span>
                <Link to="/register">Đăng Kí</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
