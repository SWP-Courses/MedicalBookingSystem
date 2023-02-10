import {
  faGraduationCap,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./doctorItem.scss";
import { shortenText } from "~/utils";

export default function DoctorItem({ doctor }) {
  const { avatar, fullname, degree, profile } = doctor;
  return (
    <div className="doctorItem">
      <div className="doctorImg">
        <img src={avatar} alt="" />
      </div>
      <div className="doctorTitle">
        <Link to={`/doctors/${doctor._id}`} className="doctorName">
          Bác sĩ {fullname}
        </Link>
        <div className="titleItem">
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>{degree}</span>
        </div>
        {/* <div className="titleItem">
          <FontAwesomeIcon icon={faStethoscope} />
          <span>{major}</span>
        </div> */}
      </div>
      <p className="doctorShortIntro">{shortenText(profile, 145)}</p>
    </div>
  );
}
