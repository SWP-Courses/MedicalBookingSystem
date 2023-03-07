import React, { useState } from 'react'
import PaymentTable from '../components/PaymentTable/PaymentTable'
import { useQuery } from '@tanstack/react-query'
import { useMutationHooks } from '../hooks/userMutationHook'
import axios from "axios";
import ROUTER from "../api/Router";
import '../styles/Payment.css'
import { Input, Form, DatePicker, Col, Row, Space, Button } from 'antd'
import moment from 'moment'
import PaymentDetail from '../components/PaymentDetail/PaymentDetail';
import Loading from '../components/UI/Loading';
import InputComponent from '../components/UI/InputComponent'


const Payment = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedDate, setSelectedDate] = useState(moment())
  const [sortedInfo, setSortedInfo] = useState({})
  const [filterData, setFilterData] = useState([])
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const getAllBookedService = async () => {
    const res = await axios.get(`${ROUTER}/api/bookedservices`)
    setFilterData(dataTable)
    return res.data.bookedService
  }

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { user_id, doctor_id, date, slot_time, services } = data
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

  // const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data, isLoading, isSuccess, isError } = mutation
  const queryProduct = useQuery({ queryKey: ['bookedServices'], queryFn: getAllBookedService })
  const { isLoading: isLoadingBookedService, data: bookedServices } = queryProduct

  const dataTable = bookedServices?.length && bookedServices?.map((obj) => {
    return { ...obj, key: obj._id, date: new Date(obj.date).toLocaleDateString('en-GB') }
  })

  const renderAction = () => {
    return (
      <div className='edit-button' onClick={handleDetailBookedService}><i className="ri-edit-line"></i></div>
    )
  }

  const columns = [
    {
      key: "1",
      title: 'Patient',
      dataIndex: 'user_id',
    },
    {
      key: "2",
      title: 'Doctor',
      dataIndex: 'doctor_id',
    },
    {
      key: "3",
      title: 'Date',
      dataIndex: 'date',
      // filteredValue: [selectedDate],
      // onFilter: (value, record) => {
      //   return record.date.includes(value)
      // }
    },
    {
      key: "4",
      title: 'Slot',
      dataIndex: 'slot_time',
      align: 'center',
      sorter: ((a, b) => a.slot_time - b.slot_time),
      sortOrder: sortedInfo.columnKey === "slot_time" && sortedInfo.order,
      className: 'slot_field'
    },
    {
      key: "5",
      title: 'Payment status',
      dataIndex: 'isConfirm',
      align: 'center',
      render: (isConfirm) => {
        return <i className={isConfirm ? "ri-checkbox-circle-fill" : "ri-close-circle-fill"}></i>
      },
      sorter: ((a, b) => a.isConfirm - b.isConfirm),
      sortOrder: sortedInfo.columnKey === "isConfirm" && sortedInfo.order
    },
    {
      key: "6",
      title: 'Action',
      dataIndex: 'Action',
      align: 'center',
      render: renderAction
    }
  ];

  const handleDateChange = () => {
    setSelectedDate()
  }

  const handleChange = (...sorter) => {
    const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  }

  const handleReset = () => {
    setSortedInfo({})
    setSelectedDate(moment())
    getAllBookedService()
    setSearchText("")
    setFilterData(dataTable)
  }

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      getAllBookedService()
    }
  }

  const globalSearch = () => {
    setFilterData(dataTable.filter((value) => {
      return value.user_id.toLowerCase().includes(searchText.toLowerCase())
    }))
  }

  const handleDetailBookedService = () => {
    setIsOpenDrawer(true)
    console.log('rowSelected', rowSelected)
  }

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row'>
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          <h4 className='m-0'>PAYMENT MANAGEMENT</h4>
        </div>

        <div>
          <Row>
            <Col span={8}>
              <Input
                placeholder='Search Patient by Name'
                // style={{ width: '25%' }}
                onChange={handleInputChange}
                value={searchText}
                allowClear
              ></Input>
              <Button onClick={globalSearch} type='primary'>Search</Button>
            </Col>

            <Col span={8}>
              <Input.Group compact>
                <Input
                  style={{
                    width: '25%',
                  }}
                  defaultValue="Select date"
                  disabled
                />
                <DatePicker
                  style={{
                    width: '50%',
                  }}
                  format="DD/MM/YYYY"
                  onChange={handleDateChange}
                  defaultValue={selectedDate}
                />
              </Input.Group>
            </Col>

            <Col span={8}>
              <Space>
                <Button onClick={handleReset}>Reset</Button>
              </Space>
            </Col>
          </Row>

          <PaymentTable columns={columns}
            isLoading={isLoadingBookedService}
            data={filterData ? filterData : dataTable}
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
            <Form
              name='basic'
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 18 }}
              // onFinish={}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="User_id"
                name="user_id"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="name" />
              </Form.Item>

              <Form.Item
                label="Doctor_id"
                name="doctor_id"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="doctor_id" />
              </Form.Item>

              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="date" />
              </Form.Item>

              <Form.Item
                label="Slot"
                name="slot"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="slot" />
              </Form.Item>

              <Form.Item
                label="Slot"
                name="slot"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="slot" />
              </Form.Item>
              
              <Form.Item
                label="Slot"
                name="slot"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="slot" />
              </Form.Item>

              <Form.Item
                label="Slot"
                name="slot"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="slot" />
              </Form.Item>

              <Form.Item
                label="Slot"
                name="slot"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent name="slot" />
              </Form.Item>


            </Form>
          </Loading>
        </PaymentDetail>

      </div>
    </div>

  )
}

export default Payment