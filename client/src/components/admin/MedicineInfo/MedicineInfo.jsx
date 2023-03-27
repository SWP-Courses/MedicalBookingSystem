import React from 'react'

function MedicineInfo({ medicineInfo, medicineName, medicineDosageForm, medicineType, medicinePrice }) {
    const optionType = [
        "Viên",
        "Hộp",
        "Gói",
        "Chai"
    ]

    const optionDosageForm = [
        "Viên nén bao",
        "Viên nén bao phim",
        "Thuốc bột pha hỗn dịch uống",
        "Hỗn dịch uống",
        "Viên nén giải phóng kéo dài",
        "Viên nén phân tán",
        "Dung dịch truyền tĩnh mạch",
        "Hộp"
    ]

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
                        <select ref={medicineDosageForm} class="form-select" aria-label="Default select example">
                            <option selected disabled>Choose option</option>
                            {optionDosageForm.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div >

                    <div div className="input-group" >
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Type</span>
                        </div>
                        <select ref={medicineType} class="form-select" aria-label="Default select example">
                            <option selected disabled>Choose option</option>
                            {optionType.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
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
                        <select ref={medicineDosageForm} defaultValue={medicineInfo.dosageForm} class="form-select" aria-label="Default select example">
                            <option selected disabled>Choose option</option>
                            {optionDosageForm.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend w-100">
                            <span className="w-25" id="basic-addon1">Type</span>
                        </div>

                        <select ref={medicineType} defaultValue={medicineInfo.type} class="form-select" aria-label="Default select example">
                            <option selected disabled>Choose option</option>
                            {optionType.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
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