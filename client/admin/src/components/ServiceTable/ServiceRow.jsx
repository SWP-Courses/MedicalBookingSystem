import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import CofirmDeletePopup from '../BlogTable/CofirmDeletePopup';

function ServiceRow({ onDeleteBlogById, service, stt, onClickEditService }) {
    const [deletePopup, setDeletePopup] = useState(false);

    const onConfilmDelete = () => {
        onDeleteBlogById(service.id)
        setDeletePopup(false)
    }

    const onCancelDelete = () => {
        setDeletePopup(false)
    }

    return (
        <>
            <tr className='position-relative'>
                <th scope="row">{stt}</th>
                <td className='mw-50 overflow-hidden'> {service.name} </td>
                <td className='text-center'> {service.fullname} </td>
                <td className='text-center'> {service.price} </td>
                <td className='text-center blog-action'><HiOutlineDotsHorizontal className='fs-4' /></td>
                <div className='popup-action'>
                    <button onClick={() => setDeletePopup(true)} className='btn bg-light text-danger text-center w-100'>Delete</button>
                    <button className='btn bg-light w-100' onClick={() => onClickEditService(service.id)}>Detail</button>
                </div>
            </tr>
            {deletePopup ? <CofirmDeletePopup onConfilmDelete={onConfilmDelete} onCancelDelete={onCancelDelete} /> : undefined}
        </>
    )
}

export default ServiceRow