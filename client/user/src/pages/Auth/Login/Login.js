import { useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "animate.css";
import { validateEmail } from "~/utils";
import { checkStringContainInPhoneNumber } from "~/utils";
import "./Login.scss";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import googleIcon from "../../../assets/images/google-icon.png";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const errorAlert = useRef();
  const errorPassword = useRef();
  const inputRef = useRef();

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("R3");
  const [isloading, setIsLoading] = useState(false);

  const hanldeValidateLogin = () => {
    
    // case phone or email is empty
    if (!user) {
      errorAlert.current.className = "login__errorAlert";
      errorAlert.current.innerText = "Vui lòng nhập số điện thoại hoặc email";
      inputRef.current.focus();
      return;
    }

    if (!password) {
      errorPassword.current.className = "login__errorAlert";
      errorPassword.current.innerText = "Vui lòng nhập mật khẩu";
      return;
    }

    // validate phone
    let isPhoneNumber = true;
    let phone = user.trim();
    if (!validateEmail(user) && !user.includes("@")) {
      const isContainsString = checkStringContainInPhoneNumber(phone);

      if (isContainsString) {
        toast.error("SDT không được chứa kí tự");
        isPhoneNumber = false;
        return;
      }
      if (+phone.charAt(0) !== 0) {
        toast.error("SDT phải bắt đầu bằng số 0");
        isPhoneNumber = false;
        return;
      }
      if (phone.length < 10 || phone.length > 11) {
        toast.error("SDT phải có 10 hoặc 11 số ");
        isPhoneNumber = false;
        return;
      }

      if (isPhoneNumber) {
        const loginUser = {
          role_code: userType,
          phone: user,
          password: password,
        };
        login(loginUser, setIsLoading);
        return;
      }
    }

    // validate email
    if (validateEmail(user)) {
      let loginUser = {
        role_code: userType,
        email: user,
        password: password,
      };
      login(loginUser);
    } else {
      toast.error("sai email");
      return;
    }
  };

  const hanldeOnInput = (e) => {
    if (e.target.value) {
      errorAlert.current.innerText = "";
    }
    if (password) {
      errorPassword.current.innerText = "";
    }
  };

  return (
    <div className="Login-Wrapper ">
      <div className="Login animate__animated animate__fadeInDown">
        <div className="login-body">
          <div className="login__selectRole">
            <select
              className="select"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="R3">Khách Hàng</option>
              <option value="R2">Bác Sỹ</option>
            </select>
          </div>
          <div className="login__form-body">
            <div className="login__form-content">
              <h2>Đăng Nhập</h2>
              <div className="login_form-group">
                <input
                  type="text"
                  placeholder="Số điện thoại hoặc Email"
                  className="login__input-box mt-4"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onInput={(e) => {
                    hanldeOnInput(e);
                  }}
                  ref={inputRef}
                />
                <span ref={errorAlert}>
                  {/* error alert */}
                </span>
              </div>
              <div className="login__form-group">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="login__input-box mt-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onInput={(e) => {
                    hanldeOnInput(e);
                  }}
                />
                <span  ref={errorPassword}>
                  {/* error alert */}
                </span>
              </div>
              <p
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Quên mật khẩu
              </p>
              <button
                className="btn-sign-in"
                onClick={() => hanldeValidateLogin()}
                disabled={isloading}
              >
                {isloading && (
                  <FontAwesomeIcon icon={faSpinner} className="loader-icon" />
                )}
                Đăng Nhập
              </button>
              <div className="separate mt-4 mb-4">
                <div className="line"></div>
                <span>Hoặc</span>
                <div className="line"></div>
              </div>
              <div
                className="login__google mt-3"
                onClick={() => hanldeValidateLogin("google")}
              >
                <img className="google-icon" src={googleIcon} />
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
