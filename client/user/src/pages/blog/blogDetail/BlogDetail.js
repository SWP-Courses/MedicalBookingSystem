import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./BlogDetail.scss";
import doctor from "~/assets/images/doctor.jpg";
import { AuthContext } from "~/context/authContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import API_URL from "~/api/Router";
import { StoreContext } from "~/context/storeContext";

function BlogDetail() {
  const { setRoutingHistory } = useContext(StoreContext);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const refBlog = useRef();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  console.log(blog);

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
              <Link to="/blogs/:id">Blog Detail</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="blog-content">
          <div className="blog-wrapper">
            {currentUser?.role !== "doctor" && (!isSaved ? (
              <button className="saveBlog" onClick={handleSaveBlogClick}>
                LƯU
              </button>
            ) : (
              <button className="saveBlog" onClick={handleUnSaveBlogClick}>
                HUỶ LƯU
              </button>
            ))}
            <h1 className="blog-title">{blog?.title}</h1>
            <h6>Ngày đăng: {blog.createdAt}</h6>
            <img className="blog-detail-image" src={blog?.image} alt="" />
            <div className="content-box" ref={refBlog}>
              <h2 className="sub-title">1. Vai trò của Vitamin D</h2>
              {
                // refBlog.current.innerHTML = blog.content
              }
            </div>
          </div>
          <div className="sub-infor">
            <div className="doctor-info">
              <Link to="/">
                <img src={doctor} alt="doctor-img" className="doctor-avarta" />
              </Link>
              <span className="doctor-name">{blog.author}</span>
              <p className="desc">
                Khoa Gây mê giảm đau - Bệnh viện Đa khoa Quốc tế Vinmec Times
                City
              </p>
              <Link to="/doctors/id" className="link-to-detail">
                Xem thông tin bác sĩ &gt;&gt;
              </Link>
            </div>
            <div className="more-blogs">
              <div className="single-blog">
                <h3 className="single-blog-title">Có thể bạn quan tâm</h3>
                <div className="sub-blog">
                  <a href="">
                    <img className="blog-sub-image" src={doctor} />
                  </a>
                  <div className="blog-sub-title">
                    <a href="" className="blog-sub-title-link">
                      Cortisol là gì và làm thế nào để điều chỉnh mức độ
                      Cortisol?
                    </a>
                  </div>
                </div>
                <div className="sub-blog">
                  <a href="">
                    <img className="blog-sub-image" src={doctor} />
                  </a>
                  <div className="blog-sub-title">
                    <a href="" className="blog-sub-title-link">
                      Cortisol là gì và làm thế nào để điều chỉnh mức độ
                      Cortisol?
                    </a>
                  </div>
                </div>
                <div className="sub-blog">
                  <a href="">
                    <img className="blog-sub-image" src={doctor} />
                  </a>
                  <div className="blog-sub-title">
                    <a href="" className="blog-sub-title-link">
                      Cortisol là gì và làm thế nào để điều chỉnh mức độ
                      Cortisol?
                    </a>
                  </div>
                </div>
                <div className="sub-blog">
                  <a href="">
                    <img className="blog-sub-image" src={doctor} />
                  </a>
                  <div className="blog-sub-title">
                    <a href="" className="blog-sub-title-link">
                      Cortisol là gì và làm thế nào để điều chỉnh mức độ
                      Cortisol?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
