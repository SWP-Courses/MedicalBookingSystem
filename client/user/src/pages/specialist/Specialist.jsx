import "./specialist.scss";
import heartCureIntro from "../../assets/images/heart_cure_intro.jpg";
import { doctorList } from "../../fakeData";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faHospitalSymbol,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { shortenText } from "../../utils";
import { Link, useLocation, useParams } from "react-router-dom";

import { encodedImage } from "~/assets/images/thumbnailbase64";
import axios from "axios";

export default function Specialist() {
  const [doctorList, setDoctorList] = useState([]);
  const [doctorShow, setDoctorShow] = useState();
  const [specialistInfo, setSpecialistInfo] = useState({});
  const { speId } = useParams();
  const [specialists, setSpecialists] = useState([]);

  // Side effects

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/specialists/" + speId);
        const { doctor_list, ...speInfo } = res.data;
        setSpecialistInfo(speInfo);
        setDoctorList(doctor_list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [speId]);

  useEffect(() => {
    setDoctorShow(doctorList && doctorList[0]);
  }, [doctorList]);

  useEffect(() => {
    fetchSpecialists();
  }, []);

  // Functions
  const fetchSpecialists = () => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/specialists");
        setSpecialists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };

  const handleDoctorMiniClick = (doctor) => {
    setDoctorShow(doctor);
  };

  console.log(specialistInfo?.banner);

  return (
    <div className="singleSpecialist">
      <div className="introImages">
        <h1
          className="speIntroThumbnail"
          style={{ backgroundImage: `url(${specialistInfo?.thumbnail})` }}
        >
          Chuyên khoa <b>{specialistInfo.title?.toUpperCase()}</b>
        </h1>
        <img src={specialistInfo?.banner} alt="" />
      </div>
      <h2 className="speTitle">Đội ngũ chuyên gia của chúng tôi</h2>
      <div className="doctorStaff">
        <div className="doctorShow">
          <div className="imgShow">
            <img src={doctorShow?.avatar} alt="" />
            <h1>{doctorShow?.fullname}</h1>
            <span>{doctorShow?.degree}</span>
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
              <p>{specialistInfo?.title}</p>
            </div>
            <div className="profileItem">
              <div className="header">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>Giới thiệu</span>
              </div>
              <p>
                {doctorShow?.profile && shortenText(doctorShow?.profile, 500)}
              </p>
            </div>
          </div>
        </div>

        <div className="doctorOptions">
          {doctorList?.map((doctor, index) => (
            <div
              className="doctorMini"
              onClick={() => handleDoctorMiniClick(doctor)}
              key={index}
            >
              <img
                src={doctor.avatar}
                alt=""
                className={
                  doctorShow?.fullname === doctor?.fullname ? "active" : ""
                }
              />
              <span className="title">{doctor?.degree}</span>
              <Link to={`/doctors/${doctor._id}`} className="name">
                {doctor?.fullname}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <h2 className="speTitle">Chuyên khoa khác</h2>
      <div className="otherSpecialist">
        {specialists?.map((spe) => (
          <Link
            to={"/specialists/" + spe._id}
            className="speBlock"
            style={{ backgroundImage: `url(${spe.thumbnail})` }}
          >
            {spe.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
