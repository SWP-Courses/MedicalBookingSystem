import React, { useEffect, useState } from 'react'
import ServiceRow from './ServiceRow'

function ServiceTable({ services, onClickEditService }) {
    const [serviceList, setServiceList] = useState(services);

    const onDeleteBlogById = (id) => {
        if (!id) return
        setServiceList(list => list.filter(list => list._id !== id));
    }

    useEffect(() => {
        if (!services) return;
        setServiceList(services);
    }, [services])

    if (!serviceList) return (
        <p>Loading...</p>
    )

    return (
        <>
            {/* Filter */}
            <div className='w-100 d-flex justify-content-between'>
                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <select className="form-select filter-select" style={{ width: "13%" }} aria-label="Default select example">
                    <option defaultValue value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <input type="text" className="form-control" style={{ width: "30%" }} placeholder="Search by title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                <button className="btn btn-primary" type="submit" style={{ width: "10%" }}> Apply </button>
            </div>

            <div className='mt-1 p-3'>
                <table className="table border mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th className='text-center' scope="col">Price</th>
                            <th className='text-end' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serviceList ?
                                serviceList.map((service, index) => <ServiceRow onDeleteBlogById={onDeleteBlogById} onClickEditService={onClickEditService} key={service.id} service={service} stt={index + 1} />)
                                : undefined
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ServiceTable