import { doctorList } from "~/fakeData";
import "./doctorList.scss";

import stethoscope from "~/assets/images/stethoscope.jpg";
import DoctorItem from "~/components/doctorItem/DoctorItem";

export default function DoctorList() {
  return (
    <div className="doctorListContainer">
      <div className="imgWrapper">
        <h1 className="title">Danh sách bác sĩ</h1>
        <img src={stethoscope} alt="" />
      </div>
      <div className="doctorsWrapper">
        <div className="filter">
          <h2>Chuyên khoa</h2>
          <div className="divideLine" />
          <ul>
            <li>Tim mạch</li>
            <li>Nhi</li>
            <li>Ung bứu</li>
            <li>Sản phụ</li>
            <li>Gây mê - điều trị đau</li>
            <li>Tai - mũi - họng</li>
          </ul>
        </div>
        <div className="doctorList">
          {doctorList.map((doctor, index) => (
            <DoctorItem doctor={doctor} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
