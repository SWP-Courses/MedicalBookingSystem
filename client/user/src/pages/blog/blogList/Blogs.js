import "./Blog.scss";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import API_URL from "~/api/Router";
import Pagination from 'react-bootstrap/Pagination';

function Blogs() {

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }


  const [blogCategory, setBlogCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsFiltered, setBlogsFiltered] = useState([]);
  const [categoryName, setCategoryName] = useState('Tổng Hợp Các Bài Viết');

  console.log('check blog filtered : ', blogsFiltered);

  const location = useLocation();

  console.log(location);

  const navigate = useNavigate();

  useEffect(() => {
    fetchListCategoryBlogs();
    fetchBlogs();
  }, [])


  const fetchListCategoryBlogs = async () => {
    const res = await axios.get(API_URL+'/category');
    console.log('check res cate: ', res);
    if(res && res.data && res.data.category && res.data.category.length > 0) {
      setBlogCategory(res.data.category);
    }
  }

  const fetchBlogs = async () => {
    const res = await axios.get(API_URL+'/blog');
    console.log('check res blog: ', res);
    if(res && res.data && res.data.blogs && res.data.blogs.length > 0) {
      setBlogs(res.data.blogs)
    }
  }

  const handleFilterBlogByCategoryId = (category) => {
    let newBlogList = blogs.filter((blog) => blog.category_id === category._id);
    setBlogsFiltered(newBlogList);
    setCategoryName(category.name);
  }

  return (
    <div className="Blog-wrapper">
      <div className="blog-content">
        <div className="slider">
          <div className="slider-body">Slider</div>
        </div>
        <div className="blog-body">
          <div className="major-list">
            <ul className="list">
              <li className="item">
                <h5>Nội Dung</h5>
                <div className="line"></div>
              </li>
              {
                blogCategory.map((category, index) => {
                  return (
                    <li className="item" key={index}>
                      <span 
                        onClick={() => handleFilterBlogByCategoryId(category)}
                      >
                        {category.name}
                      </span>
                      <div className="line"></div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="blog-list">
            <h1 className="type">{categoryName}</h1>
            <hr />
            {
              blogsFiltered.length > 0 ? 
              blogsFiltered.map((blog, index) => {
                return (
                  <div key={index} className="blog-item">
                  <Link  to={`/blogs/${blog._id}`}>
                      <img
                        className="blog-image"
                        src={blog.image}
                        alt="blog-image"
                      />
                    </Link>
                    <div className="blog-item-body">
                      <h2 className="bolg-item-title line-clamp">
                        {blog.title}
                      </h2>
                      <p 
                        className="line-clamp line-4"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(blog.content),
                        }}
                      >
                        {
                          // blog.content
                        }
                      </p>
                    </div>
                  </div>
                )
              })
              :
              blogs.map((blog, index) => {
                return (
                  <div key={index} className="blog-item">
                    <Link  to={`/blogs/${blog._id}`}>
                      <img
                        className="blog-image"
                        src={blog.image}
                        alt="blog-image"
                      />
                    </Link>
                    <div className="blog-item-body">
                      <Link to={`/blogs/${blog._id}`}>
                        <h2  
                          className="bolg-item-title line-clamp"
                          style={{ fontSize: '25px', cursor: 'pointer' }}
                        >
                          {blog.title}
                        </h2>
                      </Link>
                      <p 
                        className="line-clamp line-4"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(blog.content),
                        }}
                      >
                        {
                          // blog.content
                        }
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="paginate">
          <span>
            <Pagination size="lg">{items}</Pagination>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
