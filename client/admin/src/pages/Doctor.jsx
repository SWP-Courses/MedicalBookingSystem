import { faker } from '@faker-js/faker';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import DoctorDetail from '../components/DoctorDetail/DoctorDetail';
import DoctorTable from '../components/DoctorTable/DoctorTable';
const demoBlogList = [
  {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    fullname: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.birthdate(),
    address: faker.address.city(),
    special: faker.word.adjective(),
    phone: faker.phone.phoneNumber(),
    username: faker.name.firstName(),
    sex: faker.name.sex(),
    description: faker.commerce.productDescription()
  },
  {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    fullname: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.birthdate(),
    address: faker.address.city(),
    special: faker.word.adjective(),
    phone: faker.phone.phoneNumber(),
    username: faker.name.firstName(),
    sex: faker.name.sex(),
    description: faker.commerce.productDescription()
  },
  {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    fullname: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.birthdate(),
    address: faker.address.city(),
    special: faker.word.adjective(),
    phone: faker.phone.phoneNumber(),
    username: faker.name.firstName(),
    sex: faker.name.sex(),
    description: faker.commerce.productDescription()
  },
  {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    fullname: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.birthdate(),
    address: faker.address.city(),
    special: faker.word.adjective(),
    phone: faker.phone.phoneNumber(),
    username: faker.name.firstName(),
    sex: faker.name.sex(),
    description: faker.commerce.productDescription()
  }
]

const Doctor = () => {
  const [doctorList, setDoctorList] = useState(demoBlogList);
  const [createDoctor, setCreateDoctor] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState(null)

  const onClickEditDoctor = (id) => {
    if (!id) return;
    setCreateDoctor(!createDoctor)
    setDoctorDetail(doctorList.find(doctor => doctor._id === id))
  }

  const onSelectCreateDoctor = () => {
    if (doctorDetail) setDoctorDetail(null);
    setCreateDoctor(true)
  }

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row'>
        {/* Header */}
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          {
            createDoctor ?
              <button onClick={() => setCreateDoctor(false)} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button> :
              <h4 className='m-0'>DOCTOR</h4>
          }
          {
            createDoctor ? <button className="btn btn-primary" style={{ width: "10%" }} type="submit"> Save </button> : <button onClick={() => onSelectCreateDoctor()} className="btn btn-primary" style={{ width: "10%" }} type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {
          createDoctor ?
            <DoctorDetail doctorDetail={doctorDetail} /> :
            <DoctorTable onClickEditDoctor={onClickEditDoctor} doctors={doctorList} />
        }


      </div>
    </div>
  )
}

export default Doctor