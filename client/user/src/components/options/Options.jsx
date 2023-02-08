import { faFacebook, faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import "./options.scss";

export default function Options() {
  return (
    <div className="topbarOptions">
      <div className="optionItem-wrapper container-fluid">
        <div className="optionItem col-sm-2.5">
          <span>Chuyên khoa trọng điểm</span>
          <FontAwesomeIcon icon={faChevronDown} className="optionIcon" />
          <div className="dropdown">
            <Link to="/specialist/id" className="dropItem">
              Tim mạch
            </Link>
            <span className="dropItem">Thần kinh</span>
          </div>
        </div>
        <div className="optionItem col-sm-2.5">
          <Link to="/doctors">Danh sách bác sĩ</Link>
        </div>
        <div className="optionItem col-sm-2.5">
          <Link to="/blogs">
            <span>Bài viết</span>
          </Link>
        </div>
        <div className="optionItem col-sm-2.5">
          <span>Khác</span>
          <FontAwesomeIcon icon={faChevronDown} className="optionIcon" />
        </div>
        <div className="optionItem col-sm-2">
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faYoutube} />
        </div>
      </div>
    </div>
  );
}
