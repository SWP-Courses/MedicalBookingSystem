import axios from 'axios';
import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { toast } from 'react-toastify';
import ROUTER from '../../api/Router';
import toastOption from '../../config/toast';
import useFormatMoney from '../../hooks/useFormatMoney';
import CofirmDeletePopup from '../BlogTable/CofirmDeletePopup';

function ServiceRow({ onDeleteBlogById, service, stt, onClickEditService }) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [formatMoney] = useFormatMoney();

    const onConfilmDelete = async () => {
        if (!service._id) return;
        try {
            const result = await axios.delete(`${ROUTER}/api/service/${service._id}`);
            console.log(result);
            if (result.status === 200) {
                toast.success("Susscess!", toastOption);
                onDeleteBlogById(service._id);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Create Error!", toastOption);
        }
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
                <td className='text-center'> {formatMoney(service.price)} </td>
                <td className='text-end blog-action'><HiOutlineDotsHorizontal className='fs-4' /></td>
                <div className='popup-action'>
                    <button onClick={() => setDeletePopup(true)} className='btn bg-light text-danger text-center w-100'>Delete</button>
                    <button className='btn bg-light w-100' onClick={() => onClickEditService(service._id)}>Detail</button>
                </div>
            </tr>
            {deletePopup ? <CofirmDeletePopup onConfilmDelete={onConfilmDelete} onCancelDelete={onCancelDelete} /> : undefined}
        </>
    )
}

export default ServiceRow