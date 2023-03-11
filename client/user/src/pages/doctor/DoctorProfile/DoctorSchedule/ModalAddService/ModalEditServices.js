import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import { useRef } from "react";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";
import { v4 as uuidv4 } from "uuid";
import { memo } from "react";
import { formatSlot, cloneData } from "~/utils";
import "./ModalEditServices.scss";

function ModalEditServices(props) {
  const { modalShow, setModalShow, bookedUser, fetchSchedule } = props;
  const [listServices, setListServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const userServicesRef = useRef();
  const serviceQty = useRef();
  const listServiesRef = useRef();

  useEffect(() => {
    const cloneUserBooked = cloneData(bookedUser);
    if (!_.isEmpty(cloneUserBooked)) {
      setUserServices(cloneUserBooked.services);
    }
  }, [bookedUser]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  // validate select duplicate service
  const validateDuplicateService = (id) => {
    const cloneUserServices = cloneData(userServices);
    for (const service of cloneUserServices) {
      if (service.service_id === id) {
        listServiesRef.current.className = "form-select is-invalid";
        return true;
      } else {
        listServiesRef.current.className = "form-select";
      }
    }
  };

  const hanldeOnChangeQuantity = (event, id) => {
    const cloneUserServices = cloneData(userServices);
    if (!_.isEmpty(cloneUserServices)) {
      const service = cloneUserServices.find((item) => item.service_id === id);
      service.quantity = +event.target.value;
      // if (service.quantity < 0 || service.quantity > 32) {
      //   serviceQty.current.className = "form-control is-invalid";
      //   return;
      // }else {
      //   serviceQty.current.className = "form-control";
      // }
    }
    setUserServices(cloneUserServices);
  };

  const hanldeOnchangeService = (event, id) => {
    const cloneUserServices = cloneData(userServices);
    // find service only match the unique_id
    const extraService = cloneUserServices.find((item) => {
      return item.unique_id === id;
    });
    // if (extraService === cloneUserServices[0]) return;
    if (validateDuplicateService(event.target.value)) {
      extraService.service_id = "";
      setUserServices(cloneUserServices);
      return;
    }
    extraService.service_id = event.target.value;
    console.log(">>> check userServices: ", userServices);
    // select duplicate service
    setUserServices(cloneUserServices);
  };

  const fetchAllServices = async () => {
    const [error, res] = await hanlderRequest(axios.get(API_URL + "/services"));
    if (res && res.data) {
      setListServices(res.data);
    } else {
      console.log(`%c ${error.message}`, "color: red");
    }
  };

  const handleUpdateServices = async (bookedUser) => {
    let error, res;
    // update quantity
    for (const service of userServices) {
      [error, res] = await hanlderRequest(
        axios.put(
          API_URL + `/bookedservices/${bookedUser._id}/${service.service_id}`,
          { quantity: `${service.quantity}` }
        )
      );
    }

    // update add extra service
    for (const extraService of userServices) {
      if (extraService.unique_id) {
        console.log(">> extra service: ", extraService);
        if (extraService.quantity === "" || extraService.service_id === "") {
          toast.error("chưa điền dịch vụ mới thêm");
          return;
        }else {
          console.log("_> will update user services: ", userServices);
          [error, res] = await hanlderRequest(
            axios.put(API_URL + `/bookedservices/${bookedUser._id}`, {
              service_id: `${extraService.service_id}`,
              quantity: `${extraService.quantity}`,
            })
          );
        }
      }
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
      service_id: "",
      quantity: "",
    };
    setUserServices([...userServices, newEmptyServices]);
  };

  const handleDeleteExtraService = (id) => {
    const newUserServices = userServices.filter(
      (item) => item.unique_id !== id
    );
    if (newUserServices) {
      setUserServices(newUserServices);
    }
  };

  const resetEmptyServices = () => {
    setTimeout(() => {
      const removedEmptyValue = userServices.filter(
        (service) => !service.unique_id
      );
      setUserServices(removedEmptyValue);
    }, 500);
  };

  const hanldeCloseModal = () => {
    setModalShow(false);
    resetEmptyServices();
  };

  // console.log('>> check user service: ', userServices);
  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      top="true"
      style={{ width: "500px", margin: "auto" }}
      onHide={hanldeCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Dịch Vụ Phát Sinh
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
          <div className="col-md-3">
            <label className="form-label">Giờ Khám</label>
            <input
              type="text"
              className="form-control"
              style={{ cursor: "no-drop" }}
              defaultValue={formatSlot(bookedUser.slot_time)}
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
                    onChange={(event) =>
                      hanldeOnchangeService(event, service.unique_id)
                    }
                    name="select-service"
                    ref={listServiesRef}
                  >
                    <option>--- Thêm dịch vụ ---</option>
                    {listServices &&
                      listServices.length > 0 &&
                      listServices.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <option value={item._id}>{`${item.name}`}</option>
                          </React.Fragment>
                        );
                      })}
                  </select>
                  <span className="invalid-feedback mt-2">
                    dịch vụ này đã được chọn
                  </span>
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputQnt" className="form-label testcss">
                    sửa số lượng
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputQnt"
                    value={service.quantity}
                    placeholder="1-32"
                    name="quantity"
                    onChange={(event) =>
                      hanldeOnChangeQuantity(event, service.service_id)
                    }
                    min="1"
                    ref={serviceQty}
                    max="32"
                  />
                  <span className="invalid-feedback mt-2">không hợp lệ</span>
                </div>
                <div className="col-md-1 plus-service">
                  {service.unique_id && (
                    <span
                      className="note-icon"
                      onClick={() =>
                        handleDeleteExtraService(service.unique_id)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        style={{ fontSize: "24px" }}
                      />
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </form>
      </Modal.Body>
      <center
        style={{
          padding: "10px 0",
          color: "var(--secondary-color)",
          cursor: "pointer",
        }}
      >
        {userServices.length >= 7 ? (
          ""
        ) : (
          <span className="add-extra-icon" onClick={hanldeAddExtraService}>
            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "24px" }} />
          </span>
        )}
      </center>
      <Modal.Footer>
        <button className="cancle-btn" onClick={hanldeCloseModal}>
          Hủy
        </button>
        <Button onClick={() => handleUpdateServices(bookedUser)}>
          Cập Nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(ModalEditServices);
