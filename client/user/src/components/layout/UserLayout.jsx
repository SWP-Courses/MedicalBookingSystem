// import { useContext } from "react";
// import { Outlet } from "react-router-dom";
// import { API_IMAGE_URL } from "~/api/Router";
// import { AuthContext } from "~/context/authContext";



// export default function UserLayout() {
//   const { currentUser } = useContext(AuthContext);
//   return (
//     <div className="customerLayout">
//       <div className="userSidebar">
//         <div className="userInfo">
//           {currentUser?.avatar?.bucketName ? (
//             <img
//               src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`}
//               alt=""
//             />
//           ) : (
//             <img src={currentUser?.avatar?.filename} alt="" />
//           )}

//           <span className="userName bg-primary">{currentUser?.fullname}</span>
//         </div>
//         <div className="profileActions">
//           <h4
//             className={userContent === "info" ? "action active" : "action"}
//             onClick={() => {
//               handleOptionClick("info");
//             }}
//           >
//             Thông tin cá nhân
//           </h4>
//           <h4
//             className={userContent === "history" ? "action active" : "action"}
//             onClick={() => handleOptionClick("history")}
//           >
//             Lịch sử khám
//           </h4>
//           <h4
//             className={
//               userContent === "apmSchedule" ? "action active" : "action"
//             }
//             onClick={() => {
//               handleOptionClick("apmSchedule");
//             }}
//           >
//             Lịch khám đã đặt
//           </h4>
//           <h4
//             className={userContent === "pSaved" ? "action active" : "action"}
//             onClick={() => {
//               setUserContent("pSaved");
//             }}
//           >
//             Bài viết yêu thích
//           </h4>
//         </div>
//       </div>

//       <div className="userContent">
//         <Outlet />
//       </div>
//     </div>
//   );
// }
