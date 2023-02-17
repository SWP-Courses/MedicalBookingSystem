import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import "./blogrow.css"
import dayjs from 'dayjs'
import CofirmDeletePopup from './CofirmDeletePopup';
import axios from 'axios';
import ROUTER from '../../api/Router';
import { toast } from 'react-toastify';
import toastOption from '../../config/toast';

function BlogRow({ onClickEditBlog, stt, blog, onDeleteBlogById }) {
    const [deletePopup, setDeletePopup] = useState(false);

    const onConfilmDelete = async () => {
        if (!blog._id) return;
        try {
            const result = await axios.delete(`${ROUTER}/api/blog/${blog._id}`);
            if (result.status === 200) {
                toast.success("Susscess!", toastOption);
                onDeleteBlogById(blog._id);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error!", toastOption);
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
                <td className='mw-50 overflow-hidden'>{blog.title}</td>
                <td className='text-center'> {dayjs(blog.createdAt).format('MMM D, YYYY')} </td>
                <td className='text-center blog-action'><HiOutlineDotsHorizontal className='fs-4' /></td>
                <div className='popup-action'>
                    <button onClick={() => setDeletePopup(true)} className='btn bg-light text-danger text-center w-100'>Delete</button>
                    <button className='btn bg-light w-100' onClick={() => onClickEditBlog(blog._id)}>Edit</button>
                </div>
            </tr>
            {deletePopup ? <CofirmDeletePopup onConfilmDelete={onConfilmDelete} onCancelDelete={onCancelDelete} /> : undefined}
        </>
    )
}

export default BlogRow