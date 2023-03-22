import React, { useEffect, useState } from 'react'
import RevenueChart from '~/components/admin/Chart/RevenueChart';
import NumberUserCard from '~/components/admin/NumberUserCard/NumberUserCard';
import { GiStethoscope } from "react-icons/gi";
import { SlUser } from "react-icons/sl";
import { IoDocumentsOutline } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
import DoughnutChart from '~/components/admin/Chart/DoughnutChart';
import Calendar from '~/components/admin/Calendar/Calendar';
import axios from 'axios';
import ROUTER from "~/api/adminRouter"

const Dashboard = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [userAccountCount, setUserAccountCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);

  const getCount = async () => {
    try {
      const { data } = await axios.get(`${ROUTER}/api/dashboard/count`);
      if (!data) return;
      setDoctorCount(data.doctorCount);
      setUserAccountCount(data.userAccountCount);
      setBlogCount(data.blogCount);
      setMedicineCount(data.medicineCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCount();
  }, [])


  return (
    <div className='bg-light container w-100 h-auto d-flex flex-column gap-3'>
      {/* 1 row */}
      <div className='row'>
        <div className="col-12 border py-3">
          <RevenueChart />
        </div>
      </div>

      <div className='row d-flex'>
        <div className="col-12 p-0 d-flex gap-3">
          <div className='border p-0 d-flex flex-column justify-content-between gap-3 p-3' style={{ width: '40%' }}>
            <h4>Total</h4>
            <NumberUserCard title={'Doctor'} number={doctorCount} logo={<GiStethoscope />} />
            <NumberUserCard title={'User Account'} number={userAccountCount} logo={<SlUser />} />
            <NumberUserCard title={'Blog'} number={blogCount} logo={<IoDocumentsOutline />} />
            <NumberUserCard title={'Medicine'} number={medicineCount} logo={<GiMedicines />} />
          </div>
          <div className='border p-3 d-flex' style={{ width: '60%' }}>
            <h4>Calendar</h4>
            <DoughnutChart />
          </div>
        </div>
      </div>

      {/* <div className='row'>
        <div className="col-12 border vh-100">
          <Calendar />
        </div>
      </div> */}

    </div>
  )
}

export default Dashboard