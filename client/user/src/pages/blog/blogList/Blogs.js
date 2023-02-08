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
                <h5>Nội Dung</h5>
                <div className="line"></div>
              </li>
              <li className="item">
                <span
                  onClick={() => {}}
                >Sức khoẻ tổng quát
                </span>
                <div className="line"></div>
              </li>
              <li className="item">
                <span 
                  onClick={() => {}}>Dinh Dưỡng</span>
                <div className="line"></div>
              </li>
              <li className="item">
                <span 
                  onClick={() => {}}>Sống khỏe</span>
                <div className="line"></div>
              </li>
              <li className="item">
                <span
                  onClick={() => {}}>Làm đẹp</span>
                <div className="line"></div>
              </li>
              <li className="item">
                <span
                  onClick={() => {}}>Thông tin dược</span>
                <div className="line"></div>
              </li>
              <li className="item">
                <span 
                  onClick={() => {}}>Nhi</span>
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
                onClick={() => navigate('/blogs/id')}
                src={doctor}
                alt='blog-image'
              />
              <div className="blog-item-body">
                <h2 className="bolg-item-title line-clamp">
                  Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
                  Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                  nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                  để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                  lịch tiêm, loại vắc xin nào không thể?
                </h2>
                <p className="line-clamp line-4">
                  Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                  nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                  để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                  lịch tiêm, loại vắc xin nào không thể?
                  Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
                  Trong thời điểm dịch bệnh Covid-19 vẫn đang diễn ra phức tạp,
                  nhiều cha mẹ băn khoăn không biết có nên đưa con đến bệnh viện
                  để tiêm phòng không. Loại vắc xin nào có thể được trì hoãn
                  lịch tiêm, loại vắc xin nào không thể? Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
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
