import "./home.scss";

export default function Home() {
  return (
    <div className="homeWrapper container-lg">
      <div className="slider row">
        <img
          src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
          alt=""
        />
      </div>
      <div className="introduction row">
        <div className="introLeft col-sm-7">
          <h1>Human Heal</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
            iste, et pariatur, odio officiis rerum magnam doloribus voluptatibus
            molestias quasi veritatis. Recusandae facilis ipsa doloribus
            reprehenderit dolorum tempore similique sed.
          </p>
        </div>
        <div className="introRight col-sm-5">
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
