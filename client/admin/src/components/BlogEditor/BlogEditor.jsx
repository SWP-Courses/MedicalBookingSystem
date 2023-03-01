import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogEditor({ BlogDetail, categoryList, setNewValue, setNewTitle, setCatagoryId, setAuthor, catagoryId, author, newTitle, newValue }) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    useEffect(() => {
        if (BlogDetail) {
            setAuthor(BlogDetail.author);
            setCatagoryId(BlogDetail.category_id);
            setNewTitle(BlogDetail.newTitle);
            setNewValue(BlogDetail.content);
        }
    }, [BlogDetail])


    if (BlogDetail) {
        return (
            <div className='w-100 h-100 col-12'>
                <select className="form-select filter-select" onChange={e => setCatagoryId(e.target.value)} style={{ width: "20%" }} defaultValue={BlogDetail.category_id} aria-label="Default select example">
                    {
                        categoryList.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                    }

                </select>

                <div className='d-flex h-auto gap-2 my-2'>
                    <div class="input-group w-50">
                        <span class="input-group-text" id="basic-addon1">Author</span>
                        <input type="text" class="form-control" defaultValue={BlogDetail.author} onChange={(e) => setAuthor(e.target.value)} placeholder="" aria-label="" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group w-50">
                        <span class="input-group-text" id="basic-addon1">Title</span>
                        <input type="text" class="form-control" defaultValue={BlogDetail.title} onChange={(e) => setNewTitle(e.target.value)} placeholder="" aria-label="" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <ReactQuill theme="snow"
                    modules={modules}
                    formats={formats}
                    defaultValue={BlogDetail.content}
                    onChange={(e) => setNewValue(e)}
                >
                </ReactQuill>
            </div>
        )
    }

    return (
        <div className='w-100 h-100 col-12'>
            <select className="form-select filter-select" style={{ width: "20%" }} value={catagoryId} defaultValue="63e42871041a52f4ee462576" onChange={e => setCatagoryId(e.target.value)} aria-label="Default select example">
                {
                    categoryList.map(category => <option key={category._id} value={category._id} >{category.name}</option>)
                }

            </select>
            <div className='d-flex h-auto gap-2 my-2'>
                <div class="input-group w-50">
                    <span class="input-group-text" id="basic-addon1">Author</span>
                    <input type="text" class="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="" aria-label="" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group w-50">
                    <span class="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" class="form-control" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="" aria-label="" aria-describedby="basic-addon1" />
                </div>
            </div>
            <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                onChange={(e) => setNewValue(e)}
                value={newValue}
            >
            </ReactQuill>
        </div>
    )
}

export default BlogEditor