import { doctorList } from "~/fakeData";
import "./doctorList.scss";

import stethoscope from "~/assets/images/stethoscope.jpg";
import DoctorItem from "~/components/doctorItem/DoctorItem";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorList() {
  const [doctorList, setDoctorList] = useState();
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/specialists");
        setSpecialists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/users/doctors");
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
        <div className="filter">
          <h2>Chuyên khoa</h2>
          <div className="divideLine" />
          <ul>
            {specialists?.map((spe) => (
              <li key={spe._id}>{spe.title}</li>
            ))}
          </ul>
        </div>
        <div className="doctorList">
          {doctorList?.map((doctor, index) => (
            <DoctorItem doctor={doctor} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
