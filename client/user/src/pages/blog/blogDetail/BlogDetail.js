import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./BlogDetail.scss";
import doctor from "~/assets/images/doctor.jpg";
import { AuthContext } from "~/context/authContext";
import { useContext } from "react";

function BlogDetail() {
  const { setRoutingHistory } = useContext(AuthContext);
  const location = useLocation();

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
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="blog-content">
          <div className="blog-wrapper">
            <div className="blog-detail">
              <h1 className="blog-title">
                Những lưu ý quan trọng trước khi khám sức khỏe tổng quát
              </h1>
              <img className="blog-detail-image" src={doctor} />
              <div className="content-box">
                <h2 className="sub-title">1. Vai trò của Vitamin D</h2>
                <p className="sub-content">
                  Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                  nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần chay.
                  Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật chứa
                  nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng, sữa...
                  không được sử dụng trong khẩu phần ăn.
                </p>
                <p className="sub-content">
                  Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                  nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần chay.
                  Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật chứa
                  nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng, sữa...
                  không được sử dụng trong khẩu phần ăn.
                </p>
                <p className="sub-content">
                  Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                  nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần chay.
                  Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật chứa
                  nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng, sữa...
                  không được sử dụng trong khẩu phần ăn.
                </p>
                <p className="sub-content">
                  Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                  nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần chay.
                  Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật chứa
                  nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng, sữa...
                  không được sử dụng trong khẩu phần ăn.
                </p>
                <h2 className="sub-title">2. Nguyên nhân thiếu vitamin D</h2>
                <ul>
                  <li>
                    Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                    nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần
                    chay. Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật
                    chứa nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng,
                    sữa... không được sử dụng trong khẩu phần ăn.
                  </li>
                  <li>
                    Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                    nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần
                    chay. Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật
                    chứa nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng,
                    sữa... không được sử dụng trong khẩu phần ăn.
                  </li>
                  <li>
                    Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                    nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần
                    chay. Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật
                    chứa nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng,
                    sữa... không được sử dụng trong khẩu phần ăn.
                  </li>
                  <li>
                    Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                    nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần
                    chay. Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật
                    chứa nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng,
                    sữa... không được sử dụng trong khẩu phần ăn.
                  </li>
                  <li>
                    Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                    nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần
                    chay. Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật
                    chứa nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng,
                    sữa... không được sử dụng trong khẩu phần ăn.
                  </li>
                  <li>
                    Không tiêu thụ lượng vitamin D được theo đúng nhu cầu khuyến
                    nghị. Điều này có thể xảy ra nếu sử dụng chế độ ăn thuần
                    chay. Bởi vì hầu hết các nguồn thức ăn tự nhiên là động vật
                    chứa nhiều vitamin D bao gồm như: cá, dầu cá, lòng đỏ trứng,
                    sữa... không được sử dụng trong khẩu phần ăn.
                  </li>
                </ul>
                <h2 className="sub-title">
                  3. Các xét nghiệm nên làm theo từng độ tuổi
                </h2>
                <p className="desc">
                  Ngoài khám lâm sàng và làm các xét nghiệm, sàng lọc nên làm
                  khi khám sức khỏe tổng quát chung, cần khám trọng tâm theo
                  từng độ tuổi:
                </p>
                <ul>
                  <li>
                    Tuổi từ 20-30
                    <ul>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                    </ul>
                  </li>
                  <li>
                    Tuổi từ 20-30
                    <ul>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                    </ul>
                  </li>
                  <li>
                    Tuổi từ 20-30
                    <ul>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                    </ul>
                  </li>
                  <li>
                    Tuổi từ 20-30
                    <ul>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                    </ul>
                  </li>
                  <li>
                    Tuổi từ 20-30
                    <ul>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                      <li>
                        Khám và làm các xét nghiệm các bệnh truyền nhiễm như:
                        viêm gan A, B, C, giang mai, bệnh lậu...
                      </li>
                    </ul>
                  </li>
                </ul>
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
              <span className="doctor-name">Thạc sĩ, Bác sĩ Đặng Tiến Đạt</span>
              <p className="desc">
                Khoa Gây mê giảm đau - Bệnh viện Đa khoa Quốc tế Vinmec Times
                City
              </p>
              <Link to="/doctors/id" className="link-to-detail">
                Xem thông tin bác sĩ &gt;
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
