import dayjs from 'dayjs'
import React, { memo, useEffect, useState } from 'react'
// import src from "../../assets/images/avatar.jpg"
import { AiOutlinePlus } from "react-icons/ai"
import "./doctordetail.css";
import ROUTER from '~/api/adminRouter';
import axios from 'axios';

function DoctorDetail({ roomId, profile, formData, doctorDetail, fullname, dateOfBirth, phone, gender, email, degree, address }) {
    const [Avatar, setAvatar] = useState();
    const [room, setRoom] = useState([]);

    const formatDate = (date) => {
        const formatDate = date.split("/").reverse().join("-");
        console.log(formatDate);
        return formatDate;
    }

    const getAllEmptyRoom = async (doctorDetail) => {
        try {
            let param = doctorDetail ? doctorDetail._id : "room"
            const result = await axios.get(`${ROUTER}/api/room/${param}`);
            if (result.status === 200) {
                setRoom(result.data.room);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllEmptyRoom(doctorDetail);
        if (doctorDetail) {
            setAvatar(`${ROUTER}/image/${doctorDetail.avatar.filename}`)
        }
    }, [])


    const onSelectAvatar = (file) => {
        if (!file) return;
        formData.current.delete("avatar");
        setAvatar(URL.createObjectURL(file));
        formData.current.append('avatar', file);
    }

    if (doctorDetail)
        return (
            <div className='w-100 h-auto px-3 d-flex'>
                <div className='w-50 h-100'>
                    {/* avatar */}
                    <div className='w-100 h-50 d-flex justify-content-center px-5'>
                        <img src={Avatar} alt="" className='h-100' />
                    </div>
                    <div className='d-flex mt-2 justify-content-center align-items-center'>
                        <label htmlFor="avatar">
                            <div className='select-file-label'>
                                <AiOutlinePlus />
                            </div>
                            <p className='text-center mt-2'>New Avatar</p>
                        </label>
                        <input className='d-none' onChange={e => onSelectAvatar(e.target.files[0])} type="file" id='avatar' />
                    </div>
                </div>

                < div className='w-50 h-100' >
                    < div className='w-100 h-100 d-flex flex-column gap-2' >
                        {/* <div className='w-50 h-auto'> */}
                        <div div className="input-group" >
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Fullname</span>
                            </div>
                            <input type="text" className="form-control" ref={fullname} defaultValue={doctorDetail.fullname} placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Address</span>
                            </div>
                            <input type="text" className="form-control" ref={address} defaultValue={doctorDetail.address} placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                        </div>

                        <div className="d-flex gap-3">
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Email</span>
                                </div>
                                <input type="text" className="form-control" ref={email} defaultValue={doctorDetail.email} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Degree</span>
                                </div>
                                <input type="text" className="form-control" ref={degree} defaultValue={doctorDetail.degree} placeholder="Degree" aria-label="Degree" aria-describedby="basic-addon1" />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Sex</span>
                                </div>
                                <select className="form-select" ref={gender} defaultValue={doctorDetail.gender} aria-label="Default select example">
                                    <option value="male">Male</option>
                                    <option value="female" selected='selected' >Female</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Date of birth</span>
                                </div>
                                <input ref={dateOfBirth} defaultValue={formatDate(doctorDetail.dateOfBirth)} type="date" className="form-control" placeholder="DateofBirth" aria-label="DateofBirth" />

                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Phone</span>
                                </div>
                                <input type="text" ref={phone} defaultValue={doctorDetail.phone} className="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Room</span>
                                </div>
                                <select className="form-select" ref={roomId} defaultValue={doctorDetail.room_id} aria-label="Default select example">
                                    {
                                        room &&
                                        room.map(item => <option value={item._id}>{item.room}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                            <textarea className="form-control" ref={profile} id="exampleFormControlTextarea1" defaultValue={doctorDetail.profile} rows="8"></textarea>
                        </div>
                    </div>

                </div >
            </div >
        )

    return (
        <div className='w-100 h-auto px-3 d-flex'>
            <div className='w-50 h-100'>
                {/* avatar */}
                <div className='w-100 h-50 d-flex justify-content-center px-5'>
                    {
                        Avatar ?
                            <img src={Avatar} alt="" className='h-100' />
                            :
                            <div className='d-flex justify-content-center align-items-center'>
                                <label htmlFor="avatar">
                                    <div className='select-file-label'>
                                        <AiOutlinePlus />
                                    </div>
                                    <p className='text-center mt-2'>Avatar</p>
                                </label>
                                <input className='d-none' onChange={e => onSelectAvatar(e.target.files[0])} type="file" id='avatar' />
                            </div>
                    }
                </div>
            </div>

            < div className='w-50 h-100' >
                < div className='w-100 h-100 d-flex flex-column gap-2' >
                    {/* <div className='w-50 h-auto'> */}
                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Fullname</span>
                        </div>
                        <input type="text" ref={fullname} className="form-control" placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1" />
                    </div >

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Address</span>
                        </div>
                        <input type="text" ref={address} className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                    </div>

                    <div className="d-flex gap-3">
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Email</span>
                            </div>
                            <input type="text" ref={email} className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Degree</span>
                            </div>
                            <input type="text" ref={degree} className="form-control" placeholder="Degree" aria-label="Degree" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Sex</span>
                            </div>
                            <select ref={gender} className="form-select" aria-label="Default select example">
                                <option value="male">Male</option>
                                <option value="female" selected='selected' >Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Date of birth</span>
                            </div>
                            <input type="date" ref={dateOfBirth} className="form-control" placeholder="DateofBirth" aria-label="DateofBirth" />

                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Phone</span>
                            </div>
                            <input type="text" ref={phone} className="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Room</span>
                            </div>
                            <select className="form-select" ref={roomId} aria-label="Default select example">
                                {
                                    room &&
                                    room.map(item => <option value={item._id}>{item.room}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea ref={profile} className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>

                </div >

            </div >
        </div >
    )
}

export default DoctorDetail