import { useState } from "react";
import "./Prescription.scss";
import Select, { colourOptions } from "react-select";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  faCirclePlus,
  faNotesMedical,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

function Prescription(props) {
  //select
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  // modal
  const [modalShow, setModalShow] = useState(false);
  const [smShow, setSmShow] = useState(false);

  // build list Drug
  const [drugs, setDrugs] = useState([
    {
      id: uuidv4(),
      drugName: "",
      dosage: "",
      quantity: "",
    },
  ]);


  const handleAddNewDrug = () => {
    console.log('handle add new drug');
    const newDrug = {
      id: uuidv4(),
      drugName: "",
      dosage: "",
      quantity: "",
    };
    setDrugs([...drugs, newDrug]);
  };

  const handleDeleteDrug = (id) => {
    // setSmShow(true)
    console.log('drug id: ', id);
    if(id) {
      const drugList = _.clone(drugs);
      const newDrugList = drugList.filter((item) => item.id !== id);
      if(newDrugList) {
        setDrugs(newDrugList);
      }
    }
  }

  const handleSubmitPrescription = () => {
    alert("demo");
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="wrapper-prescription">
      <div className="user">
        <div className="user-list">
          <Select
            placeholder={<div>Tìm Bệnh Nhân</div>}
            className="basic-single"
            classNamePrefix="select"
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={options}
          />
        </div>
        <div className="user-detail">
          <div className="name">
            <span className="title">Tên: </span>
            <span>Vũ Văn Lãm</span>
          </div>
          <div className="age">
            <span className="title">Tuổi: </span>
            <span>21</span>
          </div>
          <div className="gender">
            <span className="title">Giới Tính: </span>
            <span>Nam</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="medicine-body">
        <div className="medicine-choice">
          {drugs &&
            drugs.length > 0 &&
            drugs.map((drug, index) => (
              <div className="medicine-choice_main" key={`drug-key-${index}`}>
                <div className="drug">
                  <Select
                    placeholder={<div>Chọn Thuốc</div>}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={options}
                  />
                </div>
                <div className="qty">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control type="text" placeholder="Liều Dùng" />
                  </Form.Group>
                </div>
                <div className="qty">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control type="text" placeholder="số lượng" />
                  </Form.Group>
                </div>
                <div className="actions">
                  <div className="delete-btn">
                    <span 
                      className="note-icon" 
                      onClick={() => handleDeleteDrug(drug.id)}

                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                  <div className="add-btn">
                    <span 
                      className="note-icon"
                      onClick={() => handleAddNewDrug()}
                    >
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="medicine-note">
          <center>
            <h5>
              Thêm nhắc nhở
            </h5>
          </center>
          <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Nhắc Tại đây">
            {/* At w3schools.com you will learn how to make a website. They offer
            free tutorials in all web development technologies. */}
          </textarea>
          <div className="recall-date">
            <span>Hẹn Ngày Tái Khám</span>
            <input type='date'/>
          </div>
        </div>
      </div>
      
      <footer className="">

        <button
          className="mt-3 btn-prescription"
          onClick={() => handleSubmitPrescription()}
        >
          Tạo Đơn Thuốc
        </button>

        
      </footer>
      {/* <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
      >
        <Modal.Header closeButton onClick={() => setModalShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm Nhắc Nhở
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Nội Dung</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Thêm</Button>
        </Modal.Footer>
      </Modal> */}
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={smShow}
        className="modal-Delete-drug"
      >
        <Modal.Header closeButton onClick={() => setSmShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Xóa Thuốc Này
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <Button className="mr-5" variant="danger">
              Xóa
            </Button>{" "}
            <Button variant="primary">Hủy</Button>{" "}
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Prescription;
