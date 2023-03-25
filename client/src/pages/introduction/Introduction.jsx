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
      <p className="item para">
        Trám răng hay hàn răng là một kỹ thuật nha khoa sử dụng vật liệu nhân
        tạo để bổ sung vào phần mô răng bị thiếu. Phương pháp này có thể mang
        lại hiệu quả cả về tính thẩm mỹ lẫn cải thiện chức năng nhai. <br />
        Ngoài trám răng do bị sâu răng là nguyên nhân phổ biến thì bạn có thể
        phải nhờ đến sự can thiệp của nha sĩ khi có lỗ hổng xuất hiện trên răng.
        Phương pháp này thường được áp dụng cho các trường hợp sau:
      </p>
      <ul className="list">
        <li className="list-item item">
          <strong>Trám răng bị sâu</strong>: Sâu răng là tình trạng xuất hiện
          các lỗ hổng ở răng. Nguyên nhân là do hoạt động của vi khuẩn tích tụ
          khi bạn ăn những thực phẩm có đường và không chăm sóc răng đúng cách.
          Nếu không được điều trị, lỗ hổng do sâu răng gây ra sẽ lớn dần, dẫn
          đến đau răng nghiêm trọng, nhiễm trùng và mất răng.
        </li>
        <img
          className="visual item"
          src="https://th.bing.com/th/id/OIP.JGSMrZl6D-_WHLdczGQTwwHaD4?w=343&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
        />
        <li className="list-item item">
          <strong>Răng bị mẻ</strong>: Răng có thể bị nứt, mẻ khi bạn cắn phải
          thức ăn hay vật dụng gì quá mạnh hoặc có tác động cơ học mạnh làm ảnh
          hưởng đến cấu trúc răng. Nếu vết nứt được phát hiện sớm, nha sĩ sẽ
          thực hiện kỹ thuật trám tương tự như khi răng bạn bị sâu. Trước hết,
          bạn sẽ được vệ sinh răng để loại bỏ vi khuẩn, sau đó trám vật liệu vào
          chỗ răng bị mẻ.
        </li>
        <img
          className="visual item"
          src="https://th.bing.com/th/id/OIP.x-41oQA-NYCcxajXpZrjHAHaFB?pid=ImgDet&rs=1"
          alt=""
        />
        <li className="list-item item">
          <strong>Răng thưa</strong>: Nếu răng bạn bị thưa, đặc biệt là răng cửa
          thưa gây ảnh hưởng đến thẩm mỹ thì bạn có thể nhờ đến phương pháp trám
          răng thẩm mỹ để tạo hình cho răng. Tuy nhiên, phương pháp này thường
          chỉ nên áp dụng nếu khoảng hở nhỏ dưới 2mm. Trường hợp khoảng hở lớn
          hơn, răng cửa sẽ trông khá to và mất cân đối sau khi trám nên nha sĩ
          có thể khuyên bạn chuyển sang các kỹ thuật khác như bọc răng sứ hoặc
          niềng răng.
        </li>
        <img
          className="visual item"
          src="https://cdn.hellobacsi.com/wp-content/uploads/2019/03/tram-rang-cua-thua-e1551410522165.jpg"
          alt=""
        />
      </ul>
      <h4 id="nho-rang" className="sub-header item">
        Nhổ răng
      </h4>
      <li className="list-item item">
        Nhổ răng hàm là một ca tiểu phẫu giúp loại bỏ hoàn toàn chiếc răng đang
        có vấn đề ra khỏi hàm. Đó là những chiếc răng bị hư hỏng nặng, viêm
        răng, viêm tủy, hoại tử làm chảy máu, ảnh hưởng tới chức năng ăn nhai,
        sức khỏe răng miệng. Nhổ răng giúp ngăn chặn nguy cơ nhiễm trùng và ảnh
        hưởng tới các bộ phận khác trên cơ thể.
      </li>
      <li className="list-item item">
        Lý do cần nhổ răng khôn là bởi răng khôn thường mọc ở các vị trí không
        thuận lợi, hoặc khi xương hàm đã hết chỗ mà răng khôn lại nằm quá sâu
        trong hàm. Việc này sẽ khiến khó vệ sinh, tạo môi trường thuận lợi cho
        vi khuẩn phát triển, sinh sôi và tăng nguy cơ viêm nướu, sâu răng.
      </li>
    </div>
  );
}
