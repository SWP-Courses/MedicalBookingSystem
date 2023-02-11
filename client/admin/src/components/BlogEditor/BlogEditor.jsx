import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogEditor({ setValue, value }) {
    return (
        <div className='w-100 h-100 col-12'>
            <ReactQuill theme="snow" className='h-100' value={value} onChange={setValue} />
        </div>
    )
}

export default BlogEditor