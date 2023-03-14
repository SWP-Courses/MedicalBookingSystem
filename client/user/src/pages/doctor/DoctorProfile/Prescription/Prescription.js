import { useEffect, useState } from "react";
import "./Prescription.scss";
import Select, { colourOptions } from "react-select";
import Form from "react-bootstrap/Form";
import { faCirclePlus, faMinusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import axios from "axios";
import API_URL from "~/api/Router";
import { hanlderRequest } from "~/utils";
import { toast } from "react-toastify";

function Prescription(props) {
  const { patient, listUsers, currentUser } = props;
  const [drugsOption, setDrugsOption] = useState([]);
  const [desease, setDesease] = useState("");
  const [note, setNote] = useState("");
  const [reExamDate, setReExamDate] = useState("");
  const [drugs, setDrugs] = useState([
    {
      medicine_id: "",
      quantity: "",
      dose: "",
    },
  ]);
  const [user, setUser] = useState([]);
  const [listUserInDay, setListUserInDay] = useState([]);

  const options = listUserInDay.map((user) => {
    return {
      value: user._id,
      label: user.fullname,
    };
  });

  const reset = () => {
    setDrugs([
      {
        medicine_id: "",
        quantity: "",
        dose: "",
      },
    ]);
    setNote("");
    setDesease("");
    setUser([]);
    setReExamDate("");
  };

  useEffect(() => {
    try {
      fetchAllMedicine();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(patient)) {
      // setUser(() => {
      //   return patient[0];
      // })
      setUser(patient);
    }
  }, [patient]);

  useEffect(() => {
    if (!_.isEmpty(listUsers)) {
      setListUserInDay(listUsers);
    }
  }, [listUsers]);

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

  const hanledCheckDuplicatedDrugs = (valueSelected) => {
    const isValid = false;
    for (const item of drugs) {
      if (item.medicine_id === valueSelected.value) {
        toast.error("thuốc này đã được chọn");
        isValid = true;
      }
    }
    return isValid;
  };

  const handleOnChangeValue = (type, id, valueSelected) => {
    const cloneDrugs = _.clone(drugs);
    const newDrug = cloneDrugs.find((item) => item.id === id);
    switch (type) {
      case "drug":
        if (newDrug && !hanledCheckDuplicatedDrugs(valueSelected)) {
          newDrug.medicine_id = valueSelected.value;    // valueSelected.value --> id of drug
        }
        setDrugs(cloneDrugs);
        break;
      case "dose":
        if (newDrug) {
          newDrug.dose = valueSelected;
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
      medicine_id: "",
      quantity: "",
      dose: "",
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

  const handleSubmitPrescription = async () => {
    const prescription = {
      bill_medicines: drugs,
      note: note,
      disease: desease,
      re_exam_date: reExamDate,
      bookedserviceid: user._id,
    };
    const [error, res] = await hanlderRequest(
      axios.post(API_URL + `/drugbill/${currentUser._id}/${user._id}`, {
        ...prescription,
      })
    );
    if (res && res.status === 200) {
      toast.success("Tạo đơn thuốc thành công");
      reset();
    } else {
      console.log(error.message);
    }
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
            options={options}
            
          />
        </div>
        <div className="user-detail">
          <div className="name">
            <span className="title">Bệnh Nhân: </span>
            <span>
              {user?.customer?.length > 0 ? user?.customer[0]?.fullname : ""}
            </span>
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
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="số lượng"
                      value={drug.quantity}
                      onChange={(e) =>
                        handleOnChangeValue("quantity", drug.id, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
                <div className="qty">
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="liều dùng"
                      value={drug.dose}
                      onChange={(e) =>
                        handleOnChangeValue("dose", drug.id, e.target.value)
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
                        <FontAwesomeIcon icon={faMinusCircle} style={{fontSize: '20px'}}/>
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
              onChange={(e) => setDesease(e.target.value)}
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
              onChange={(e) => setNote(e.target.value)}
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
