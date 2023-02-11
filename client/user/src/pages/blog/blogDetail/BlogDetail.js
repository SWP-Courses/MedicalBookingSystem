import { Link, useLocation, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./BlogDetail.scss";
import doctor from "~/assets/images/doctor.jpg";
import { AuthContext } from "~/context/authContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

function BlogDetail() {
  const { setRoutingHistory } = useContext(AuthContext);
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const refBlog = useRef();

  console.log(blog);

  useEffect(() => {
    fetchBlogById();
  }, []);

  useEffect(() => {
    refBlog.current.innerHTML = blog.content;
  });

  const fetchBlogById = async () => {
    const res = await axios.get(`/blog/${id}`);
    console.log("check res: ", res);
    if (res && res.data && res.data.blogs) {
      setBlog(res.data.blogs);
    }
  };

  console.log("mounted");
  return (
    <div className="blog-detail-wrapper">
      {/* <button
        className="saveBlog"
        onClick={() =>
          setRoutingHistory((prev) => ({
            ...prev,
            beforeLogin: location.pathname,
          }))
        }
      >
        Lưu
      </button> */}
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
            <div className="blog-detail">
              <h1 className="blog-title">{blog?.title}</h1>
              <img className="blog-detail-image" src={blog?.image} />
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
              <Link to="/">
                <img
                  src={doctor}
                  alt="doctor image"
                  className="doctor-avarta"
                />
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
