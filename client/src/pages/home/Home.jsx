import "./home.scss";
import homePageImage from "../../assets/images/loginPage.jpg";

export default function Home() {
  return (
    <div className="homeWrapper container-xxl">
      <div className="slider row mt-4">
        <img src={homePageImage} alt="logo home page" />
      </div>
      <div className="introduction row">
        <div className="introLeft col-12">
          <h1>Nha khoa Sun Smile</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
            iste, et pariatur, odio officiis rerum magnam doloribus voluptatibus
            molestias quasi veritatis. Recusandae facilis ipsa doloribus
            reprehenderit dolorum tempore similique sed.
          </p>
        </div>
        <div className="introRight col-12">
          <h1>Dịch vụ</h1>
          <ul className="specialistList">
            <li className="specialistItem">Khám bệnh</li>
            <li className="specialistItem">Siêu âm</li>
            <li className="specialistItem">Chụp X quang</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
