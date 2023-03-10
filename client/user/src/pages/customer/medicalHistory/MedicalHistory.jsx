import "./medicalHistory.scss";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import DataTable, { filter } from "react-data-table-component";
import { Link } from "react-router-dom";
import API_URL from "~/api/Router";
import { AuthContext } from "~/context/authContext";
// import "./blogsSaved.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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

export default function MedicalHistory() {
  const [history, setHistory] = useState();
  const { currentUser } = useContext(AuthContext);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [prescription, setPrescription] = useState();

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
      try {
       const res = await axios.get(
         `${API_URL}/bookedservices/history/${currentUser._id}`
       );
      } catch(err) {
       toast.error(err.response.data)
      }
   }

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
        name: "Tổng tiển",
        selector: (row) => row.total_price,
      },
      {
        name: "Xem đơn thuốc",
        selector: (row) => (
          <Button
            variant="primary"
            size="sm"
            className="btn-block mt-auto"
            onClick={() => handleViewPrescription(row._id)}
          >
            Xem đơn thuốc
          </Button>
        ),
      },
    ];
  }, [currentUser._id]);
  

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
    </div>
  );
}
