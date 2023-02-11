import { faker } from '@faker-js/faker';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';
import ROUTER from '../api/Router';
import DoctorDetail from '../components/DoctorDetail/DoctorDetail';
import DoctorTable from '../components/DoctorTable/DoctorTable';
import toastOption from '../config/toast';

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
  const [doctorList, setDoctorList] = useState();
  const [createDoctor, setCreateDoctor] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [specialist, setSpecialist] = useState();

  const formData = useRef(new FormData());
  const fullname = useRef();
  const gender = useRef();
  const dateOfBirth = useRef();
  const phone = useRef();
  const email = useRef();
  const degree = useRef();
  const address = useRef();
  const profile = useRef();
  const specialistId = useRef();


  const getAllDoctor = async () => {
    try {
      const result = await axios.get(`${ROUTER}/api/users/doctors`);
      if (result.status === 200) {
        setDoctorList(result.data);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllSpecialist = async () => {
    try {
      const result = await axios.get(`${ROUTER}/api/specialists`);
      if (result.status === 200) {
        setSpecialist(result.data);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllDoctor();
    getAllSpecialist();
  }, [])

  const onClickEditDoctor = (id) => {
    if (!id) return;
    setCreateDoctor(!createDoctor)
    setDoctorDetail(doctorList.find(doctor => doctor._id === id))
  }

  const onSelectCreateDoctor = () => {
    if (doctorDetail) setDoctorDetail(null);
    setCreateDoctor(true)
  }

  const updateList = (newItem, currentList) => {
    const list = [...currentList];
    const isExist = list.find(item => item._id === newItem._id);
    if (!isExist) return [...list, newItem];

    const indexOfItem = list.findIndex(item => item._id === newItem._id);
    list[indexOfItem] = newItem;
    return list;
  }

  const onDeleteBlogById = (id) => {
    if (!id) return;
    setDoctorList(list => list.filter(list => list._id !== id));
  }

  const onClickSaveDoctor = async () => {
    formData.current.append('dateOfBirth', dateOfBirth.current.value);
    formData.current.append('gender', gender.current.value);
    formData.current.append('fullname', fullname.current.value);
    formData.current.append('phone', phone.current.value);
    formData.current.append('role_code', "R2");
    formData.current.append('degree', degree.current.value);
    formData.current.append('profile', profile.current.value);
    formData.current.append('specialist_id', specialistId.current.value);
    formData.current.append('email', email.current.value);
    formData.current.append('password', "123456");

    try {
      const result = false ? await axios.post(`${ROUTER}/api/auth/register/${doctorDetail._id}`, formData.current) : await axios.post(`${ROUTER}/api/auth/register`, formData.current);
      if (result.status === 200) {
        const newDoctor = result.data;
        setDoctorList(list => updateList(newDoctor, list));
        toast.success("Susscess!", toastOption);
      }

      // Reset input
      if (doctorDetail) return;
    } catch (error) {
      console.log(error.message);
      toast.error("Create Error!", toastOption);
    }

    formData.current.delete('dateOfBirth');
    formData.current.delete('gender');
    formData.current.delete('fullname');
    formData.current.delete('phone');
    formData.current.delete('role_code');
    formData.current.delete('profile');
    formData.current.delete('specialist_id');
    formData.current.delete('avatar');
    formData.current.delete('degree');
    formData.current.delete('password');
    formData.current.delete('email');


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
            createDoctor ? <button onClick={() => onClickSaveDoctor()} className="btn btn-primary" style={{ width: "10%" }} type="submit"> Save </button> : <button onClick={() => onSelectCreateDoctor()} className="btn btn-primary" style={{ width: "10%" }} type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {
          createDoctor ?
            <DoctorDetail specialistId={specialistId} formData={formData} profile={profile} address={address} email={email} degree={degree} fullname={fullname} gender={gender} specialist={specialist} phone={phone} dateOfBirth={dateOfBirth} doctorDetail={doctorDetail} /> :
            <DoctorTable onClickEditDoctor={onClickEditDoctor} onDeleteBlogById={onDeleteBlogById} doctors={doctorList} />
        }
      </div>
    </div>
  )
}

export default Doctor