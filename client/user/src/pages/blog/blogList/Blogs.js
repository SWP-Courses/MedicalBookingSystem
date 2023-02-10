import "./Blog.scss";

import { useLocation, useNavigate } from "react-router-dom";
import doctor from "~/assets/images/doctor.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function Blogs() {

  const [blogCategory, setBlogCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const location = useLocation();

  console.log(location);

  const navigate = useNavigate();

  useEffect(() => {
    fetchListCategoryBlogs();
    fetchBlogs();
  }, [])


  const fetchListCategoryBlogs = async () => {
    const res = await axios.get('category');
    console.log('check res cate: ', res);
    if(res && res.data && res.data.category.length > 0) {
      setBlogCategory(res.data.category);
    }
  }

  const fetchBlogs = async () => {
    const res = await axios.get('blog');
    console.log('check res blog: ', res);
    if(res && res.data && res.data.blogs.length > 0) {
      setBlogs(res.data.blogs)
    }
  }

  const handleFetchBlogByCategoryId = (id) => {
    let newBlogList = blogs.filter((item) => item.category === id);
    console.log('checkBloglistzzzz: ', newBlogList);
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
                        onClick={() => handleFetchBlogByCategoryId(category.name)}
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
            <h1 className="type">Sức Khỏe Tổng Quát</h1>
            <hr />
            {
              blogs.map((blog, index) => {
                return (
                  <div key={index} className="blog-item">
                    <img
                      className="blog-image"
                      onClick={() => navigate(`/blogs/${blog._id}`)}
                      src={blog.image}
                      alt="blog-image"
                    />
                    <div className="blog-item-body">
                      <h2 className="bolg-item-title line-clamp">
                        {blog.title}
                      </h2>
                      <p className="line-clamp line-4">
                        {/* Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                        nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                        để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                        lịch tiêm, loại vắc xin nào không thể? Những lưu ý quan trọng
                        trước khi khám sức khỏe tổng quát Trong thời điểm dịch bệnh
                        Covid-19 vẫn đang diễn ra phức tạp, nhiều cha mẹ băn khoăn
                        không biết có nên đưa con đến bệnh viện để tiêm phòng không.
                        Loại vắc xin nào có thể được trì hoãn lịch tiêm, loại vắc xin
                        nào không thể? Những lưu ý quan trọng trước khi khám sức khỏe
                        tổng quát Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra
                        phức tạp, nhiều cha mẹ băn khoăn không biết có nên đưa con đến
                        bệnh viện để tiêm phòng không. Loại vắc xin nào có thể được
                        trì hoãn lịch tiêm, loại vắc xin nào không thể? */}
                        {
                          blog.content
                        }
                      </p>
                    </div>
                  </div>
                )
              })
            }

            <div className="blog-item">
              <img
                className="blog-image"
                onClick={() => navigate("/blogs-detail")}
                src={doctor}
                alt="blog-image"
              />
              <div className="blog-item-body">
                <h2 className="bolg-item-title">
                  Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
                </h2>
                <p>
                  Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                  nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                  để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                  lịch tiêm, loại vắc xin nào không thể?
                </p>
              </div>
            </div>
            <div className="blog-item">
              <img
                className="blog-image"
                onClick={() => navigate("/blogs-detail")}
                src={doctor}
                alt="blog-image"
              />
              <div className="blog-item-body">
                <h2 className="bolg-item-title">
                  Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
                </h2>
                <p>
                  Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                  nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                  để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                  lịch tiêm, loại vắc xin nào không thể?
                </p>
              </div>
            </div>
            <div className="blog-item">
              <img
                className="blog-image"
                onClick={() => navigate("/blogs-detail")}
                src={doctor}
                alt="blog-image"
              />
              <div className="blog-item-body">
                <h2 className="bolg-item-title">
                  Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
                </h2>
                <p>
                  Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                  nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                  để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                  lịch tiêm, loại vắc xin nào không thể?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="paginate">
          <h1>Paginate</h1>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
