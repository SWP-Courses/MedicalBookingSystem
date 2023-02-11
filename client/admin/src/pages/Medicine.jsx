import React, { useEffect, useRef, useState } from 'react'
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import MedicineInfo from '../components/MedicineInfo/MedicineInfo';
import MedicineTable from '../components/MedicineTable/MedicineTable';
import axios from "axios";
import ROUTER from "../api/Router";
import toastOption from '../config/toast';
import { toast } from "react-toastify";

const Medicine = () => {
  const [medicineList, setMedicineList] = useState();
  const [createMedicine, setCreateMedicine] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState(null);
  const medicineName = useRef();
  const medicineDosageForm = useRef();
  const medicineType = useRef();
  const medicinePrice = useRef();
  

  const getAllMedicine = async () => {
    try {
      const result = await axios.get(`${ROUTER}/api/medicine`);
      if (result.status === 200) {
        setMedicineList(result.data.medicines);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllMedicine()
  }, [])


  const onClickEditMedicine = (id) => {
    if (!id) return;
    setCreateMedicine(!createMedicine)
    setMedicineInfo(medicineList.find(medicine => medicine._id === id))
  }

  const onSelectCreateMedicine = () => {
    if (medicineInfo) setMedicineInfo(null);
    setCreateMedicine(true)
  }

  const updateList = (newItem, currentList) => {
    const list = [...currentList];
    console.log(list);
    const isExist = list.find(item => item._id === newItem._id);
    if (!isExist) return [...list, newItem];
    const indexOfItem = list.findIndex(item => item._id === newItem._id);
    list[indexOfItem] = newItem;
    return list;
  }

  const onClickSaveMedicine = async () => {
    const data = {
      name: medicineName.current.value,
      dosageForm: medicineDosageForm.current.value,
      type: medicineType.current.value,
      price: medicinePrice.current.value,
    }

    try {
      const result = medicineInfo ? await axios.put(`${ROUTER}/api/medicine/${medicineInfo._id}`, data)
        : await axios.post(`${ROUTER}/api/medicine`, data);
      if (result.status === 200) {
        const newMedicine = result.data.updateMedicine;
        setMedicineList(list => updateList(newMedicine, list));
        toast.success("Success!", toastOption);
      }

      // Reset input
      if (medicineInfo) return;

      medicineName.current.value = "";
      medicineDosageForm.current.value = "";
      medicineType.current.value = "";
      medicinePrice.current.value = "";

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
            createMedicine
              ? <button onClick={() => setCreateMedicine(false)} className='m-0 d-flex gap-2 back-button btn justify-content-center align-items-center'><BsArrowLeft /> BACK</button>
              : <h4 className='m-0'>MEDICINE</h4>
          }
          {
            createMedicine
              ? <button className="btn btn-primary"
                onClick={() => onClickSaveMedicine()}
                style={{ width: "10%" }}
                type="submit"> Save </button>
              : <button onClick={() => onSelectCreateMedicine()}
                className="btn btn-primary"
                style={{ width: "10%" }}
                type="submit"> <BsPlus className='fs-5' />Add New</button>
          }
        </div>

        {
          createMedicine
            ? <MedicineInfo medicineInfo={medicineInfo}
              medicineName={medicineName}
              medicineDosageForm={medicineDosageForm}
              medicineType={medicineType}
              medicinePrice={medicinePrice} />
            : <MedicineTable medicines={medicineList}
              onClickEditMedicine={onClickEditMedicine} />
        }


      </div>


    </div>
  )
}

export default Medicine