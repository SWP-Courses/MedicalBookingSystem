import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./BlogDetail.scss";
import { AuthContext } from "~/context/authContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import API_URL from "~/api/Router";
import { StoreContext } from "~/context/storeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solid } from "@fortawesome/free-solid-svg-icons";

function BlogDetail() {
  const { setRoutingHistory } = useContext(StoreContext);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const refBlog = useRef();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const [sameContent, setSameContent] = useState([]);

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs/${id}`);
        if (res && res.data && res.data.blogs) {
          setBlog(res.data.blogs);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogById();
  }, [id]);

  useEffect(() => {
    refBlog.current.innerHTML = blog.content;
  });

  useEffect(() => {
    const filterBlogSameCategory = async() => {
      try {
        const res = await axios.get(API_URL + "/blogs");
        if (res && res.data && res.data.blogs && res.data.blogs.length > 0) {
            const subBlogs = res.data.blogs.filter((item) => item._id === id);
            setSameContent(subBlogs);
        }
      } catch (error) {
        console.log(error);
      }
    }
    filterBlogSameCategory();
 }, [id])

  // Khoa
  useEffect(() => {
    // nếu có đăng nhập thì check blog đang xem có đã được lưu chưa
    if (currentUser) {
      const fetchSavedBlogs = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/blogs/saved/${currentUser._id}`
          );
          if (res.data) {
            res.data.forEach(
              (sblog) => sblog.blog_id === id && setIsSaved(true)
            );
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchSavedBlogs();
    }
  }, [currentUser, id]);

  const handleSaveBlogClick = async () => {
    if (!currentUser) {
      setRoutingHistory((prev) => ({
        ...prev,
        beforeLogin: location.pathname,
      }));
      navigate("/login");
    } else {
      try {
        await axios.post(`${API_URL}/blogs/save/${id}/${currentUser._id}`);
        setIsSaved(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUnSaveBlogClick = async () => {
    try {
      await axios.delete(`${API_URL}/blogs/unsave/${id}/${currentUser._id}`);
      setIsSaved(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-body">
        <div className="bread-crumb">
          <Breadcrumb>
            <Breadcrumb.Item href="#">
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
              <Link to="/blogs">Blogs</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <Link to='#'>Blog Detail</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="blog-content">
          <div className="blog-wrapper">
{currentUser?.role !== "doctor" && (!isSaved ? (
              <>
                <FontAwesomeIcon icon={faBookmark} className="saveBlog" onClick={handleSaveBlogClick}/>
                {/* <button className="saveBlog" onClick={handleSaveBlogClick}>
                  LƯU
                </button> */}
              </>
            ) : (
              <>
              <FontAwesomeIcon icon={solid} className="saveBlog" onClick={handleUnSaveBlogClick}/>
                {/* <button className="saveBlog" onClick={handleUnSaveBlogClick}>
                  HUỶ LƯU
                </button> */}
              </>
            ))}
            <div className="blog-detail">
              <h1 className="blog-title">{blog?.title}</h1>
              <div className="content-box" ref={refBlog}>
                <h2 className="sub-title">1. Vai trò của Vitamin D</h2>
                {
                  // refBlog.current.innerHTML = blog.content
                }
              </div>
            </div>
          </div>
          <div className="sub-infor">
            <div className="doctor-info">
              <div className="date-section">
                <span className="post-date">Ngày đăng:</span>
                <span className="date">{blog.createdAt}</span>
              </div>
              <div className="author"> 
                <span className="title">Thuộc Chủ Đề</span>
              </div>  
              <div className="author">
                <span className="title">Tác Giả</span>
                <span className="doctor-name">{blog.author}</span>
              </div>
            </div>
            <div className="more-blogs">
              <div className="single-blog">
                <h4 className="single-blog-title">Có thể bạn quan tâm</h4>
                {
                  sameContent.map((item) => {
                    return (
                      <div className="sub-blog">
                        <Link to={`/blogs/${blog._id}`}>
                          <img className="blog-sub-image" src={item.image} />
                        </Link>
                        <div className="blog-sub-title ">
                          <Link to={`/blogs/${blog._id}`} className="blog-sub-title-link line-clamp line-4">
                            {item.subTitle}
                          </Link>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
