import { faker } from '@faker-js/faker';
import React, { useEffect, useRef, useState } from 'react'
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import ServiceDetail from '../components/ServiceDetail/ServiceDetail';
import ServiceTable from '../components/ServiceTable/ServiceTable';
import axios from "axios";
import ROUTER from "../api/Router";
import toastOption from '../config/toast';
import { toast } from "react-toastify";

const demoServices = () => [
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  },
  {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    price: faker.commerce.price(100000, 2000000),
    name: faker.commerce.productName()
  }
]

const Service = () => {
  const [serviceList, setServiceList] = useState();
  const [createService, setcreateService] = useState(false);
  const [serviceDetail, setServiceDetail] = useState(null);
  const serviceName = useRef();
  const servicePrice = useRef();
  const serviceDescription = useRef();

  const getAllService = async () => {
    try {
      const result = await axios.get(`${ROUTER}/api/services`);
      if (result.status === 200) {
        setServiceList(result.data);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const onDeleteBlogById = (id) => {
    if (!id) return
    setServiceList(list => list.filter(list => list._id !== id));
  }

  useEffect(() => {
    getAllService()
  }, [])


  const onClickEditService = (id) => {
    if (!id) return;
    setcreateService(!createService)
    setServiceDetail(serviceList.find(service => service._id === id))
  }

  const onSelectCreateService = () => {
    if (serviceDetail) setServiceDetail(null);
    setcreateService(true)
  }

  const updateList = (newItem, currentList) => {
    const list = [...currentList];
    const isExist = list.find(item => item._id === newItem._id);
    if (!isExist) return [...list, newItem];

    const indexOfItem = list.findIndex(item => item._id === newItem._id);
    list[indexOfItem] = newItem;
    return list;
  }

  const onClicSaveService = async () => {
    const data = {
      name: serviceName.current.value,
      price: servicePrice.current.value,
      description: serviceDescription.current.value
    }

    try {
      const result = serviceDetail ? await axios.put(`${ROUTER}/api/services/${serviceDetail._id}`, data) : await axios.post(`${ROUTER}/api/services`, data);
      if (result.status === 200) {
        const newService = result.data.services;
        setServiceList(list => updateList(newService, list));
        toast.success("Susscess!", toastOption);
      }

      // Reset input
      if (serviceDetail) return;

      serviceName.current.value = "";
      servicePrice.current.value = "";
      serviceDescription.current.value = "";

    } catch (error) {
      console.log(error.message);
      toast.error("Create Error!", toastOption);
    }

  }

  return (
    <div className='bg-light container w-100 h-100 d-flex flex-column gap-3'>
      <div className='row'>
        {/* Header */}
        <div className="col-12 d-flex align-items-center py-3 justify-content-between">
          {
            createService ?
              <button onClick={() => setcreateService(false)} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button> :
              <h4 className='m-0'>SERVICE</h4>
          }
          {
            createService ? <button className="btn btn-primary" onClick={() => onClicSaveService()} style={{ width: "10%" }} type="submit"> Save </button> : <button onClick={() => onSelectCreateService()} className="btn btn-primary" style={{ width: "10%" }} type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {
          createService ?
            <ServiceDetail serviceDetail={serviceDetail} serviceName={serviceName} servicePrice={servicePrice} serviceDescription={serviceDescription} /> :
            <ServiceTable onDeleteBlogById={onDeleteBlogById} services={serviceList} onClickEditService={onClickEditService} />
        }


      </div>
    </div>
  )
}

export default Service