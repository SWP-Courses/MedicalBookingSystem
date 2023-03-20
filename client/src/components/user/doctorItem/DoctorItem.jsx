import {
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./doctorItem.scss";
import { shortenText } from "~/utils";
import API_URL, { API_IMAGE_URL } from "~/api/Router";

export default function DoctorItem({ doctor }) {
  const { avatar, fullname, degree, profile } = doctor;
  return (
    <div className="doctorItem">
      <Link to={`/doctors/${doctor._id}`}  className="doctorImg">
        <img src={`${API_IMAGE_URL}/${doctor.avatar.filename}`} alt="" />
      </Link>
      <div className="doctorTitle">
        <Link to={`/doctors/${doctor._id}`} className="doctorName">
          Bác sĩ {fullname}
        </Link>
        
        <p className="doctorShortIntro">{profile}</p>
      </div>
    </div>
  );
}
