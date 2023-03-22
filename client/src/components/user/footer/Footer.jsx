import { faEnvelope, faMailForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="emailNews">
        <div className="emailWrapper mx-sm-3">
          <h2>Đăng kí nhận thông tin</h2>
          <div className="emailInput">
            <label htmlFor="emailRegister">
              <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
            </label>
            <input type="text" placeholder="Địa chỉ email" id="emailRegister" />
            <button>ĐĂNG KÝ</button>
          </div>
        </div>
      </div>
      <div className="devideLine"></div>
      <div className="infoTitle">
        <div className="colItem">
          <h1>VỀ CHÚNG TÔI</h1>
          <ul>
            <li>Danh sách bác sĩ</li>
            <li>Bài viết</li>
            <li>Giới thiệu</li>
            <li>...</li>
            <li>...</li>
          </ul>
        </div>
        <div className="colItem">
          <h1>DỊCH VỤ</h1>
          <ul>
            <li>Khám bệnh</li>
            <li>Siêu âm</li>
            <li>Chụp X quang</li>
            <li>Tái khám</li>
            <li>Nội soi</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
