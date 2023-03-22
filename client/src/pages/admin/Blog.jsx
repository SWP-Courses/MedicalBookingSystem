import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsPlus } from "react-icons/bs"
import { toast } from 'react-toastify'
import ROUTER from '~/api/adminRouter'
import BlogEditor from '~/components/admin/BlogEditor/BlogEditor'
import BlogTable from '~/components/admin/BlogTable/BlogTable'
import toastOption from '~/config/toast'

const Blog = () => {
  const [createBlog, setCreateBlog] = useState(false);
  const [blogList, setBlogList] = useState();
  const [BlogDetail, setBlogDetail] = useState();
  const [categoryList, setCategoryList] = useState();
  const [description, setDescription] = useState();

  const [newValue, setNewValue] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [author, setAuthor] = useState('')
  const [catagoryId, setCatagoryId] = useState('63e42871041a52f4ee462576');

  // console.log(newTitle);
  // console.log(catagoryId);

  const onCreateBlog = () => {
    if (BlogDetail) setBlogDetail(null);
    setAuthor("");
    setNewTitle("");
    setNewValue("");
    setCatagoryId("");
    setDescription("");
    setCreateBlog(true);
  }

  const getAllBlog = async () => {
    try {
      const result = await axios.get(`${ROUTER}/api/blogs`);
      if (result.status === 200) {
        setBlogList(result.data.blogs);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllCategory = async () => {
    try {
      const result = await axios.get(`${ROUTER}/api/category`);
      if (result.status === 200) {
        setCategoryList(result.data.category);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const onClickEditBlog = (id) => {
    if (!id) return;
    setCreateBlog(true);
    setBlogDetail(blogList.find(blog => blog._id === id));
  }

  useEffect(() => {
    getAllBlog();
    getAllCategory();
  }, [])

  const updateList = (newItem, currentList) => {
    const list = [...currentList];
    const isExist = list.find(item => item._id === newItem._id);
    if (!isExist) return [...list, newItem];

    const indexOfItem = list.findIndex(item => item._id === newItem._id);
    list[indexOfItem] = newItem;
    return list;
  }

  const onClickSaveBlog = async () => {
    const data = {
      title: newTitle,
      category_id: catagoryId,
      content: newValue,
      author: author,
      description: description
    }

    try {
      const result = BlogDetail ? await axios.put(`${ROUTER}/api/blogs/${BlogDetail._id}`, data) : await axios.post(`${ROUTER}/api/blogs`, data);
      console.log(result);
      if (result.status === 200) {
        const newBlog = result.data.blogs;
        setBlogList(list => updateList(newBlog, list));
        toast.success("Susscess!", toastOption);

        if (BlogDetail) return;

        setAuthor("");
        setNewTitle("");
        setNewValue("");
        setCatagoryId("");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const onDeleteBlogById = (id) => {
    if (!id) return
    setBlogList(list => list.filter(list => list._id !== id));
  }


  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row '>

        {/* Header */}
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          {
            createBlog ?
              <button onClick={() => setCreateBlog(false)} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button> :
              <h4 className='m-0'>BLOG</h4>
          }
          {
            createBlog ? <button onClick={() => onClickSaveBlog()} className="btn btn-primary" style={{ width: "10%" }} type="submit"> Save </button> : <button className="btn btn-primary" onClick={onCreateBlog} style={{ width: "10%" }} type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {/* Table */}
        {
          createBlog ?
            <BlogEditor setDescription={setDescription} description={description} BlogDetail={BlogDetail} newValue={newValue} newTitle={newTitle} catagoryId={catagoryId} author={author} categoryList={categoryList} setAuthor={setAuthor} setCatagoryId={setCatagoryId} setNewValue={setNewValue} setNewTitle={setNewTitle} /> :
            <BlogTable onDeleteBlogById={onDeleteBlogById} onClickEditBlog={onClickEditBlog} blogs={blogList} />
        }
      </div>
    </div>
  )
}

export default Blog