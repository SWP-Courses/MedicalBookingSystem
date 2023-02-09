import React from 'react'
import src from "../../assets/images/avatar.jpg"

function ServiceDetail({ serviceDetail }) {
    console.log(serviceDetail)
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
                            <span class="w-25" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                    </div >

                    <div class="input-group">
                        <div class="input-group-prepend w-100">
                            <span class="w-25" id="basic-addon1">Price</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
                    </div>


                    <div class="input-group d-flex flex-column">
                        <label for="exampleDataList" class="form-label m-0">Doctor</label>
                        <input class="form-control w-100" list="datalistOptions" id="exampleDataList" placeholder="Type name to search..." />
                        <datalist id="datalistOptions">
                            <option value="San Francisco" />
                            <option value="New York" />
                            <option value="Seattle" />
                            <option value="Los Angeles" />
                            <option value="Chicago" />
                        </datalist>
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

export default ServiceDetail