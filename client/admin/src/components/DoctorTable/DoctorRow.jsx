import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import CofirmDeletePopup from '../BlogTable/CofirmDeletePopup';

function DoctorRow({ onDeleteBlogById, doctor, stt, onClickEditDoctor }) {
    const [deletePopup, setDeletePopup] = useState(false);

    const onConfilmDelete = () => {
        onDeleteBlogById(doctor._id)
        setDeletePopup(false)
    }

    const onCancelDelete = () => {
        setDeletePopup(false)
    }

    return (
        <>
            <tr className='position-relative'>
                <th scope="row">{stt}</th>
                <td className='mw-50 overflow-hidden'> {doctor.fullname} </td>
                <td className='text-center'> {doctor.special} </td>
                <td className='text-center'> {doctor.email} </td>
                <td className='text-center blog-action'><HiOutlineDotsHorizontal className='fs-4' /></td>
                <div className='popup-action'>
                    <button onClick={() => setDeletePopup(true)} className='btn bg-light text-danger text-center w-100'>Delete</button>
                    <button className='btn bg-light w-100' onClick={() => onClickEditDoctor(doctor._id)}>Detail</button>
                </div>
            </tr>
            {deletePopup ? <CofirmDeletePopup onConfilmDelete={onConfilmDelete} onCancelDelete={onCancelDelete} /> : undefined}
        </>
    )
}

export default DoctorRow