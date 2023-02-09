import React, { useEffect, useRef } from 'react'
import src from "../../assets/images/avatar.jpg"
import toastOption from '../../config/toast';

function ServiceDetail({ serviceDetail, serviceName, serviceDescription, servicePrice }) {
    if (!serviceDetail) return (
        <div className='w-100 h-auto px-3 d-flex'>
            < div className='w-100 h-100' >
                < div className='w-100 h-100 d-flex flex-column gap-2' >
                    {/* <div className='w-50 h-auto'> */}
                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" ref={serviceName} className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                    </div >

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Price</span>
                        </div>
                        <input type="number" ref={servicePrice} className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
                    </div>

                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea ref={serviceDescription} className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>

                </div >

            </div >
        </div >
    )

    return (
        <div className='w-100 h-auto px-3 d-flex'>

            < div className='w-100 h-100' >
                < div className='w-100 h-100 d-flex flex-column gap-2' >
                    {/* <div className='w-50 h-auto'> */}
                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" ref={serviceName} defaultValue={serviceDetail.name} className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                    </div >

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Price</span>
                        </div>
                        <input type="number" ref={servicePrice} defaultValue={serviceDetail.price} className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
                    </div>

                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea ref={serviceDescription} className="form-control" defaultValue={serviceDetail.description} id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>

                </div >

            </div >
        </div >
    )
}

export default ServiceDetail