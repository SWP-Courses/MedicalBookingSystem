import React, { useState } from 'react'
import { BsArrowLeft, BsPlus } from "react-icons/bs"
import BlogEditor from '../components/BlogEditor/BlogEditor'
import BlogTable from '../components/BlogTable/BlogTable'

const Blog = () => {
  const [value, setValue] = useState('');
  const [createBlog, setCreateBlog] = useState(false);
  const [blogId, setBlogId] = useState(undefined);

  const onChangeView = () => {
    setCreateBlog(!createBlog);
  }

  const onClickEditBlog = (id) => {
    setCreateBlog(true);
    setBlogId(id)
  }

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row '>

        {/* Header */}
        <div class="col-12 d-flex align-items-center py-3 justify-content-between">
          {
            createBlog ?
              <button onClick={onChangeView} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button> :
              <h4 className='m-0'>BLOG</h4>
          }
          {
            createBlog ? <button class="btn btn-primary" style={{ width: "10%" }} type="submit"> Save </button> : <button class="btn btn-primary" onClick={onChangeView} style={{ width: "10%" }} type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {/* Table */}
        {
          createBlog ?
            <BlogEditor setValue={setValue} value={value} /> :
            <BlogTable onClickEditBlog={onClickEditBlog} />
        }


      </div>
    </div>
  )
}

export default Blog