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
          <h3>Nha khoa Sun Smile</h3>
          <p>
            Phòng khám Sun Smile là một trong những cơ sở y tế chuyên khoa nha
            khoa hàng đầu hiện nay, với mục tiêu đem đến cho khách hàng những
            dịch vụ chăm sóc răng miệng chất lượng cao nhất. Với đội ngũ bác sĩ
            giàu kinh nghiệm, được đào tạo chuyên sâu trong lĩnh vực nha khoa,
            cùng với trang thiết bị hiện đại và tiên tiến, phòng khám Sun Smile
            đã và đang luôn nỗ lực để cung cấp những phương pháp điều trị hiệu
            quả nhất cho bệnh nhân. <br /><br /> Với phương châm "khách hàng là trên hết",
            Sun Smile cam kết mang lại cho bệnh nhân sự thoải mái và an tâm
            trong quá trình điều trị. Đội ngũ nhân viên của Sun Smile luôn nhiệt
            tình và chu đáo, sẵn sàng lắng nghe và tư vấn cho bệnh nhân mọi khi
            cần thiết. <br /><br /> Với sự chuyên nghiệp và tận tâm của đội ngũ y bác sĩ và
            nhân viên, Phòng khám Sun Smile đảm bảo sự hài lòng của khách hàng.
            Bên cạnh đó, Sun Smile cũng luôn nỗ lực cải tiến và nâng cao chất
            lượng dịch vụ để đáp ứng mọi nhu cầu và yêu cầu của khách hàng.
          </p>
        </div>
        <div className="introRight col-sm-5">
          <h4>Dịch vụ</h4>
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
