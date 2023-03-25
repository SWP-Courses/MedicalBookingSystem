import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import { useRef, useContext } from "react";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";
import { v4 as uuidv4 } from "uuid";
import "./EditServices.scss";
import { cloneData } from "~/utils";
import { DoctorContext } from "~/context/DoctorContext";

function EditServices() {
  const context = useContext(DoctorContext);
  const [listServices, setListServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const serviceQty = useRef();

  useEffect(() => {
    setUserServices(context.user.services);
  }, [context.user]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  // validate select duplicate service
  const validateDuplicateService = (id) => {
    let isduplicated = false;
    for (const service of userServices) {
      if (service.service_id === id) {
        toast.error("dịch vụ này đã được chọn", {
          position: "top-center",
          autoClose: 1500,
        });
        isduplicated = true;
        break;
      }
    }
    return isduplicated;
  };

  const hanldeOnChangeQuantity = (quantity, id) => {
    const cloneUserServices = cloneData(userServices);
    const service = cloneUserServices.find((item) => item.service_id === id);
    service.quantity = quantity;
    if (quantity < 1 || quantity > 32) {
      if(!(quantity === "")) {
        toast.error("số lượng phải >= 1 hoặc <= 32", {
          position: "top-center",
          autoClose: 1500
        });
      } 
    }
    setUserServices(cloneUserServices); 
  };

  const hanldeOnchangeService = (event, uuid, service_id) => {
    const cloneUserServices = cloneData(userServices);
    const isduplicated = validateDuplicateService(event.target.value);
    // onchange on booked service
    if (service_id) {
      const bookedServices = cloneUserServices.find((item) => {
        return item.service_id === service_id;
      });
      if (!isduplicated) {
        bookedServices.service_id = event.target.value;
      }
    }

    // onchange on addition services
    if (uuid) {
      const extraService = cloneUserServices.find((item) => {
        return item.unique_id === uuid;
      });
      if (isduplicated) {
        extraService.service_id = "";
        setUserServices(cloneUserServices);
        return;
      }
      extraService.service_id = event.target.value;
    }

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

  const handleUpdateServices = async () => {
    const propsToDelete = ["unique_id", "name", "price"];
    const newServiceList = userServices.map((service) => {
      propsToDelete.forEach((item) => {
        delete service[item];
      });
      return service;
    });

    const [error, res] = await hanlderRequest(
      axios.put(API_URL + `/bookedservices/${context.user._id}`, {
        newServiceList,
      })
    );

    if (res) {
      toast.success("cập nhật thành công", {
        icon: "✅",
        autoClose: 1000,
        position: "top-center",
      });
      await context.fetchSchedule();
      context.setUser(context.user);
    } else {
      console.log(`%c ${error}`, "color: red");
      toast.error("chưa điền đủ thông tin", {
        icon: "❌",
        autoClose: 1000,
        position: "top-center",
      });
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

  const handleDeleteExtraService = (service_id, unique_id) => {
    let newUserServices;
    if (unique_id) {
      newUserServices = userServices.filter(
        (item) => item.unique_id !== unique_id
      );
    }

    if (service_id) {
      newUserServices = userServices.filter(
        (item) => item.service_id !== service_id
      );
    }

    if (newUserServices) {
      setUserServices(newUserServices);
    }
  };

  const resetAdditionServices = () => {
    const removedEmptyValue = userServices.filter(
      (service) => !service.unique_id
    );
    setUserServices(removedEmptyValue);
  };

  console.log(">> check userServices: ", userServices);
  return (
    <>
      {userServices?.map((service, index) => {
        return (
          <div className="row addition-services py-1" key={index}>
            <div className="col-md-4">
              <label htmlFor="inputCity" className="form-label">
                {`Dịch Vụ - ${index + 1}`}
              </label>
              <select
                id="inputState"
                className="form-select"
                value={service.service_id}
                onChange={(event) =>
                  hanldeOnchangeService(
                    event,
                    service.unique_id,
                    service.service_id
                  )
                }
                name="select-service"
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
                  hanldeOnChangeQuantity(event.target.value, service.service_id)
                }
                min="1"
                ref={serviceQty}
                max="32"
              />
              <span className="invalid-feedback mt-2">không hợp lệ</span>
            </div>
            <div className="col-md-1 plus-service">
              {
                <span
                  className="note-icon"
                  onClick={() =>
                    handleDeleteExtraService(
                      service.service_id,
                      service.unique_id
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    style={{ fontSize: "22px" }}
                  />
                </span>
              }
            </div>
          </div>
        );
      })}
      <div className="footerSchedule">
        <button className="cancle-btn" onClick={() => resetAdditionServices()}>
          Hủy
        </button>
        <Button
          className="ml-3"
          onClick={() => handleUpdateServices(context.user)}
        >
          Cập Nhật
        </Button>
      </div>

      {Object.keys(context.user).length > 0 ? (
        <span style={{}} className="row faCirclePlus-icon">
          {userServices?.length >= 7 ? (
            ""
          ) : (
            <span className="add-extra-icon" onClick={hanldeAddExtraService}>
              <FontAwesomeIcon
                icon={faCirclePlus}
                style={{ fontSize: "24px" }}
              />
            </span>
          )}
        </span>
      ) : (
        ""
      )}
    </>
  );
}

export default EditServices;
