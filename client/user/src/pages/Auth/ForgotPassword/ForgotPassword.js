import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "~/api/Router";
import { useCookies } from "react-cookie";
import "./ForgotPassword.scss";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetInput, setResetInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const confirmRef = useRef();

  useEffect(() => {
    if (newPassword !== "") {
      if (newPassword === confirmPassword) {
        confirmRef.current.style.border = "2px solid lightgreen";
      } else {
        confirmRef.current.style.border = "1px solid #ced4da";
      }
    }
  }, [confirmPassword, newPassword]);

  const handleSendMail = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/send-reset-code`,
        { email },
        { withCredentials: true, credentials: "include" }
      );
      toast.info(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckResetCode = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/verify-code`,
        {
          resetInput,
        },
        { withCredentials: true, credentials: "include" }
      );
      toast.success(res.data);
      setIsChecked(true);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!newPassword) {
        toast.warning("Mật khẩu không được để trống");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.warning("Mật khẩu nhập lại không giống");
        return;
      }

      const res = await axios.post(
        `${API_URL}/auth/reset-password`,
        {
          newPassword,
        },
        { withCredentials: true, credentials: "include" }
      );
      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="Login-Wrapper">
      <div className=" w-100 row animate__animated animate__fadeInDown">
        <div className="bg-light p-4 rounded-3 d-flex flex-column col-lg-4 col-md-6 col-sm-10 mx-auto">
          <h2 className="text-center">Quên Mật Khẩu</h2>
          {isChecked ? (
            <div className="shadow-sm p-3 mb-2 bg-white rounded">
              <h6>Mật khẩu mới: </h6>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <h6 className="mt-5">Nhập lại mật khẩu mới: </h6>
              <input
                type="password"
                ref={confirmRef}
                placeholder="Nhập lại mật khẩu mới"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* <span className="inline-block pe-auto mt-2" onClick={() => setIsChecked(false)}>Trở về</span> */}
              <button
                className="btn btn-primary mt-3 w-50 mx-auto my-2 d-block"
                onClick={handleChangePassword}
              >
                Cập nhật
              </button>
            </div>
          ) : (
            <>
              <div className="shadow-sm p-3 mb-3 bg-white rounded">
                <h5>Nhập email:</h5>
                <input
                  placeholder="Nhập email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Link to="/login" className="text-primary mt-2 d-inline-block">
                  <small>Trở về đăng nhập</small>
                </Link>
                <button
                  className="btn btn-primary mt-3 w-75 mx-auto my-2 d-block"
                  onClick={() => handleSendMail("default")}
                >
                  Gửi mã
                </button>
              </div>
              <div className="shadow-sm p-3 mb-3 bg-white rounded">
                <h5>Nhập mã xác nhận:</h5>
                <input
                  autoComplete="off"
                  placeholder="Nhập mã xác nhận từ email"
                  className="form-control"
                  value={resetInput}
                  onChange={(e) => setResetInput(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-3 w-75 mx-auto d-block"
                  onClick={handleCheckResetCode}
                >
                  Xác nhận
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
