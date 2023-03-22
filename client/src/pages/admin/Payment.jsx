import React, { useState, useEffect } from "react";
import PaymentTable from "~/components/admin/PaymentTable/PaymentTable";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "~/hooks/userMutationHook";
import axios from "axios";
import ROUTER from "~/api/adminRouter";
import "./style/Payment.css";
import {
  Input,
  Col,
  Row,
  Space,
  Button,
  Typography,
  Divider,
  Form,
} from "antd";
import PaymentDetail from "~/components/admin/PaymentDetail/PaymentDetail";
import Loading from "~/components/admin/UI/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastOption from "~/config/toast";
import { toast } from "react-toastify";
import { Form as BsForm } from "react-bootstrap";

const Payment = () => {
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(new Date());
  const [sortedInfo, setSortedInfo] = useState({});
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [payCode, setPayCode] = useState();

  const [stateBookedServicesDetail, setStateBookedServicesDetail] = useState({
    id: "",
    user_name: "",
    doctor_name: "",
    date: "",
    slot_time: "",
    services: "",
    total_price: "",
    isPaid: "",
  });

  const { Title } = Typography;
  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { user_name, doctor_name, date, slot_time, services } = data;
  });

  //call api
  const getAllBookedService = async () => {
    try {
      const res = await axios.get(`${ROUTER}/api/bookedservices`);
      return res.data.result;
    } catch (error) {
      console.log(error);
      // toast.warning(error)
    }
  };

  //call api
  const getDetailBookedServiceId = async (rowSelected) => {
    try {
      const res = await axios.get(
        `${ROUTER}/api/bookedservices/${rowSelected}`
      );
      if (res?.data.result) {
        // const formattedAmount = res?.data?.result?.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        setStateBookedServicesDetail({
          id: rowSelected,
          user_name: res?.data?.result?.user_name,
          doctor_name: res?.data?.result?.doctor_name,
          date: res?.data?.result?.date,
          slot_time: res?.data?.result?.slot_time,
          services: res?.data?.result?.services,
          total_price: res?.data?.result?.total_price,
          isPaid: res?.data?.result?.isPaid,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldValue(stateBookedServicesDetail);
  }, [form, stateBookedServicesDetail]);

  useEffect(() => {
    if (rowSelected) {
      getDetailBookedServiceId(rowSelected);
    }
  }, [rowSelected]);

  const { data, isLoading, isSuccess, isError } = mutation;
  const queryProduct = useQuery({
    queryKey: ["bookedServices"],
    queryFn: getAllBookedService,
  });
  const { isLoading: isLoadingBookedService, data: bookedServices } =
    queryProduct;

  const dataTable =
    bookedServices?.length &&
    bookedServices
      ?.filter((obj) => {
        const dateObj = new Date(obj.date);
        const isSameDate = dateObj.toDateString() === date.toDateString();
        return isSameDate;
      })
      .map((obj) => {
        return {
          ...obj,
          key: obj._id,
          date: new Date(obj.date).toLocaleDateString("en-GB"),
        };
      })
      ?.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        } else if (a.slot_time < b.slot_time) {
          return -1;
        } else if (a.slot_time > b.slot_time) {
          return 1;
        } else {
          return 0;
        }
      })
      ?.reverse();

  const renderAction = () => {
    return (
      <div className="edit-button" onClick={handleDetailBookedService}>
        <i className="ri-edit-line"></i>
      </div>
    );
  };

  const columns = [
    {
      key: "2",
      title: "Bill Number",
      dataIndex: "billNumber"
    },
    {
      key: "1",
      title: "Patient",
      dataIndex: "user_name",
    },
    {
      key: "2",
      title: "Doctor",
      dataIndex: "doctor_name",
    },
    {
      key: "4",
      title: "Time",
      dataIndex: "slot_time",
      align: "center",
      render : (slot_time) => {
        return (<p>{slot_time}:00</p>)
      },
      sorter: (a, b) => b.slot_time - a.slot_time,
      sortOrder: sortedInfo.columnKey === "slot_time" && sortedInfo.order,
    },
    {
      key: "5",
      title: "Payment status",
      dataIndex: "isPaid",
      align: "center",
      render: (isPaid) => {
        return (
          <i
            className={
              isPaid ? "ri-checkbox-circle-fill" : "ri-close-circle-fill"
            }
          ></i>
        );
      },
      sorter: (a, b) => a.isPaid - b.isPaid,
      sortOrder: sortedInfo.columnKey === "isPaid" && sortedInfo.order,
    },
    {
      key: "6",
      title: "Action",
      dataIndex: "Action",
      align: "center",
      render: renderAction,
    },
  ];

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleChange = (...sorter) => {
    const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  };

  const handleReset = () => {
    setSortedInfo({});
    setDate(new Date());
    setSearchText("");
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      getAllBookedService();
    }
  };

  const handleDetailBookedService = () => {
    setIsOpenDrawer(true);
  };

  const calculatorTotalPrice = () => {
    let total = 0;
    stateBookedServicesDetail.services?.length &&
      stateBookedServicesDetail.services?.forEach((obj) => {
        total = total + obj.quantity * obj.price;
      });
    return total;
  };

  const handlePayment = async () => {
    const data = {
      total_price: calculatorTotalPrice(),
      isPaid: true,
      payCode
    };

    if (!payCode) {
      toast.info("Vui lòng điền mã thanh toán", toastOption);
      return;
    }

    try {
      const res = await axios.patch(
        `${ROUTER}/api/bookedservices/payment/${stateBookedServicesDetail.id}`,
        data
      );

      if (res.status === 200) {
        setIsOpenDrawer(false);
        toast.success("Payment Success!", toastOption);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data);
      toast.warning(error.response.data, toastOption);
    }
  };

  const formatDate = (data) => {
    let date = new Date(data);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  return (
    <div className="bg-light container w-100 h-100 d-flex flex-column gap-3">
      <div className="row">
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          <h4 className="m-0">PAYMENT MANAGEMENT</h4>
        </div>

        <div>
          <Row className="m-2">
            <Col span={6}>
              <Input
                placeholder="Search Patient by Name"
                onChange={handleInputChange}
                value={searchText}
                allowClear
              ></Input>
            </Col>

            <Col span={4} className="input-date-payment">
              <label htmlFor="date">
                <i className="ri-calendar-fill"></i>
              </label>

              <Input.Group compact>
                <DatePicker
                  id="date"
                  showIcon
                  style={{
                    width: "100px",
                  }}
                  dateFormat="dd/MM/yyyy"
                  onChange={handleDateChange}
                  selected={date}
                />
              </Input.Group>
            </Col>

            <Col span={6}>
              <Space>
                <Button onClick={handleReset}>Reset</Button>
              </Space>
            </Col>
          </Row>

          <PaymentTable
            columns={columns}
            isLoading={isLoadingBookedService}
            data={
              dataTable?.length &&
              dataTable?.filter((value) => {
                const isMatchSearchText = value.user_name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
                return isMatchSearchText;
              })
            }
            onChange={handleChange}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </div>
        <PaymentDetail
          title="Service bill"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width="70%"
        >
          <Loading isLoading={isLoading}>
            <Row gutter={16}>
              <Col span={12}>
                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  Patient Name: {stateBookedServicesDetail.user_name}
                </Typography.Title>

                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  Date: {formatDate(stateBookedServicesDetail.date)}
                </Typography.Title>
              </Col>

              <Col span={12}>
                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  Doctor Name: {stateBookedServicesDetail.doctor_name}
                </Typography.Title>

                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  Slot: {stateBookedServicesDetail.slot_time}
                </Typography.Title>
              </Col>
            </Row>
            <Divider></Divider>

            <Row gutter={16}>
              <Col span={24}>
                <Title level={3}>Services: </Title>
              </Col>

              <Col span={8} style={{ fontWeight: "bold" }}>
                Name Services:
              </Col>

              <Col span={8} style={{ fontWeight: "bold" }}>
                Quantity:
              </Col>

              <Col span={8} style={{ fontWeight: "bold" }}>
                Price:
              </Col>

              {stateBookedServicesDetail.services?.length &&
                stateBookedServicesDetail.services?.map((obj) => (
                  <>
                    <Col
                      span={8}
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    >
                      {obj.service_name}
                    </Col>

                    <Col
                      span={8}
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        paddingLeft: "25px",
                      }}
                    >
                      {obj.quantity} cái
                    </Col>

                    <Col
                      span={8}
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    >
                      {obj.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Col>
                  </>
                ))}

              <Divider></Divider>

              <Col span={12}>
                <BsForm.Label htmlFor="payCode">* Mã số thanh toán</BsForm.Label>
                <BsForm.Control
                  type="number"
                  id="payCode"
                  value={payCode}
                  onChange={e => setPayCode(e.target.value)}
                />
              </Col>

              <Col span={6} offset={2} className="total-price">
                Total price:{" "}
                {stateBookedServicesDetail.total_price
                  ? stateBookedServicesDetail.total_price.toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                  )
                  : calculatorTotalPrice().toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </Col>
            </Row>

            <Row style={{ marginTop: "30px", position: "relative" }}>
              <Col span={8}></Col>
              <Col span={8} offset={8}>
                {!stateBookedServicesDetail.isPaid ? (
                  <Button
                    className="btn-payment"
                    type="primary"
                    onClick={handlePayment}
                  >
                    Check out
                  </Button>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Loading>
        </PaymentDetail>
      </div>
    </div>
  );
};

export default Payment;
