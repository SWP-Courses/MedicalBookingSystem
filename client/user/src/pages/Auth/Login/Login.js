import { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Login.scss";

function Login() {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("r3");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const hanldeLogin = (type) => {
    // case phone or email is empty
    if (!user) {
      console.log("choose phone or email to login");
      return;
    }

    // case password empty
    if (!password) {
      console.log("password can not be empty");
      return;
    }

    // validate email
    const isEmail = validateEmail(user);

    // validate phone
    let isPhoneNumber = null;
    if (!isEmail) {
      isPhoneNumber = user.replace(/[^0-9]/g, "");
      if (user.length != 10) {
        isPhoneNumber = false;
        return;
      } else {
        isPhoneNumber = user;
      }
    }

    if (type === "default" && isEmail) {
      let loginUser = {
        role_code: userType,
        email: user,
        password: password,
      };
      console.log(loginUser);
    } else {
      // if(!isPhoneNumber) {
      console.log("email incorrect");
      // }
    }

    if (type === "default" && isPhoneNumber) {
      let loginUser = {
        role_code: userType,
        phone: user,
        password: password,
      };
      console.log(loginUser);
    }

    if (type === "google") {
      alert("login google");
    }
  };

  // const hanldeLoginType = (e) => {
  //   const email = e.target.value;
  //   const isEmail = validateEmail(email);
  //   if(isEmail) {
  //     setEmail(email)
  //   }else {
  //     console.log('email incorrect');
  //     return;
  //   }

  //   // phone = phone.replace(/[^0-9]/g, '');
  //   // if(phone.length != 10) {
  //   //   console.log('phone number must be contain 10 degit');
  //   //   return;
  //   // }
  //   console.log('helo', e.target.value);
  // }

  return (
    <div className="Login-Wrapper">
      <div className="Login-header">
        <div className="logo">
          <img src="" alt="logo" />
          <div className="sign-in">Đăng Nhập</div>
          <img
            src=""
            alt="logo"
            onClick={() => navigate("/")}
            className="logo"
          />
        </div>
      </div>
      <div className="login-main">
        {/* <div className="login-title">Đăng Nhập</div> */}
        <div className="login-body">
          <select
            className="select"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="r3">Khách Hàng</option>
            <option value="r2">Bác Sỹ</option>
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
              />
              <input
                type="password"
                placeholder="mật khẩu"
                className="input-box mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Quên mật khẩu
              </p>
              <button
                className="btn-sign-in"
                onClick={() => hanldeLogin("default")}
              >
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
