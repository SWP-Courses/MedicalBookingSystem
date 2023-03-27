import React, { useEffect, useState } from 'react'
import MedicineRow from './MedicineRow';
import Pagination from '../Pagination/Pagination';

function MedicineTable({ medicines, onClickEditMedicine }) {

    const [tmpName, setTmpName] = useState("")
    const [tmpDosageForm, setTmpDosageForm] = useState("")
    const [tmpType, setTmpType] = useState("")
    const [tmpPrice, setTmpPrice] = useState("")
    const [medicineList, setMedicineList] = useState(medicines);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicinesPerPage] = useState(10);

    const onDeleteMedicineById = (id) => {
        if (!id) return
        setMedicineList(list => list.filter(list => list._id !== id));
    }

    function handleFilterPrice(medicinePrice, value) {
        if (value == 0) {
            return 0 < medicinePrice
        } else if (value == 1) {
            return medicinePrice < 1000
        } else if (value == 2) {
            return 1000 <= medicinePrice && medicinePrice < 10000
        } else if (value == 3) {
            return 10000 <= medicinePrice && medicinePrice < 100000
        } else if (value == 4) {
            return medicinePrice >= 100000
        }
    }

    useEffect(() => {
        if (!medicines) return;
        setMedicineList(medicines);
    }, [medicines])

    if (!medicineList) return (
        <p>Loading...</p>
    )

    const indexOfLastPost = currentPage * medicinesPerPage;
    const indexOfFirstPost = indexOfLastPost - medicinesPerPage;
    const currentMedicines = medicineList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {/* Filter */}
            <div className='w-100 d-flex justify-content-start align-items-center'>

                <input type="text" className="form-control" style={{ width: "25%", height: "37.34px" }} placeholder="Search by name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={e => setTmpName(e.target.value)} />

                <div className='container d-flex align-items-center' style={{ width: "20%" }}>
                    <p className='text-center' style={{ margin: "0px" }}>Dosage Form</p>
                    <select className="form-select filter-select" style={{ marginLeft: "10px" }} aria-label="Default select example" onChange={e => setTmpDosageForm(e.target.value)}>
                        <option defaultValue value="">Tất cả</option>
                        <option value="Viên nén bao">Viên nén bao</option>
                        <option value="Viên nén bao phim">Viên nén bao phim</option>
                        <option value="Thuốc bột pha hỗn dịch uống">Thuốc bột pha hỗn dịch uống</option>
                        <option value="Hỗn dịch uống">Hỗn dịch uống</option>
                        <option value="Viên nén giải phóng kéo dài">Viên nén giải phóng kéo dài</option>
                        <option value="Viên nén phân tán">Viên nén phân tán</option>
                        <option value="Dung dịch truyền tĩnh mạch">Dung dịch truyền tĩnh mạch</option>
                        <option value="Hộp">Hộp</option>
                    </select>
                </div>

                <div className='container d-flex align-items-center' style={{ width: "20%" }}>
                    <p className='text-center' style={{ margin: "0px" }}>Type</p>
                    <select className="form-select filter-select" style={{ marginLeft: "10px" }} aria-label="Default select example" onChange={e => setTmpType(e.target.value)}>
                        <option defaultValue value="">Tất cả</option>
                        <option value="Viên">Viên</option>
                        <option value="Hộp">Hộp</option>
                        <option value="Gói">Gói</option>
                        <option value="Chai">Chai</option>
                    </select>
                </div>

                <div className='container d-flex align-items-center' style={{ width: "20%" }}>
                    <p className='text-center' style={{ margin: "0px" }}>Price</p>
                    <select className="form-select filter-select" style={{ marginLeft: "10px" }} aria-label="Default select example" onChange={e => setTmpPrice(e.target.value)}>
                        <option value="0">Tất cả</option>
                        <option value="1">Dưới 1.000</option>
                        <option value="2">1.000 - 10.000</option>
                        <option value="3">10.000 - 100.000</option>
                        <option value="4">Trên 100.000</option>
                    </select>
                </div>

            </div>

            <div className='mt-1 p-3'>
                <table className="table border mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Dosage Form</th>
                            <th scope="col">Type</th>
                            <th className='text-center' scope="col">Price</th>
                            <th className='text-end' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            medicineList
                                ? medicineList.filter(medicine => medicine?.name.toLowerCase().includes(tmpName)
                                    && medicine?.type.includes(tmpType)
                                    && medicine?.dosageForm.includes(tmpDosageForm)
                                    && handleFilterPrice(medicine?.price, tmpPrice))
                                    .map((medicine, index) => <MedicineRow onDeleteMedicineById={onDeleteMedicineById}
                                        onClickEditMedicine={onClickEditMedicine}
                                        key={medicine.id}
                                        medicine={medicine}
                                        stt={index + 1} />)
                                : undefined
                        }
                    </tbody>
                </table>

                <div className='position-absolute bottom-0 start-50'>
                    <Pagination
                        postsPerPage={medicinesPerPage}
                        totalPosts={medicineList.length}
                        paginate={paginate}
                    />
                </div>

            </div>
        </>
    )
}

export default MedicineTable