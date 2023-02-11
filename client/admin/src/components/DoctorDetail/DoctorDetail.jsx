import dayjs from 'dayjs'
import React, { memo } from 'react'
import src from "../../assets/images/avatar.jpg"

function DoctorDetail({ doctorDetail }) {

    if (doctorDetail)
        return (
            <div className='w-100 h-auto px-3 d-flex'>
                <div className='w-50 h-100'>
                    {/* avatar */}
                    <div className='w-100 h-50 d-flex justify-content-center px-5'>
                        <img src={doctorDetail.avatar} alt="" className='h-100' />
                    </div>
                </div>

                < div className='w-50 h-100' >
                    < div className='w-100 h-100 d-flex flex-column gap-2' >
                        {/* <div className='w-50 h-auto'> */}
                        <div div className="input-group" >
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Fullname</span>
                            </div>
                            <input type="text" className="form-control" defaultValue={doctorDetail.fullname} placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Address</span>
                            </div>
                            <input type="text" className="form-control" defaultValue={doctorDetail.address} placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                        </div>

                        <div className='d-flex gap-3'>
                            <div className="input-group">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Username</span>
                                </div>
                                <input type="text" className="form-control" defaultValue={doctorDetail.username} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Email</span>
                                </div>
                                <input type="text" className="form-control" defaultValue={doctorDetail.email} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Sex</span>
                                </div>
                                <select className="form-select" defaultValue={doctorDetail.sex} aria-label="Default select example">
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="3">Khác</option>
                                </select>

                            </div>
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Date of birth</span>
                                </div>
                                <input defaultValue={dayjs(doctorDetail.dateOfBirth).format('YYYY-MM-DD')} type="date" className="form-control" placeholder="DateofBirth" aria-label="DateofBirth" />

                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Phone</span>
                                </div>
                                <input type="text" defaultValue={doctorDetail.phone} className="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group w-50">
                                <div className="input-group-prepend w-100">
                                    <span className="w-25" id="basic-addon1">Specialist</span>
                                </div>
                                <select className="form-select" aria-label="Default select example">
                                    <option value="1">Mắt</option>
                                    <option value="2">Mũi</option>
                                    <option value="3">Miệng</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" defaultValue={doctorDetail.description} rows="8"></textarea>
                        </div>

                    </div >

                </div >
            </div >
        )

    return (
        <div className='w-100 h-auto px-3 d-flex'>
            <div className='w-50 h-100'>
                {/* avatar */}
                <div className='w-100 h-50 d-flex justify-content-center px-5'>
                    <img src={src} alt="" className='h-100' />
                </div>
            </div>

            < div className='w-50 h-100' >
                < div className='w-100 h-100 d-flex flex-column gap-2' >
                    {/* <div className='w-50 h-auto'> */}
                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Fullname</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1" />
                    </div >

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Address</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="input-group">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Username</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Email</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Sex</span>
                            </div>
                            <select className="form-select" aria-label="Default select example">
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="3">Khác</option>
                            </select>

                        </div>
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Date of birth</span>
                            </div>
                            <input type="date" className="form-control" placeholder="DateofBirth" aria-label="DateofBirth" />

                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Phone</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group w-50">
                            <div className="input-group-prepend w-100">
                                <span className="w-25" id="basic-addon1">Specialist</span>
                            </div>
                            <select className="form-select" aria-label="Default select example">
                                <option value="1">Mắt</option>
                                <option value="2">Mũi</option>
                                <option value="3">Miệng</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>

                </div >

            </div >
        </div >
    )
}

export default DoctorDetail