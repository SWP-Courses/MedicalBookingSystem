import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";

function ModalEditServices(props) {
  const { modalShow, setModalShow, user } = props;
  const [listServices, setListServices] = useState([]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    const [error, res] = await hanlderRequest(axios.get(API_URL + "/services"));
    if (res && res.data) {
      setListServices(res.data);
    } else {
      console.log(error.message);
    }
  };

  console.log(user);
  console.log(listServices);
  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm Dịch Vụ Phát Sinh
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Tên
            </label>
            {user?.customer?.map((item, index) => {
              return (
                <input
                  key={index}
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  value={item.fullname}
                  onChange={() => {}}
                />
              );
            })}
          </div>
          <div className="col-md-6">
            <label className="form-label">Giờ Khám</label>
            <input
              type="text"
              className="form-control"
              value={user.slot_time}
              onChange={() => {}}
            />
          </div>
          {user &&
            user.services &&
            user.services.map((service, index) => {
              return (
                <span key={index} className="d-flex">
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      {`Dịch Vụ - ${index + 1}`}
                    </label>
                    <select id="inputState" className="form-select">
                      {listServices &&
                        listServices.length > 0 &&
                        listServices.map((item, index) => {
                          return (
                            <option 
                                key={index}
                                selected={item._id === service.service_id}
                                value={item._id}
                            >{item.name}</option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputQnt" className="form-label">
                      Giá
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputQnt"
                      value={service.price}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputQnt" className="form-label">
                      Số Lượng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputQnt"
                      value={service.quantity}
                      onChange={() => {}}
                    />
                  </div>
                </span>
              );
            })}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditServices;
