import "./medicalHistory.scss";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import DataTable, { filter } from "react-data-table-component";
import { Link } from "react-router-dom";
import API_URL from "~/api/Router";
import { AuthContext } from "~/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { formatSlot } from "~/utils";
import { format } from "date-fns";

// blogsSaved?.filter((item) => {
//   if (filterText === "") {
//     return true;
//   } else if (
//     item.title
//       .toLowerCase()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .includes(filterText.toLowerCase())
//   ) {
//     return true;
//   }
//   return false;
// })

function PrescriptionModal({ preId, show, onHide }) {
  const [preInfo, setPreInfo] = useState();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await axios.get(API_URL + "/prescriptions/" + preId);
        setPreInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    preId && fetchPrescription();
  }, [preId]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Đơn thuốc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bệnh: {preInfo?.disease}</p>
        <p>Lưu ý: {preInfo?.note}</p>
        <h5>Thuốc: </h5>
        {preInfo?.medicines.map((medicine) => (
          <p>
            {medicine.quantity} {medicine.medicine_id.type}{" "}
            {medicine.medicine_id.name} | Liều dùng: {medicine.dose}
          </p>
        ))}
        {preInfo?.re_exam_date && (
          <p>
            Ngày tái khám: { format(new Date(preInfo.re_exam_date),
            "dd/MM/yyyy")}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function MedicalHistory() {
  const [history, setHistory] = useState();
  const { currentUser } = useContext(AuthContext);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [preShowId, setPreShowId] = useState();

  useEffect(() => {
    if (currentUser) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/bookedservices/history/${currentUser._id}`
          );
          // const formatRes =
          setHistory(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchHistory();
    }
  }, [currentUser]);

  const columns = useMemo(() => {
    const handleViewPrescription = async (preId) => {
      setPreShowId(preId);
      setModalShow(true);
    };

    return [
      {
        name: "Ngày khám",
        selector: (row) => format(new Date(row.date), "dd/MM/yyyy"),
        sortable: true,
      },
      {
        name: "Thời gian",
        selector: (row) => formatSlot(row.slot_time),
      },
      {
        name: "Bác sĩ",
        selector: (row) => row?.doctor[0]?.fullname,
      },
      {
        name: "Chi phí",
        selector: (row) => row.total_price + " VND",
      },
      {
        name: "Xem đơn thuốc",
        selector: (row) => (
          <div className="text-center">
            {row.drugbill_id ? (
              <FontAwesomeIcon
                icon={faPills}
                onClick={() => handleViewPrescription(row.drugbill_id)}
                style={{
                  color: "#0D6EFD",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPills}
                style={{ opacity: 0.4, cursor: "not-allowed" }}
              />
            )}
          </div>
        ),
      },
    ];
  }, []);

  // console.log(blogsSaved);
  return (
    <div className="blogsSaved">
      <InputGroup className="mb-3 search-saved-blog w-25">
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Tiêu đề"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </InputGroup>
      <DataTable
        title="Lịch sử khám"
        columns={columns}
        data={history}
        pagination
        defaultSortAsc="false"
        defaultSortFieldId="date"
      />
      <PrescriptionModal
        preId={preShowId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
