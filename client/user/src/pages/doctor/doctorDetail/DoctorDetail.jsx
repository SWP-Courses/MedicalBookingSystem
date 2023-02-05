import { useState } from "react";
import "./doctorDetail.scss";
import { doctorList } from "../../../fakeData";
import doctorBackground from "../../../assets/images/doctor_background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faHospital,
  faHospitalAlt,
  faHospitalSymbol,
  faHospitalUser,
  faHospitalWide,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function DoctorDetail() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [doctor, setDoctor] = useState(doctorList[0]);
  return (
    <div className="doctorDetail">
      <div className="doctorVisual">
        <img src={doctor.img} alt="" />
        <h1>{`${doctor.degree} ${doctor.name}`} </h1>
      </div>
      <div className="doctorProfileContent">
        <div className="profileLeft">
          <div className="profileItem">
            <div className="header">
              <FontAwesomeIcon icon={faGraduationCap} />
              <span>Học vấn</span>
            </div>
            <div className="devideLine" />
            <p>{doctor.degree}</p>
          </div>
          <div className="profileItem">
            <div className="header">
              <FontAwesomeIcon icon={faHospitalSymbol} />
              <span>Nơi công tác</span>
            </div>
            <div className="devideLine" />
            <p>Bệnh viện Human Heal HCM</p>
          </div>
          <div className="profileItem">
            <div className="header">
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Chuyên ngành{}</span>
            </div>
            <div className="devideLine" />
            <p>{doctor.major}</p>
          </div>
        </div>
        <div className="profileRight">
          <div className="profileItem">
            <div className="header">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>Giới thiệu</span>
            </div>
            <div className="devideLine" />
            <p>{doctor.infoDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
