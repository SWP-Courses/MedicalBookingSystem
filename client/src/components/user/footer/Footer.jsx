import { faEnvelope, faMailForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      {/* <div className="emailNews">
        <div className="emailWrapper">
          <h2></h2>
          <div className="emailInput">
            <label htmlFor="emailRegister">
              <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
            </label>
            <input type="text" placeholder="Địa chỉ email" id="emailRegister" />
            <button>ĐĂNG KÝ</button>
          </div>
        </div>
      </div> */}
      {/* <div className="devideLine d-none d-sm-block"></div> */}

      <div className="footerContact">
        <h1>THÔNG TIN LIÊN HỆ</h1>
        <p>Hotline: 0912836129</p>
        <p>Email: nhakhoasunsmile@gmail.com</p>
        <p>Địa điểm: Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</p>
      </div>
      <div className="infoTitle">
        <div className="colItem">
          <h1>VỀ CHÚNG TÔI</h1>
          <ul>
            <Link to="/doctors">Đội ngũ bác sĩ</Link>
            <Link to="/blogs">Bài viết</Link>
            <Link to="/intro">Giới thiệu</Link>
          </ul>
        </div>
        <div className="colItem">
          <h1>DỊCH VỤ</h1>
          <ul>
            <li>Trám răng</li>
            <li>Trồng răng</li>
            <li>Nhổ răng</li>
            <li>Niềng răng</li>
            <li>Cạo vôi răng</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
