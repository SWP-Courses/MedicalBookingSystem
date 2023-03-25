import React, { useEffect, useState } from "react";
import ServiceRow from "./ServiceRow";

function ServiceTable({ services, onClickEditService, onDeleteBlogById }) {
  const [serviceList, setServiceList] = useState(services);
  const [search, setSearch] = useState("");

  // console.log(services);

  useEffect(() => {
    if (!services) return;
    setServiceList(services);
  }, [services]);

  useEffect(() => {
    if (search.length > 3) return;
    setServiceList(services);
  }, [search]);

  const onSearch = () => {
    setServiceList((services) =>
      services?.filter((item) => {
        if (
          item.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      })
    );
    // if (search.length > 3) {
    //     setServiceList(service => service.filter(ser => ser.name.toLowerCase().includes(search.toLowerCase())))
    // }
  };

  if (!serviceList) return <p>Loading...</p>;

  return (
    <>
      {/* Filter */}
      <div className="w-100 d-flex justify-content-center">
        <div className="d-flex gap-3 w-100 justify-content-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control"
            style={{ width: "50%" }}
            placeholder="Search by title"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
          <button
            onClick={onSearch}
            className="btn btn-primary px-5"
            type="submit"
          >
            {" "}
            Search{" "}
          </button>
        </div>
      </div>

      <div className="mt-1 p-3">
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">
                Price
              </th>
              <th className="text-end" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceList
              ? serviceList.map((service, index) => (
                  <ServiceRow
                    onDeleteBlogById={onDeleteBlogById}
                    onClickEditService={onClickEditService}
                    key={service.id}
                    service={service}
                    stt={index + 1}
                  />
                ))
              : undefined}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ServiceTable;
