import "./Blog.scss";

import { useNavigate } from "react-router-dom";
import doctor from '~/assets/images/doctor.jpg'

function Blogs() {

  const navigate = useNavigate();

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
                <p 
                  onClick={() => {}}>Sức khoẻ tổng quát</p>
                <div className="line"></div>
              </li>
              <li className="item">
                <p 
                  onClick={() => {}}>Dinh Dưỡng</p>
                <div className="line"></div>
              </li>
              <li className="item">
                <p 
                  onClick={() => {}}>Sống khỏe</p>
                <div className="line"></div>
              </li>
              <li className="item">
                <p 
                  onClick={() => {}}>Làm đẹp</p>
                <div className="line"></div>
              </li>
              <li className="item">
                <p 
                  onClick={() => {}}>Thông tin dược</p>
                <div className="line"></div>
              </li>
              <li className="item">
                <p 
                  onClick={() => {}}>Nhi</p>
                <div className="line"></div>
              </li>
            </ul>
          </div>
          <div className="blog-list">
            <h1 className="type">Sức Khỏe Tổng Quát</h1>
            <hr/>
            <div className="blog-item">
              <img
                className="blog-image"
                onClick={() => navigate('/blogs-detail')}
                src={doctor}
                alt='blog-image'
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
                onClick={() => navigate('/blogs-detail')}
                src={doctor}
                alt='blog-image'
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
                onClick={() => navigate('/blogs-detail')}
                src={doctor}
                alt='blog-image'
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
                onClick={() => navigate('/blogs-detail')}
                src={doctor}
                alt='blog-image'
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
