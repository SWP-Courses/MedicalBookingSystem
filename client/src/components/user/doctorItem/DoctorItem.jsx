import {
  faGraduationCap,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./doctorItem.scss";
import { shortenText } from "~/utils";
import API_URL, { API_IMAGE_URL } from "~/api/Router";

export default function DoctorItem({ doctor }) {
  const { avatar, fullname, degree, profile } = doctor;
  return (
    <div className="doctorItem">
      <div className="doctorImg">
        <img src={`${API_IMAGE_URL}/${doctor.avatar.filename}`} alt="" />
      </div>
      <div className="doctorTitle">
        <Link to={`/doctors/${doctor._id}`} className="doctorName">
          Bác sĩ {fullname}
        </Link>
        {/* <div className="titleItem">
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>{degree}</span>
        </div> */}
        <p className="doctorShortIntro">{shortenText(profile, 145)}</p>
      </div>
    </div>
  );
}
