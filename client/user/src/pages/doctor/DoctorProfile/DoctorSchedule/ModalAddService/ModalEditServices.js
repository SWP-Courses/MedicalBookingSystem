import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import { useRef } from "react";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";
import { v4 as uuidv4 } from "uuid";
import { memo } from "react";

import "./ModalEditServices.scss";

function ModalEditServices(props) {
  const { modalShow, setModalShow, bookedUser, fetchSchedule } = props;
  const [listServices, setListServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const userServicesRef = useRef();

  useEffect(() => {
    const cloneUserBooked = _.cloneDeep(bookedUser);
    if (!_.isEmpty(cloneUserBooked)) {
      setUserServices(cloneUserBooked.services);
    }
  }, [bookedUser]);

  const hanldeOnChangeValue = (event, id) => {
    const cloneUserServices = _.cloneDeep(userServices);
    if (!_.isEmpty(cloneUserServices)) {
      const service = cloneUserServices.find((item) => item.service_id === id);
      if(event.target.name === 'quantity') {
        service.quantity = +event.target.value;
      }
      if(event.target.name === 'select-service') {
        const extraService = cloneUserServices.find((item) => item.unique_id === id);
        extraService.service_id = event.target.value;
      }
    }
    setUserServices(cloneUserServices);
  };

  useEffect(() => {
    userServicesRef.current = userServices;
  }, [userServices]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  // need add extra service
  const fetchAllServices = async () => {
    const [error, res] = await hanlderRequest(axios.get(API_URL + "/services"));
    if (res && res.data) {
      setListServices(res.data);
    } else {
      console.log(error.message);
    }
  };

  const handleUpdateServices = async (bookedUser) => {
    let error, res;
    for (const service of userServices) {
      [error, res] = await hanlderRequest(
        axios.put(
          API_URL + `/bookedservices/${bookedUser._id}/${service.service_id}`,
          { quantity: `${service.quantity}` }
        )
      );
    }
    if (res && res.data) {
      console.log(res.data);
      toast.success("cập nhật thành công");
      setModalShow(false);
      await fetchSchedule();
    } else {
      toast.error(error.message);
    }
  };

  const hanldeAddExtraService = () => {
    const newEmptyServices = {
      unique_id: uuidv4(),
      service_id: '',
      quantity: ''
    }
    setUserServices([...userServices, newEmptyServices]);
  }

  const handleDeleteExtraService = (id) => {
    const newUserServices =  userServices.filter((item) => item.unique !== id);
    setUserServices(newUserServices);
  }

  const hanldeCloseModal = () => {
    setModalShow(false);
    // setUserServices([])
  };

  console.log('log ser: ', userServices);
  // console.log(
  //   "current userService: ",
  //   userServices,
  //   "prev userService: ",
  //   userServicesRef.current
  // );
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
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={item.fullname}
                  onChange={() => {}}
                  disabled
                  style={{ cursor: "no-drop" }}
                />
              );
            })}
          </div>
          <div className="col-md-6">
            <label className="form-label">Giờ Khám</label>
            <input
              type="text"
              className="form-control"
              style={{ cursor: "no-drop" }}
              defaultValue={bookedUser.slot_time}
              disabled
            />
          </div>
          {userServices.map((service, index) => {
            return (
              <React.Fragment key={index}>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    {`Dịch Vụ - ${index + 1}`}
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    value={service.service_id}
                    onChange={(event) => hanldeOnChangeValue(event, service.unique_id)}
                    name='select-service'
                    >
                    <option>--- Thêm dịch vụ ---</option>
                    {listServices &&
                      listServices.length > 0 &&
                      listServices.map((item, index) => {
                        return (
                         <>
                            <option
                              key={index}
                              value={item._id}
                            >{`${item.name}`}</option>
                         </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputQnt" className="form-label testcss">
                    sửa số lượng
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputQnt"
                    value={service.quantity}
                    name='quantity'
                    onChange={(event) =>
                      hanldeOnChangeValue(event, service.service_id)
                    }
                    min="1"
                    max="32"
                  />
                </div>
                <div className="col-md-2 plus-service">
                  <span
                    // className="note-icon"
                    className={service.service_id ? 'note-icon__disable' : 'note-icon'}
                    onClick={() => handleDeleteExtraService(service.unique)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                  <span 
                    className="add-extra-icon"
                    onClick={hanldeAddExtraService}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleUpdateServices(bookedUser)}>
          Cập Nhật
        </Button>
        <Button className="btn btn-danger" onClick={hanldeCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(ModalEditServices);
