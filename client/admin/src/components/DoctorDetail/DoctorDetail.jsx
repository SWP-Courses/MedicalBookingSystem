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
                        <div div class="input-group" >
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Fullname</span>
                            </div>
                            <input type="text" class="form-control" defaultValue={doctorDetail.fullname} placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1" />
                        </div >

                        <div class="input-group">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Address</span>
                            </div>
                            <input type="text" class="form-control" defaultValue={doctorDetail.address} placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                        </div>

                        <div className='d-flex gap-3'>
                            <div class="input-group">
                                <div class="input-group-prepend w-100">
                                    <span class="w-25" id="basic-addon1">Username</span>
                                </div>
                                <input type="text" class="form-control" defaultValue={doctorDetail.username} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>

                            <div class="input-group">
                                <div class="input-group-prepend w-100">
                                    <span class="w-25" id="basic-addon1">Email</span>
                                </div>
                                <input type="text" class="form-control" defaultValue={doctorDetail.email} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div class="input-group w-50">
                                <div class="input-group-prepend w-100">
                                    <span class="w-25" id="basic-addon1">Sex</span>
                                </div>
                                <select class="form-select" defaultValue={doctorDetail.sex} aria-label="Default select example">
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="3">Khác</option>
                                </select>

                            </div>
                            <div class="input-group w-50">
                                <div class="input-group-prepend w-100">
                                    <span class="w-25" id="basic-addon1">Date of birth</span>
                                </div>
                                <input defaultValue={dayjs(doctorDetail.dateOfBirth).format('YYYY-MM-DD')} type="date" class="form-control" placeholder="DateofBirth" aria-label="DateofBirth" />

                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div class="input-group w-50">
                                <div class="input-group-prepend w-100">
                                    <span class="w-25" id="basic-addon1">Phone</span>
                                </div>
                                <input type="text" defaultValue={doctorDetail.phone} class="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                            </div>

                            <div class="input-group w-50">
                                <div class="input-group-prepend w-100">
                                    <span class="w-25" id="basic-addon1">Specialist</span>
                                </div>
                                <select class="form-select" aria-label="Default select example">
                                    <option value="1">Mắt</option>
                                    <option value="2">Mũi</option>
                                    <option value="3">Miệng</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" defaultValue={doctorDetail.description} rows="8"></textarea>
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
                    <div div class="input-group" >
                        <div class="input-group-prepend w-100">
                            <span class="w-25" id="basic-addon1">Fullname</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1" />
                    </div >

                    <div class="input-group">
                        <div class="input-group-prepend w-100">
                            <span class="w-25" id="basic-addon1">Address</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                    </div>

                    <div className='d-flex gap-3'>
                        <div class="input-group">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Username</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div class="input-group">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Email</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div class="input-group w-50">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Sex</span>
                            </div>
                            <select class="form-select" aria-label="Default select example">
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="3">Khác</option>
                            </select>

                        </div>
                        <div class="input-group w-50">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Date of birth</span>
                            </div>
                            <input type="date" class="form-control" placeholder="DateofBirth" aria-label="DateofBirth" />

                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div class="input-group w-50">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Phone</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
                        </div>

                        <div class="input-group w-50">
                            <div class="input-group-prepend w-100">
                                <span class="w-25" id="basic-addon1">Specialist</span>
                            </div>
                            <select class="form-select" aria-label="Default select example">
                                <option value="1">Mắt</option>
                                <option value="2">Mũi</option>
                                <option value="3">Miệng</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>

                </div >

            </div >
        </div >
    )
}

export default DoctorDetail