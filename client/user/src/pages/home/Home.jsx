import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Options from "../../components/options/Options";
import Footer from "../../components/footer/Footer";

export default function Home() {
  return (
    <div>
      <div className="slider">
        <img
          src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
          alt=""
        />
      </div>
      <div className="introduction">
        <div className="introLeft">
          <h1>Human Heal</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
            iste, et pariatur, odio officiis rerum magnam doloribus voluptatibus
            molestias quasi veritatis. Recusandae facilis ipsa doloribus
            reprehenderit dolorum tempore similique sed.
          </p>
        </div>
        <div className="introRight">
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
