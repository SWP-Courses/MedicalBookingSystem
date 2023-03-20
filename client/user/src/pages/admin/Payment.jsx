import React, { useState, useEffect } from 'react'
import PaymentTable from '~/components/admin/PaymentTable/PaymentTable';
import { useQuery } from '@tanstack/react-query'
import { useMutationHooks } from '~/hooks/userMutationHook';
import axios from "axios";
import ROUTER from '~/api/adminRouter';
import './Payment.css'
import { Input, Form, Col, Row, Space, Button, Typography, Divider } from 'antd'
import PaymentDetail from '~/components/admin/PaymentDetail/PaymentDetail';
import Loading from '~/components/admin/UI/Loading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toastOption from '~/config/toast';
import { toast } from "react-toastify";

const Payment = () => {
  const [searchText, setSearchText] = useState("")
  const [date, setDate] = useState(new Date())
  const [sortedInfo, setSortedInfo] = useState({})
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const [stateBookedServicesDetail, setStateBookedServicesDetail] = useState({
    id: "",
    user_name: "",
    doctor_name: "",
    date: "",
    slot_time: "",
    services: "",
    total_price: "",
    isPaid: ""
  })



  const [form] = Form.useForm();
  const mutation = useMutationHooks(
    (data) => {
      const { user_name, doctor_name, date, slot_time, services } = data
    }
  )
  // const mutationUpdate = useMutationHooks(
  //   (data) => {
  //     const { id,
  //       token,
  //       ...rests } = data
  //     const res = ProductService.updateProduct(
  //       id,
  //       token,
  //       { ...rests })
  //     return res
  //   },
  // )

  //call api
  const getAllBookedService = async () => {
    try {
      const res = await axios.get(`${ROUTER}/api/bookedservices`)
      return res.data.result
    } catch (error) {
      console.log(error)
    }
  }

  //call api
  const getDetailBookedServiceId = async (rowSelected) => {
    try {
      const res = await axios.get(`${ROUTER}/api/bookedservices/${rowSelected}`)
      if (res?.data.result) {
        setStateBookedServicesDetail({
          id: rowSelected,
          user_name: res?.data?.result?.user_name,
          doctor_name: res?.data?.result?.doctor_name,
          date: res?.data?.result?.date,
          slot_time: res?.data?.result?.slot_time,
          services: res?.data?.result?.services,
          total_price: res?.data?.result?.total_price,
          isPaid: res?.data?.result?.isPaid
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    form.setFieldValue((stateBookedServicesDetail))
  }, [form, stateBookedServicesDetail])

  useEffect(() => {
    if (rowSelected) {
      getDetailBookedServiceId(rowSelected)
    }
  }, [rowSelected])

  // const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data, isLoading, isSuccess, isError } = mutation
  const queryProduct = useQuery({ queryKey: ['bookedServices'], queryFn: getAllBookedService })
  const { isLoading: isLoadingBookedService, data: bookedServices } = queryProduct

  const dataTable = bookedServices?.length && bookedServices?.filter((obj) => {
    const dateObj = new Date(obj.date);
    const isSameDate = dateObj.toDateString() === date.toDateString();
    return isSameDate
  }).map((obj) => {
    return { ...obj, key: obj._id, date: new Date(obj.date).toLocaleDateString('en-GB') }
  })?.sort((a, b) => {
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

  const renderAction = () => {
    return (
      <div className='edit-button' onClick={handleDetailBookedService}><i className="ri-edit-line"></i></div>
    )
  }

  const { Title } = Typography;

  const columns = [
    {
      key: "1",
      title: 'Patient',
      dataIndex: 'user_name',
    },
    {
      key: "2",
      title: 'Doctor',
      dataIndex: 'doctor_name',
    },
    {
      key: "4",
      title: 'Slot',
      dataIndex: 'slot_time',
      align: 'center',
      sorter: ((a, b) => b.slot_time - a.slot_time),
      sortOrder: sortedInfo.columnKey === "slot_time" && sortedInfo.order,
    },
    {
      key: "5",
      title: 'Payment status',
      dataIndex: 'isPaid',
      align: 'center',
      render: (isPaid) => {
        return <i className={isPaid ? "ri-checkbox-circle-fill" : "ri-close-circle-fill"}></i>
      },
      sorter: ((a, b) => a.isPaid - b.isPaid),
      sortOrder: sortedInfo.columnKey === "isPaid" && sortedInfo.order
    },
    {
      key: "6",
      title: 'Action',
      dataIndex: 'Action',
      align: 'center',
      render: renderAction
    }
  ];

  const handleDateChange = (date) => {
    setDate(date)
  }

  const handleChange = (...sorter) => {
    const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  }

  const handleReset = () => {
    setSortedInfo({})
    setDate(new Date())
    setSearchText("")
  }

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      getAllBookedService()
    }
  }

  const handleDetailBookedService = () => {
    setIsOpenDrawer(true)
  }

  const calculatorTotalPrice = () => {
    let total = 0;
    stateBookedServicesDetail.services?.length && stateBookedServicesDetail.services?.forEach(obj => {
      total = total + obj.quantity * obj.price;
    })
    return total
  }

  const handleOnchangeDetails = (e) => {
    setStateBookedServicesDetail({
      ...stateBookedServicesDetail,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = async () => {
    const data = {
      total_price: calculatorTotalPrice(),
      isPaid: true
    }

    try {
      const res = await axios.patch(`${ROUTER}/api/bookedservices/payment/${stateBookedServicesDetail.id}`, data)

      if (res.status === 200) {
        setIsOpenDrawer(false)
        window.location.reload();
        toast.success("Payment Success!", toastOption);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Payment Error!", toastOption);
    }

  }

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row'>
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          <h4 className='m-0'>PAYMENT MANAGEMENT</h4>
        </div>

        <div>
          <Row className='m-2'>
            <Col span={6}>
              <Input
                placeholder='Search Patient by Name'
                onChange={handleInputChange}
                value={searchText}
                allowClear
              ></Input>
            </Col>

            <Col span={6}>
              <Input.Group compact>
                <DatePicker
                  showIcon
                  style={{
                    width: '50%',
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

          <PaymentTable columns={columns}
            isLoading={isLoadingBookedService}
            data={dataTable?.length && dataTable?.filter((value) => {
              const isMatchSearchText = value.user_name.toLowerCase().includes(searchText.toLowerCase());
              return isMatchSearchText
            })}
            onChange={handleChange}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setRowSelected(record._id)
                }
              };
            }}
          />

        </div>
        <PaymentDetail title='Service bill'
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width='70%'>
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
                  Date: {stateBookedServicesDetail.date}
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


              <Col span={8} >
                Name Services:
              </Col>

              <Col span={8}>
                Quantity
              </Col>

              <Col span={8}>
                Price:
              </Col>


              {stateBookedServicesDetail.services?.length && stateBookedServicesDetail.services?.map(obj => (
                <>
                  <Col span={8} >
                    {obj.service_name}
                  </Col>

                  <Col span={8}>
                    {obj.quantity}
                  </Col>

                  <Col span={8}>
                    {obj.price}
                  </Col>
                </>
              ))}

              <Divider></Divider>

              <Col span={6} >
              </Col>

              <Col span={6} offset={8}>
                Total price:  {stateBookedServicesDetail.total_price ? stateBookedServicesDetail.total_price : calculatorTotalPrice()}
              </Col>

            </Row>

            <Row style={{marginTop:'30px'}}>
              <Col span={8}></Col>
              <Col span={8} offset={8}>
                {!stateBookedServicesDetail.isPaid ? <Button type="primary" onClick={handlePayment}>Payment</Button> : <></>}
              </Col>
            </Row>

          </Loading>
        </PaymentDetail>

      </div>
    </div >

  )
}

export default Payment