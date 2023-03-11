import React, { useState } from 'react'
import Creatable from 'react-select/creatable'

function MedicineInfo({ medicineInfo, medicineName, medicineDosageForm, medicineType, medicinePrice, typeMedicineList }) {
    //filter unique medicine type and dosage form

    const [typeValue, setTypeValue] = useState('')


    // const types = [...typeMedicineList.map(obj => obj.name)]

    const types = [
        { label: 'Viên', value: 'Viên' },
        { label: 'Hộp', value: 'Hộp' },
        { label: 'Gói', value: 'Gói' },
        { label: 'Chai', value: 'Chai' },
    ]

    const handleChange = (field, value) => {
        switch (field) {
            case 'types':
                setTypeValue(value)
                break;

            default:
                break;
        }
    }

    if (!medicineInfo) return (
        <div className='w-100 h-auto px-3 d-flex'>
            < div className='w-100 h-100' >
                < div className='w-100 h-100 d-flex flex-column gap-2' >
                    {/* <div className='w-50 h-auto'> */}
                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" ref={medicineName} className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                    </div >

                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Dosage Form</span>
                        </div>
                        <input type="text" ref={medicineDosageForm} className="form-control" placeholder="Dosage Form" aria-label="DosageForm" aria-describedby="basic-addon1" />
                    </div >

                    <div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Type</span>
                        </div>
                        <select className="form-select w-25" aria-label="Type" aria-describedby="basic-addon1" ref={medicineType}>
                            <option selected>Choose...</option>
                            {typeMedicineList.map(object => { return (<option value={object.name}>{object.name}</option>) })}
                        </select>
                    </div >

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-50" id="basic-addon1">Type</span>
                        </div>
                        <Creatable
                            
                            onChange={(value) => handleChange('types', value)}
                            options={types}
                            value={typeValue}
                            ref={medicineType}
                            
                        >
                        </Creatable>

                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Price</span>
                        </div>
                        <input type="number" ref={medicinePrice} className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
                    </div>
                </div >
            </div >
        </div >
    )

    return (
        <div className='w-100 h-auto px-3 d-flex'>

            < div className='w-100 h-100' >
                < div className='w-100 h-100 d-flex flex-column gap-2' >
                    {/* <div className='w-50 h-auto'> */}
                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" ref={medicineName} defaultValue={medicineInfo.name} className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                    </div >

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Dosage Form</span>
                        </div>
                        <input type="text" ref={medicineDosageForm} defaultValue={medicineInfo.dosageForm} className="form-control" placeholder="Dosage Form" aria-label="DosageForm" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Type</span>
                        </div>
                        <input type="text" ref={medicineType} defaultValue={medicineInfo.type} className="form-control" placeholder="Type" aria-label="Type" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Price</span>
                        </div>
                        <input type="number" ref={medicinePrice} defaultValue={medicineInfo.price} className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
                    </div>
                </div >
            </div >
        </div >
    )
}

export default MedicineInfo