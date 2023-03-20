import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCookies } from "react-cookie";
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
  const [cookies, setCookie, removeCookie] = useCookies(["error"]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(cookies?.error);
    cookies?.error && toast.error(cookies?.error);
    removeCookie("error");
  }, [cookies?.error, removeCookie]);

  const hanldeValidateLogin = (e) => {
    e.preventDefault();
    //email is empty
    if (!email) {
      errorAlert.current.className = "login__errorAlert";
      errorAlert.current.innerText = "Vui lòng nhập email";
      inputRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      errorAlert.current.innerText = "Email sai định dạng";
      return;
    }

    if (!password) {
      errorPassword.current.className = "login__errorAlert";
      errorPassword.current.innerText = "Vui lòng nhập mật khẩu";
      return;
    }

    // validate email
    let loginUser = {
      email: email,
      password: password,
    };
    login(loginUser);
  };

  const hanldeOnInput = (e) => {
    if (e.target.value) {
      errorAlert.current.innerText = "";
    }
    if (password) {
      errorPassword.current.innerText = "";
    }
  };

  // login by google
  const handleLoginByGoogle = () => {
    window.open("http://localhost:8800/api/auth/google", "_self");
  };

  return (
    <div className="Login-Wrapper ">
      <div className="Login animate__animated animate__fadeInDown">
        <div className="login-body">
          <div className="login__form-body">
            <form
              className="login__form-content"
              onSubmit={hanldeValidateLogin}
            >
              <h2>Đăng Nhập</h2>
              <div className="login_form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="login__input-box mt-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onInput={(e) => {
                    hanldeOnInput(e);
                  }}
                  ref={inputRef}
                />
                <span ref={errorAlert}>{/* error alert */}</span>
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
                <span ref={errorPassword}>{/* error alert */}</span>
              </div>
              <Link to="/forgotPassword" className="forgot-password mb-2 d-block">Quên mật khẩu</Link>
              <Link to="/"  className="forgot-password my-2 d-block">Trang chủ</Link>
              <button className="btn-sign-in" disabled={isloading}>
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
              <div className="login__google mt-3" onClick={handleLoginByGoogle}>
                <img className="google-icon" src={googleIcon} />
              </div>
              <div className="sign-up mt-3">
                <span>Bạn Chưa Có Tài Khoản ?</span>
                <Link to="/register">Đăng Kí</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
