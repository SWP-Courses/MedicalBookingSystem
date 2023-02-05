import "./specialist.scss";
import heartCureIntro from "../../assets/images/heart_cure_intro.jpg";
import { doctorList } from "../../fakeData";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faHospitalSymbol,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { shortenText } from "../../utils";
import { Link } from "react-router-dom";

export default function Specialist() {
  const newDoctorList = doctorList.slice(0, 3);
  const [doctorShow, setDoctorShow] = useState(newDoctorList[0]);

  const handleDoctorMiniClick = (doctor) => {
    setDoctorShow(doctor);
  };
  return (
    <div className="singleSpecialist">
      <div className="introImages">
        <h1 className="speIntroThumbnail">
          Chuyên khoa <b>TIM MẠCH</b>
        </h1>
        <img src={heartCureIntro} alt="" />
      </div>
      <h2 className="speTitle">Đội ngũ chuyên gia của chúng tôi</h2>
      <div className="doctorStaff">
        <div className="doctorShow">
          <div className="imgShow">
            <img src={doctorShow.img} alt="" />
            <h1>{doctorShow.name}</h1>
            <span>{doctorShow.degree}</span>
          </div>
          <div className="contentShow">
            <div className="profileItem">
              <div className="header">
                <FontAwesomeIcon icon={faHospitalSymbol} />
                <span>Nơi công tác</span>
              </div>
              <p>Bệnh viện Human Heal HCM</p>
            </div>
            <div className="profileItem">
              <div className="header">
                <FontAwesomeIcon icon={faBriefcase} />
                <span>Chuyên khoa</span>
              </div>
              <p>{doctorShow.major}</p>
            </div>
            <div className="profileItem">
              <div className="header">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>Giới thiệu</span>
              </div>
              <p>{shortenText(doctorShow.infoDetails, 500)}</p>
            </div>
          </div>
        </div>

        <div className="doctorOptions">
          {newDoctorList.map((doctor) => (
            <div
              className="doctorMini"
              onClick={() => handleDoctorMiniClick(doctor)}
            >
              <img
                src={doctor.img}
                alt=""
                className={doctorShow.name === doctor.name ? "active" : ""}
              />
              <span className="title">{doctor.degree}</span>
              <Link to={`/doctors/${doctor.id}`} className="name">
                {doctor.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <h2 className="speTitle">Chuyên khoa khác</h2>
      <div className="otherSpecialist">
        <div className="speBlock">Vắc xin</div>
        <div className="speBlock">Vắc xin</div>
        <div className="speBlock">Vắc xin</div>
        <div className="speBlock">Vắc xin</div>
        <div className="speBlock">Vắc xin</div>
      </div>
    </div>
  );
}
