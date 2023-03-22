import React, { useEffect, useState } from 'react'
import DoctorRow from './DoctorRow'

function DoctorTable({ onClickEditDoctor, doctors, onDeleteBlogById }) {
    const [doctorList, setDoctorList] = useState(doctors);
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!doctors) return;
        setDoctorList(doctors);
    }, [doctors])

    useEffect(() => {
        if (search.length > 3) return
        setDoctorList(doctors)

    }, [search])

    if (!doctorList) return (
        <p>Loading...</p>
    )

    const onSearch = () => {
        if (search.length > 3) {
            setDoctorList(doctor => doctor.filter(doc => doc.fullname.toLowerCase().includes(search.toLowerCase())))
        }
    }

    return (
        <>
            {/* Filter */}
            <div className='w-100 d-flex justify-content-center'>
                <div className='d-flex gap-3 w-100 justify-content-center'>
                    <input onChange={e => setSearch(e.target.value)} type="text" className="form-control" style={{ width: '50%' }} placeholder="Search by title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    <button onClick={onSearch} className="btn btn-primary px-5" type="submit"> Search </button>
                </div>
            </div>

            <div className='mt-1 p-3'>
                <table className="table mt-3">
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