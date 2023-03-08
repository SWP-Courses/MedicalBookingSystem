import "./introduction.scss";
import staff from "~/assets/images/staff.jpg";
import storyVisual from "~/assets/images/story_visual.jpg";
import mac_cai_kimloai from "~/assets/images/mac_cai_kimloai.jpg";
import mac_cai_su from "~/assets/images/mac_cai_su.jpg";
import nieng_trongsuot from "~/assets/images/nieng_trongsuot.jpg";

export default function Introduction() {
  return (
    <div className="intro">
      <h2 className="item">
        Nha khoa Sun Smile - Phòng khám răng uy tín tại Hồ Chí Minh
      </h2>
      <p className="item bold para">
        Phòng khám răng là một địa chỉ quen thuộc và quan trọng đối với sức khỏe
        răng miệng của chúng ta. Tại đây, chúng ta có thể tìm thấy những chuyên
        gia nha khoa, các bác sĩ có trình độ chuyên môn cao, với đầy đủ trang
        thiết bị hiện đại và công nghệ tiên tiến nhất để chăm sóc và điều trị
        răng miệng.
      </p>
      <img className="visual item" src={staff} alt="" />
      <div className="indexTable">
        <h4 className="text-primary item">Mục lục</h4>
        <h6>Giới thiệu Nha khoa Sun Smile</h6>
        <ul className="indexList">
          <a href="#story">Câu chuyện thành lập Nha khoa Sun Smile</a>
          <a href="#vision">Sứ mệnh của Nha khoa Sun Smile</a>
        </ul>
        <h6>Các dịch vụ tiêu biểu</h6>
        <ul className="indexList">
          <a href="#nieng-rang">Niềng răng</a>
          <a href="#tram-rang">Trám răng</a>
          <a href="#nho-rang">Nhổ răng</a>
        </ul>
      </div>
      <h3 className="main-header item">Giới thiệu Nha khoa Sun Smile</h3>
      <h4 id="story" className="sub-header item">
        Câu chuyện thành lập Nha khoa Sun Smile
      </h4>
      <p className="item para">
        Một ngày đẹp trời, khi đang làm việc tại một phòng khám nha khoa khác,
        bác sĩ Tuấn đã gặp gỡ và chăm sóc cho một bệnh nhân trẻ tuổi, đó là một
        cô gái trẻ với nụ cười tươi rói nhưng răng miệng lại không đẹp. Khi được
        hỏi về việc tại sao cô ấy lại đến khám, cô gái trả lời rằng cô ấy đã cảm
        thấy thiếu tự tin trong cuộc sống hàng ngày do hình ảnh răng miệng của
        mình. Đây là lý do tại sao cô ấy đến khám tại đây để tìm cách cải thiện
        tình trạng này.
      </p>
      <img className="visual item" src={storyVisual} alt="" />
      <p className="item para">
        Sau khi kết thúc phiên khám, bác sĩ Tuấn cảm thấy rất xúc động và quyết
        định tạo ra một phòng khám nha khoa của riêng mình, nơi bệnh nhân có thể
        cảm thấy thoải mái và tin tưởng để chăm sóc cho sức khỏe răng miệng của
        mình. Vào năm 2012, Nha khoa Sun Smile đã chính thức khai trương với
        mong muốn mang lại cho bệnh nhân một dịch vụ nha khoa tốt nhất.
      </p>
      <p className="item para">
        Với đội ngũ chuyên viên nha khoa giàu kinh nghiệm, phòng khám nha khoa
        Sun Smile đã trở thành một trong những địa chỉ được tin tưởng và lựa
        chọn hàng đầu cho bệnh nhân. Bác sĩ Tuấn luôn đặt sự quan tâm đặc biệt
        đến từng trường hợp khám, đồng thời áp dụng các phương pháp điều trị và
        trang thiết bị y tế hiện đại để đảm bảo rằng bệnh nhân sẽ được chăm sóc
        tốt nhất.
      </p>
      <p className="item para">
        Trong suốt hành trình phát triển, Nha khoa Sun Smile đã và đang cố gắng
        nỗ lực để đáp ứng tốt nhất nhu cầu của bệnh nhân với phương châm "Không
        chỉ là nha khoa, mà còn là nụ cười của bạn".
      </p>
      <h4 id="vision" className="sub-header item">
        Sứ mệnh của Nha khoa Sun Smile
      </h4>
      <p className="item para">
        Với đội ngũ chuyên viên nha khoa có tay nghề và kinh nghiệm, phòng khám
        răng sẽ giúp bạn giải quyết những vấn đề về răng miệng như: sâu răng,
        nhiễm trùng nha chu, sứt mẻ răng, lấy cao răng, và các vấn đề khác. Bên
        cạnh đó, phòng khám răng cũng cung cấp dịch vụ về chăm sóc răng miệng
        như: vệ sinh răng, trám răng, tẩy trắng răng, cắt tia răng, cấy ghép
        răng và nhiều dịch vụ khác.
      </p>
      <p className="item para">
        Phòng khám răng được thiết kế để mang lại sự thoải mái và an toàn tuyệt
        đối cho bệnh nhân, với không gian rộng rãi, sạch sẽ, được trang bị đầy
        đủ tiện nghi và thiết bị y tế đạt chuẩn. Chúng tôi cam kết luôn tạo ra
        một môi trường thân thiện, năng động và chuyên nghiệp nhất để đảm bảo
        bệnh nhân sẽ có một trải nghiệm tốt nhất khi đến phòng khám.
      </p>
      <p className="item para">
        Chúng tôi luôn sẵn sàng chào đón và phục vụ bạn tận tình nhất, với mong
        muốn mang lại cho bạn một hàm răng khỏe mạnh và sự tự tin trong cuộc
        sống hàng ngày. Hãy đến với phòng khám răng của chúng tôi để trải nghiệm
        sự chuyên nghiệp và tận tâm của đội ngũ chuyên viên nha khoa.
      </p>

      {/* Dịch vụ tiêu biểu */}
      <h3 className="main-header item">Các dịch vụ tiêu biểu</h3>
      <h4 id="nieng-rang" className="sub-header item">
        Niềng răng
      </h4>
      <p className="item para">
        Niềng răng là một trong những phương pháp phổ biến để điều chỉnh răng
        miệng và cải thiện nụ cười. Niềng răng được sử dụng để chỉnh hình và vị
        trí của răng, từ đó tạo ra một bề mặt răng mặt dọc đều và giảm thiểu các
        khoảng trống giữa răng.
      </p>
      <span className="item">
        Có ba loại niềng răng phổ biến được sử dụng trong điều trị chỉnh hình
        răng:
      </span>
      <ul className="list">
        <img className="visual item" src={mac_cai_kimloai} alt="" />
        <li className="list-item item">
          Niềng răng kim loại: Là loại niềng răng được làm từ kim loại và được
          sử dụng rộng rãi trong nha khoa. Niềng răng kim loại có độ bền cao, độ
          bám dính tốt và dễ dàng điều chỉnh. Tuy nhiên, chúng cũng có một số
          nhược điểm như làm mất tính thẩm mỹ của nụ cười và có thể gây khó chịu
          khi ăn uống.
        </li>
        <img className="visual item" src={mac_cai_su} alt="" />
        <li className="list-item item">
          Niềng răng sứ: Là loại niềng răng được làm từ sứ và có màu sắc giống
          với màu răng tự nhiên. Niềng răng sứ có tính thẩm mỹ cao hơn so với
          niềng răng kim loại và thường được sử dụng cho những bệnh nhân có nhu
          cầu chỉnh hình răng mà không muốn giảm tính thẩm mỹ của nụ cười. Tuy
          nhiên, niềng răng sứ có giá thành cao hơn so với niềng răng kim loại
          và độ bền của chúng cũng không cao bằng.
        </li>
        <img className="visual item" src={nieng_trongsuot} alt="" />
        <li className="list-item item">
          Niềng răng trong suốt: Là loại niềng răng mới nhất và được làm từ vật
          liệu trong suốt. Niềng răng trong suốt không dễ bị nhận ra và không
          làm mất tính thẩm mỹ của nụ cười. Điểm yếu của niềng răng trong suốt
          là chúng không có độ bền cao và dễ bị hư hỏng trong quá trình sử dụng.
        </li>
      </ul>
      <p className="item para">
        Tùy thuộc vào tình trạng răng miệng của bệnh nhân và mong muốn về tính
        thẩm mỹ và chi phí, bác sĩ nha khoa sẽ đề xuất phương pháp niềng răng
        phù hợp. Niềng răng là một quá trình kéo dài trong thời gian, yêu cầu sự
        kiên trì và chăm sóc đúng cách, nhưng kết quả cuối cùng sẽ mang lại một
        nụ cười tuyệt vời và sức khỏe răng miệng tốt hơn cho bệnh nhân.
      </p>

      <h4 id="tram-rang" className="sub-header item">
        Trám răng
      </h4>
      <h4 id="nho-rang" className="sub-header item">
        Nhổ răng
      </h4>
    </div>
  );
}
