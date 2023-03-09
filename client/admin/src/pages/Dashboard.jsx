import React from 'react'
import RevenueChart from '../components/Chart/RevenueChart'
import NumberUserCard from "../components/NumberUserCard/NumberUserCard"
import { GiStethoscope } from "react-icons/gi";
import { SlUser } from "react-icons/sl";
import { IoDocumentsOutline } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
import DoughnutChart from '../components/Chart/DoughnutChart';

const Dashboard = () => {
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
            <NumberUserCard title={'Doctor'} number={30} logo={<GiStethoscope />} />
            <NumberUserCard title={'Patients'} number={500} logo={<SlUser />} />
            <NumberUserCard title={'Blog'} number={100} logo={<IoDocumentsOutline />} />
            <NumberUserCard title={'Medicine'} number={245} logo={<GiMedicines />} />
          </div>
          <div className='border p-3 d-flex' style={{ width: '60%' }}>
            <h4>Calendar</h4>
            <DoughnutChart />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="col-12 border vh-100">
          
        </div>
      </div>

    </div>
  )
}

export default Dashboard