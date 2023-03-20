import { useEffect, useState } from "react";
import "./doctorDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL, { API_IMAGE_URL } from "~/api/Router";
import background from "~/assets/images/doctor_background.jpg";

export default function DoctorDetail() {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState();

  // Side effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL + "/users/doctors/" + doctorId);
        setDoctor(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [doctorId]);

  return (
    <div className="doctorDetail">
      <img src={background} alt="" className="background" />
      <div className="container-md mt-5">
        <div className=" row d-flex justify-content-center">
          <div className="col-lg-10 row col-md-12 doctorShow">
            <div className="col-lg-5 col-sm-5 imgShow col-12">
              <img src={`${API_IMAGE_URL}/${doctor?.avatar.filename}`} alt="" />
              <h1>{doctor?.fullname}</h1>
            </div>
            <div className="col-lg-7 col-sm-7 col-12">
              <div className="profileItem ">
                <div className="header">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>Giới thiệu</span>
                </div>
                <p>{doctor?.profile}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* LÀM THÊM OTHER DOCTORS */}

      {/* <img
        src={`${API_IMAGE_URL}/${doctor?.avatar.filename}`}
        alt=""
        className="avatar"
      />
      <h1>{`${doctor?.degree} ${doctor?.fullname}`} </h1>

      <div className="doctorProfileContent">
        <div className="profileLeft">
          <div className="profileItem">
            <div className="header">
              <FontAwesomeIcon icon={faGraduationCap} />
              <span>Học vấn</span>
            </div>
            <div className="devideLine" />
            <p>{doctor?.degree}</p>
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
              <span>Chuyên ngành</span>
            </div>
            <div className="devideLine" />
            <p>{doctor?.specialist}</p>
          </div>
        </div>
        <div className="profileRight">
          <div className="profileItem">
            <div className="header">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>Giới thiệu</span>
            </div>
            <div className="devideLine" />
            <p>{doctor?.profile}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
