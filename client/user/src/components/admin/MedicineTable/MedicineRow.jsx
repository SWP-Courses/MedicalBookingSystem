import axios from 'axios';
import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { toast } from 'react-toastify';
import ROUTER from '~/api/adminRouter';
import toastOption from '~/config/toast';
import useFormatMoney from '~/hooks/useFormatMoney';
import ConfirmDeletePopup from '../UI/ConfirmDeletePopup';

function MedicineRow({ onDeleteMedicineById, medicine, stt, onClickEditMedicine }) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [formatMoney] = useFormatMoney();

    const onConfirmDelete = async () => {
        if (!medicine._id) return;
        try {
            const result = await axios.delete(`${ROUTER}/api/medicine/${medicine._id}`);
            console.log(result);
            if (result.status === 200) {
                toast.success("Success!", toastOption);
                onDeleteMedicineById(medicine._id);
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
                <td className='mw-50 overflow-hidden'> {medicine.name} </td>
                <td className='mw-50 overflow-hidden'> {medicine.dosageForm} </td>
                <td className='mw-50 overflow-hidden'> {medicine.type} </td>
                <td className='text-center'> {formatMoney(medicine.price)} </td>
                <td className='text-end blog-action'><HiOutlineDotsHorizontal className='fs-4' /></td>
                <div className='popup-action'>
                    <button onClick={() => setDeletePopup(true)} className='btn bg-light text-danger text-center w-100'>Delete</button>
                    <button className='btn bg-light w-100' onClick={() => onClickEditMedicine(medicine._id)}>Edit</button>
                </div>
            </tr>
            
            {deletePopup ? (
                <ConfirmDeletePopup
                    onConfirmDelete={onConfirmDelete}
                    onCancelDelete={onCancelDelete}
                    itemDeleteName={medicine.name}
                />
            ) : undefined}
        </>
    )
}

export default MedicineRow