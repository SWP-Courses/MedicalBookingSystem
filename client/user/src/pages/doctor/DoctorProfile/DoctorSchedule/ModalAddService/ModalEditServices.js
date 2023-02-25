import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";

import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";

function ModalEditServices(props) {
  const { modalShow, setModalShow, bookedUser } = props;
  const [quantity, setQuatity] = useState('');
  const [listServices, setListServices] = useState([]);
  const [services, setServices] = useState(() => {
    const cloneBookedUser = _.cloneDeep(bookedUser);
    return cloneBookedUser;
  });
  const [additionService, setAdditionService] = useState([
    {
      unique_id: '',
      service_id: '',
      price: '',
      quantity: '',
    }
  ]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  useEffect(() => {
    if(bookedUser) {
      setQuatity(bookedUser)
    }
  }, [bookedUser])

  const fetchAllServices = async () => {
    const [error, res] = await hanlderRequest(axios.get(API_URL + "/services"));
    if (res && res.data) {
      setListServices(res.data);
    } else {
      console.log(error.message);
    }
  };

  const handleUpdateServices = async (bookedUser) => {
    Promise.all(bookedUser?.services?.map(async(service) => {
      const [error, res] = await hanlderRequest(axios.put(API_URL + `/bookedservices/${bookedUser._id}/${service.service_id}`));
      if(res && res.data) {
        console.log(res.data);
        setModalShow(false);
      } else {
        toast.error(error.message)
      }
    }))

  }

  console.log(bookedUser);
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
            {bookedUser?.customer?.map((item, index) => {
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
            {/* {
              
              <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  value={bookedUser?.customer[0]?.fullname}
                  onChange={() => {}}
                />
            } */}
          </div>
          <div className="col-md-6">
            <label className="form-label">Giờ Khám</label>
            <input
              type="text"
              className="form-control"
              value={bookedUser.slot_time}
              onChange={() => {}}
            />
          </div>
          {bookedUser &&
            bookedUser.services &&
            bookedUser.services.map((service, index) => {
              return (
                <span key={index} className="d-flex">
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      {`Dịch Vụ - ${index + 1}`}
                    </label>
                    <select id="inputState" className="form-select" value={service.service_id}>
                      {listServices &&
                        listServices.length > 0 &&
                        listServices.map((item, index) => {
                          return (
                            <option 
                                key={index}
                                value={item._id}
                            >{`${item.name} - ${service.service_id}`}</option>
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
                      value={quantity}
                      onChange={() => {}}
                    />
                  </div>
                </span>
              );
            })}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={() => handleUpdateServices(bookedUser)}
        >Cập Nhật</Button>
        <Button className="btn btn-danger" onClick={() => setModalShow(false)}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditServices;
