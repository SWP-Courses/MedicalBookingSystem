import { useEffect, useState } from "react";
import "./Prescription.scss";
import Select, { colourOptions } from "react-select";
import Form from "react-bootstrap/Form";
import {
  faCirclePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import axios from "axios";
import API_URL from "~/api/Router";

function Prescription() {
  const [drugsOption, setDrugsOption] = useState([]);
  const [desease, setDesease] = useState('');
  const [note, setNote] = useState('');
  const [reExamDate, setReExamDate] = useState('');
  const [drugs, setDrugs] = useState([
    {
      id: uuidv4(),
      drugId: "",
      drugName: "",
      dosage: "",
      quantity: "",
    },
  ]);

  const optionListUsers = [
    {
      value: 1,
      label: "An",
    },
    {
      value: 2,
      label: "Bình",
    },
    {
      value: 3,
      label: "Cường",
    },
    {
      value: 4,
      label: "Dũng",
    },
  ];

  useEffect(() => {
    try {
      fetchAllMedicine();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllMedicine = async () => {
    let res = await axios.get(`${API_URL}/medicine`);
    if (res && res.data && res.data.medicines) {
      const listMedicine = res?.data?.medicines?.map((medicine) => {
        return {
          value: medicine._id,
          label: medicine.name,
        };
      });
      setDrugsOption(listMedicine);
    }
  };

  const handleOnChangeValue = (type, id, valueSelected) => {
    const cloneDrugs = _.clone(drugs);
    const newDrug = cloneDrugs.find((item) => item.id === id);
    switch (type) {
      case "drug":
        if (newDrug) {
          newDrug.drugId = valueSelected.value;    // valueSelected.value --> id of drug
          newDrug.drugName = valueSelected.label;  // valueSelected.label --> name of drug
        }
        setDrugs(cloneDrugs);
        break;
      case "dosage":
        if (newDrug) {
          newDrug.dosage = valueSelected;
        }
        setDrugs(cloneDrugs);
        break;
      case "quantity":
        if (newDrug) {
          newDrug.quantity = valueSelected;
        }
        setDrugs(cloneDrugs);
        break;
      default:
        throw new Error("on change value error");
    }
  };

  const handleAddNewEmptyDrug = () => {
    const newEmptyDrug = {
      id: uuidv4(),
      drugId: "",
      drugName: "",
      dosage: "",
      quantity: "",
    };
    setDrugs([...drugs, newEmptyDrug]);
  };

  const handleDeleteDrug = (id) => {
    if (id) {
      const drugList = _.clone(drugs);
      const newDrugList = drugList.filter((item) => item.id !== id);
      if (newDrugList.length > 0) {
        setDrugs(newDrugList);
      }
    }
  };

  const handleSubmitPrescription = () => {
    const prescription = {
      medicine: drugs,
      note: note,
      desease: desease,
      re_exam_date: reExamDate,
    }
    console.log('check final data: ', prescription);
  };

  return (
    <div className="wrapper-prescription">
      <div className="user">
        <div className="user-list">
          <Select
            placeholder={<div>Tìm Bệnh Nhân</div>}
            className="basic-single"
            classNamePrefix="select"
            name="color"
            options={optionListUsers}
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
                    defaultValue={drug.drugName}
                    className="basic-single"
                    classNamePrefix="select"
                    name="color"
                    options={drugsOption}
                    onChange={(valueSelected) =>
                      handleOnChangeValue("drug", drug.id, valueSelected)
                    }
                  />
                </div>
                <div className="qty">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="số lượng"
                      value={drug.dosage}
                      onChange={(e) =>
                        handleOnChangeValue("dosage", drug.id, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
                <div className="qty">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Liều Dùng"
                      value={drug.quantity}
                      onChange={(e) =>
                        handleOnChangeValue("quantity", drug.id, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
                <div className="actions">
                  <div className="delete-btn">
                    {drugs && drugs.length > 1 && (
                      <span
                        className="note-icon"
                        onClick={() => handleDeleteDrug(drug.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                    )}
                  </div>
                  <div className="add-btn">
                    <span
                      className="note-icon"
                      onClick={() => handleAddNewEmptyDrug()}
                    >
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="medicine-note">
          <div className="desease-note">
            <center>
              <h5>Bệnh</h5>
            </center>
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              placeholder="Loại Bệnh"
              value={desease} 
              onChange={e => setDesease(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <center>
              <h5>Lưu ý</h5>
            </center>
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              placeholder="Thêm Lưu ý"
              value={note} 
              onChange={e => setNote(e.target.value)}
            />
            <div className="recall-date">
              <span>Hẹn Ngày Tái Khám</span>
              <input 
                type="date" 
                value={reExamDate}
                onChange={(e) => setReExamDate(e.target.value)}
              />
            </div>
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
    </div>
  );
}

export default Prescription;
