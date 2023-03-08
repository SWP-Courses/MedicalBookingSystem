import React from 'react'

function MedicineInfo({ medicineInfo, medicineName, medicineDosageForm, medicineType, medicinePrice }) {
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

                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Type</span>
                        </div>
                        <input type="text" ref={medicineType} className="form-control" placeholder="Type" aria-label="Type" aria-describedby="basic-addon1" />
                    </div >

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