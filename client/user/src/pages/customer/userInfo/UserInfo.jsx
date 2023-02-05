import "./userInfo.scss";
import blankAvatar from "../../../assets/images/blank_avatar.jpg";

export default function UserInfo() {
  return (
    <div className="userInfoContainer">
      <h1 className="title">Thông tin khách hàng</h1>
      <div className="userInfo">
        <div className="infoList">
          <input placeholder="Họ và tên" />
          <input value="Email" />
          <input value="Địa chỉ" />
          <input value="Giới tính" />
          <input value="Điện thoại" />
          <input value="Ngày sinh" />
        </div>
        <div className="accountAvatar">
          <img src={blankAvatar} alt="" />
        </div>
      </div>
      <button>LƯU</button>
    </div>
  );
}
