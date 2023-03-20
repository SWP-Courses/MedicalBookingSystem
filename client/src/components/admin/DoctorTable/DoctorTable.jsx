import React, { useEffect, useState } from 'react'
import DoctorRow from './DoctorRow'

function DoctorTable({ onClickEditDoctor, doctors, onDeleteBlogById }) {
    const [doctorList, setDoctorList] = useState(doctors);

    useEffect(() => {
        if (!doctors) return;
        setDoctorList(doctors);
    }, [doctors])

    if (!doctorList) return (
        <p>Loading...</p>
    )


    return (
        <>
            {/* Filter */}
            <div className='w-100 d-flex justify-content-between'>
                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <input type="text" className="form-control" style={{ width: "30%" }} placeholder="Search by title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                <button className="btn btn-primary" type="submit" style={{ width: "10%" }}> Apply </button>
            </div>

            <div className='mt-1 p-3'>
                <table className="table border mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th className='text-center' scope="col">Email</th>
                            <th className='text-center' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorList ?
                            doctorList.map((doctor, index) => <DoctorRow key={doctor._id} onDeleteBlogById={onDeleteBlogById} onClickEditDoctor={onClickEditDoctor} doctor={doctor} stt={index + 1} />)
                            : undefined
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DoctorTable