import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef, useState, useEffect } from "react";
import "./Register.scss";
import axios from "axios";
import API_URL from "~/api/Router";
import { checkStringContainInPhoneNumber, validateUsername } from "~/utils";
import { validateEmail } from "~/utils";
import logo from "~/assets/images/logo.jpg";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    fullname: "",
    email: "",
    gender: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const inputRef = useRef({});

  useEffect(() => {
    inputRef.current["name"].focus();
  }, []);

  // Functions
  const handleTextInputChange = (e) => {
    setRegisterInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    // validate
    const {
      phone,
      email,
      fullname,
      dateOfBirth,
      password,
      confirmPassword,
      gender,
    } = registerInfo;

    // username
    if (!fullname) {
      inputRef.current["name"].className = "input-box error";
      return;
    }
    if (!validateUsername(fullname)) {
      inputRef.current["isValidName"].innerText =
        "Tên không được chứa số, kí tự đặc biệt";
      return;
    }

    // birthdate
    if (!dateOfBirth) {
      inputRef.current["birth"].className = "input-box error";
      return;
    }

    //validate phone number
    const isContainsString = checkStringContainInPhoneNumber(phone);
    if (isContainsString) {
      inputRef.current["phone"].className = "input-box error";
      inputRef.current["isValidPhone"].innerText = "SDT không được chứa kí tự";
      return;
    }
    if (+phone.charAt(0) !== 0) {
      inputRef.current["phone"].className = "input-box error";
      toast.error("SDT phải bắt đầu bằng số 0");
      return;
    }
    if (phone.length < 10 || phone.length > 11) {
      inputRef.current["phone"].className = "input-box error";
      toast.error("SDT phải có 10 hoặc 11 số ");
      return;
    }

    // validate email
    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        toast.error("Email sai định dạng");
      }
    }

    // validate password
    if (password.length < 6) {
      inputRef.current["curPass"].className = "input-box error";
      inputRef.current["isValidPassword"].innerText =
        "Mật khẩu tối thiểu phải có 6 kí tự";
      return;
    }

    if (confirmPassword.length < 6) {
      inputRef.current["confirmPass"].className = "input-box error";
      inputRef.current["isConfirmPassword"].innerText =
        "Mật khẩu tối thiểu phải có 6 kí tự";
      return;
    }

    if (password !== confirmPassword) {
      inputRef.current["confirmPass"].className = "input-box error";
      toast.error("Mật khẩu nhập lại không chính xác");
      return;
    }

    // validate gender
    if (!gender) {
      inputRef.current["isValidGender"].innerText = "Chọn giới tính của bạn";
      return;
    }

    // convert date
    // const userRegister = {
    //   ...registerInfo, ['dateOfBirth']: dateOfBirth.replaceAll('-', '/')
    // }

    //call api
    try {
      const res = await axios.post(API_URL + "/auth/register", registerInfo);
      setRegisterInfo({
        fullname: "",
        email: "",
        gender: "",
        phone: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
      });
      if (res) {
        toast.success("Đăng kí Thành Công");
      }
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data);
      console.log(err);
    }
  };

  const hanldeEmptyInput = (e) => {
    if (!e.target.value) {
      e.target.className = "input-box error";
    } else {
      e.target.className = "input-box";
    }
    if (e.target.checked) {
      inputRef.current["isValidGender"].innerText = "";
    }
  };

  const hanldeOnBlurInput = (e) => {
    if (e.target.value) {
      e.target.className = "input-box";
      for (const key in inputRef.current) {
        if (inputRef.current.hasOwnProperty(key)) {
          inputRef.current[key].innerText = "";
        }
      }
    }
  };

  const hanldeCheckEmptyCheckBox = (e) => {
    if (e.target.value) {
      inputRef.current["isValidGender"].innerText = "";
    }
  };

  return (
    <div className="Register-Wrapper ">
      <div className="Register-body animate__animated animate__fadeInDown">
        <div className="form-body">
          <div className="form-content">
            <h2>Đăng Kí</h2>
            <div className="form-group">
              <span>Họ và tên (*)</span>
              <input
                name="fullname"
                placeholder="Nhập họ và tên"
                type="text"
                className="input-box"
                value={registerInfo?.fullname}
                // required
                ref={(element) => {
                  //define key, value for obj current
                  inputRef.current["name"] = element;
                }}
                onChange={handleTextInputChange}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
              <span
                ref={(element) => {
                  inputRef.current["isValidName"] = element;
                }}
                className="errorAlert mt-2"
              ></span>
            </div>
            <div className="form-group mt-3">
              <span>Ngày Sinh (*)</span>
              <input
                name="dateOfBirth"
                type="date"
                value={registerInfo?.dateOfBirth}
                className="input-box"
                onChange={handleTextInputChange}
                // required
                ref={(element) => {
                  inputRef.current["birth"] = element;
                }}
                onBlur={(e) => {
                  hanldeEmptyInput(e);
                }}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
            </div>

            <div className="form-group mt-3">
              <span>Số Điện Thoại (*)</span>
              <input
                name="phone"
                placeholder="Nhập số điện thoại"
                className="input-box"
                value={registerInfo.phone}
                ref={(element) => {
                  inputRef.current["phone"] = element;
                }}
                onChange={handleTextInputChange}
                onBlur={(e) => {
                  hanldeEmptyInput(e);
                }}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
              <span
                ref={(element) => {
                  inputRef.current["isValidPhone"] = element;
                }}
                className="errorAlert mt-2"
              ></span>
            </div>

            <div className="form-group mt-3">
              <span>Email</span>
              <input
                name="email"
                placeholder="Nhập email"
                className="input-box"
                value={registerInfo.email}
                ref={(element) => {
                  inputRef.current["email"] = element;
                }}
                onChange={handleTextInputChange}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
            </div>

            <div className="form-group mt-3">
              <span>Mật khẩu (*)</span>
              <input
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                className="input-box"
                value={registerInfo.password}
                // required
                ref={(element) => {
                  inputRef.current["curPass"] = element;
                }}
                onChange={handleTextInputChange}
                onBlur={(e) => {
                  hanldeEmptyInput(e);
                }}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
              <span
                ref={(element) => {
                  inputRef.current["isValidPassword"] = element;
                }}
                className="errorAlert mt-2"
              ></span>
            </div>

            <div className="form-group mt-3">
              <span>Nhập lại mật khẩu (*)</span>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="input-box"
                // required
                ref={(element) => {
                  inputRef.current["confirmPass"] = element;
                }}
                value={registerInfo.confirmPassword}
                onChange={handleTextInputChange}
                onBlur={(e) => {
                  hanldeEmptyInput(e);
                }}
                onInput={(e) => {
                  hanldeOnBlurInput(e);
                }}
              />
              <span
                ref={(element) => {
                  inputRef.current["isConfirmPassword"] = element;
                }}
                className="errorAlert mt-2"
              ></span>
            </div>

            <div className="form-group mt-3">
              <span>Giới Tính (*)</span>
              <div className="sex">
                <div className="checkbox-group">
                  <input
                    // className="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    value="male"
                    // required
                    ref={(element) => {
                      inputRef.current["male"] = element;
                    }}
                    checked={registerInfo.gender === "male"}
                    onChange={handleTextInputChange}
                    onInput={(e) => {
                      hanldeCheckEmptyCheckBox(e);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Nam
                  </label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    value="female"
                    ref={(element) => {
                      inputRef.current["female"] = element;
                    }}
                    checked={registerInfo.gender === "female"}
                    onChange={handleTextInputChange}
                    onInput={(e) => {
                      hanldeCheckEmptyCheckBox(e);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Nữ
                  </label>
                </div>
              </div>
              <center>
                <span
                  ref={(element) => {
                    inputRef.current["isValidGender"] = element;
                  }}
                  className="errorAlert mt-2"
                ></span>
              </center>
            </div>
            <button className="btn-register" onClick={handleRegister}>
              Đăng Kí
            </button>
            <div className="sign-up mt-3">
              <span>Bạn Đã Có Tài Khoản ?</span>
              <Link to="/login">Đăng Nhập</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
