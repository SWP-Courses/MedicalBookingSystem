import "./Blog.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import API_URL from "~/api/Router";
import ReactPaginate from "react-paginate";
import slider from "~/assets/images/slider.jpg";
import Pagination from "./Pagination";
import ReactHtmlParser from 'react-html-parser';

function Blogs() {
  const listBlogRef = useRef();
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsFiltered, setBlogsFiltered] = useState([]);
  const [categoryName, setCategoryName] = useState('Tổng Hợp Các Bài Viết');

  console.log('check blog filtered : ', blogsFiltered);

  const location = useLocation();

  console.log(blogs);

  const navigate = useNavigate();

  useEffect(() => {
    fetchListCategoryBlogs();
    fetchBlogs();
  }, []);

  const fetchListCategoryBlogs = async () => {
    const res = await axios.get(API_URL + '/categories');
    console.log('check res cate: ', res);
    if (res && res.data && res.data.category && res.data.category.length > 0) {
      setBlogCategory(res.data.category);
    }
  };

  const fetchBlogs = async () => {
    const res = await axios.get(API_URL + "/blogs");
    // console.log('check res blog: ', res);
    if (res && res.data && res.data.blogs && res.data.blogs.length > 0) {
      listBlogRef.current = res.data.blogs;
      setBlogs(res.data.blogs);
    }
  };

  const handleFilterBlogByCategoryId = (category) => {
    let newBlogList = listBlogRef?.current?.filter(
      (blog) => blog.category_id === category._id
    );
    setBlogs(newBlogList);
    setCategoryName(category.name);
  };

  return (
    <div className="Blog-wrapper">
      <div className="blog-content">
        <div className="slider">
          <img src={slider} alt="slider" className="slider-body" />
        </div>
        <div className="blog-body">
          <div className="major-list">
            <ul className="list">
              <li className="item">
                <h5>Nội Dung</h5>
                <div className="line"></div>
              </li>
              {blogCategory.map((category, index) => {
                return (
                  <li className="item" key={index}>
                    <span
                      onClick={() => handleFilterBlogByCategoryId(category)}
                    >
                      {category.name}
                    </span>
                    <div className="line"></div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="blog-list">
            <h1 className="type">{categoryName}</h1>
            <hr />
            <Pagination data={blogs}/>
            {
              
            }
          </div>
        </div>
        <div className="paginate">
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
