import { useState } from "react";
import "./Prescription.scss";

function Prescription() {
  const [dugName, setDugName] = useState("");

  const handleAddNewDrug = () => {
    alert('demo')
  }

  const handleSubmitPrescription = () => {
    alert('demo')
  }
  return (
    <div className="wrapper">
      <hr/>
      <div className="main-prescription">
        <div className="infoList">
          <div className="input-group mb-3">
            <select className="form-select" id="inputGroupSelect02">
              <option selected>Chọn Thuốc</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label className="input-group-text" for="inputGroupSelect02">
              Options
            </label>
          </div>
          <div className="input-group mb-3">
            <select className="form-select" id="inputGroupSelect02">
              <option selected>Loại Thuốc</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label className="input-group-text" for="inputGroupSelect02">
              Options
            </label>
          </div>
          <input type="text" placeholder="số lượng" />
          <button 
            className="mt-3 btn-add"
            onClick={() => handleAddNewDrug()}
          >
            Thêm Thuốc
          </button>
        </div>
        <div className="prescription-preview">
          <h4>Thuốc đã chọn</h4>
          <div className="drug-list">
            <div className="item">
              <p>tên thuốc</p>
              <p className="view-drug">xem</p>
              <p className="delete-drug">xóa</p>
            </div>
            <div className="item">
              <p>tên thuốc</p>
              <p className="view-drug">xem</p>
              <p className="delete-drug">xóa</p>
            </div>
            <div className="item">
              <p>tên thuốc</p>
              <p className="view-drug">xem</p>
              <p className="delete-drug">xóa</p>
            </div>
            <div className="item">
              <p>tên thuốc</p>
              <p className="view-drug">xem</p>
              <p className="delete-drug">xóa</p>
            </div>
            <div className="item">
              <p>tên thuốc</p>
              <p className="view-drug">xem</p>
              <p className="delete-drug">xóa</p>
            </div>
            
          </div>
        </div>
        <div className="note">
          <h4>
            <label for="w3review">Thêm nhắc nhở</label>
          </h4>
          <textarea id="w3review" name="w3review" rows="4" cols="50">
            At w3schools.com you will learn how to make a website. They offer
            free tutorials in all web development technologies.
          </textarea>
          <br />
        </div>
      </div>
      <div className="recall-date">
        <h4 for="birthday">Hẹn Ngày Tái Khám</h4>
        <input type="date" id="birthday" name="birthday" />
      </div>
      <button 
        className="mt-3 btn-prescription"
        onClick={() => handleSubmitPrescription()}
      >
        Tạo Đơn Thuốc
      </button>
    </div>
  );
}

export default Prescription;
