import "./home.scss";
import homePageImage from "../../assets/images/loginPage.jpg";

export default function Home() {
  return (
    <div className="homeWrapper container-lg">
      <div className="slider row">
        <img src={homePageImage} alt="logo home page" />
      </div>
      <div className="introduction row">
        <div className="introLeft col-sm-7">
          <h1>Nha khoa Sun Smile</h1>
          <p>
          Phòng khám Sun Smile là một cơ sở y tế chuyên khoa nha khoa, cung cấp các dịch vụ chăm sóc răng miệng chất lượng cao với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại. Phòng khám Sun Smile cam kết mang lại cho bệnh nhân sự thoải mái và an tâm trong quá trình điều trị và đảm bảo sự hài lòng của khách hàng.
          </p>
        </div>
        <div className="introRight col-sm-5">
          <h1>Dịch vụ</h1>
          <ul className="specialistList">
            <li className="specialistItem">Trồng răng</li>
            <li className="specialistItem">Trám răng</li>
            <li className="specialistItem">Nhổ răng</li>
            <li className="specialistItem">Niềng răng</li>
            <li className="specialistItem">Cạo vôi răng</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
