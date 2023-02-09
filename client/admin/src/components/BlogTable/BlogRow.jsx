import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import "./blogrow.css"
import dayjs from 'dayjs'
import CofirmDeletePopup from './CofirmDeletePopup';

function BlogRow({ onClickEditBlog, stt, blog, onDeleteBlogById }) {
    const [deletePopup, setDeletePopup] = useState(false);

    const onConfilmDelete = () => {
        onDeleteBlogById(blog.id)
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
                <td className='text-center'> {dayjs(blog.create_at).format('MMM D, YYYY')} </td>
                <td className='text-center blog-action'><HiOutlineDotsHorizontal className='fs-4' /></td>
                <div className='popup-action'>
                    <button onClick={() => setDeletePopup(true)} className='btn bg-light text-danger text-center w-100'>Delete</button>
                    <button className='btn bg-light w-100' onClick={() => onClickEditBlog()}>Edit</button>
                </div>
            </tr>
            {deletePopup ? <CofirmDeletePopup onConfilmDelete={onConfilmDelete} onCancelDelete={onCancelDelete} /> : undefined}
        </>
    )
}

export default BlogRow