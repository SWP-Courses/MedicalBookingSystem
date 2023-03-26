import axios from "axios";
import React, { useContext, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import ROUTER from "~/api/adminRouter";
import toastOption from "~/config/toast";
import { AuthContext } from "~/context/authContext";
import CofirmDeletePopup from "./CofirmDeletePopup";

function DoctorRow({ onDeleteBlogById, doctor, stt, onClickEditDoctor }) {
  const [deletePopup, setDeletePopup] = useState(false);
  const { axiosJWT, currentUser } = useContext(AuthContext);

  const onConfilmDelete = async () => {
    if (!doctor._id) return;
    try {
      const result = await axiosJWT.delete(
        `${ROUTER}/api/users/doctors/${doctor._id}`,
        // {
        //   headers: { authorization: "Bearer " + currentUser.access_token },
        // }
      );
      if (result.status === 200) {
        toast.success("Susscess!", toastOption);
        onDeleteBlogById(doctor._id);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error!", toastOption);
    }
    setDeletePopup(false);
  };

  const onCancelDelete = () => {
    setDeletePopup(false);
  };

  return (
    <>
      <tr className="position-relative">
        <th scope="row">{stt}</th>
        <td className="mw-50 overflow-hidden"> {doctor.fullname} </td>
        <td className="text-center"> {doctor.email} </td>
        <td className="text-center blog-action">
          <HiOutlineDotsHorizontal className="fs-4" />
        </td>
        <div className="popup-action">
          <button
            onClick={() => setDeletePopup(true)}
            className="btn bg-light text-danger text-center w-100"
          >
            Delete
          </button>
          <button
            className="btn bg-light w-100"
            onClick={() => onClickEditDoctor(doctor._id)}
          >
            Detail
          </button>
        </div>
      </tr>
      {deletePopup ? (
        <CofirmDeletePopup
          onConfilmDelete={onConfilmDelete}
          onCancelDelete={onCancelDelete}
        />
      ) : undefined}
    </>
  );
}

export default DoctorRow;
