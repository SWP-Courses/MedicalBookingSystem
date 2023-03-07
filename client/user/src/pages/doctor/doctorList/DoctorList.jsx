import "./doctorList.scss";

import stethoscope from "~/assets/images/stethoscope.jpg";
import DoctorItem from "~/components/doctorItem/DoctorItem";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "~/api/Router";

export default function DoctorList() {
  const [doctorList, setDoctorList] = useState();
  const [specialists, setSpecialists] = useState([]);
  const [filterId, setFilterId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL + "/users/doctors");
        setDoctorList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="doctorListContainer">
      <div className="imgWrapper">
        <h1 className="title">Danh sách bác sĩ</h1>
        <img src={stethoscope} alt="" />
      </div>
      <div className="doctorsWrapper">
        <div className="doctorList">
          {filterId
            ? doctorList.filter((doctor) => (
                doctor.specialist_id === filterId
              ))?.map((doctor, index) => (
                <DoctorItem doctor={doctor} key={index} />
              ))
            : doctorList?.map((doctor, index) => (
                <DoctorItem doctor={doctor} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
}
