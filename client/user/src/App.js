import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import UserRouter from "./routes/UserRouter";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },

//   {
//     path: "/info",
//     element: <GuestContainer />,
//     children: [
//       {
//         path: "customer",
//         element: <Customer />,
//       },
//       {
//         path: "doctors",
//         element: <DoctorList />,
//       },
//       {
//         path: "doctors/:id",
//         element: <DoctorDetail />,
//       },
//       {
//         path: "specialist/:id",
//         element: <Specialist />,
//       },
//       {
//         path: "Booking",
//         element: <Booking />,
//       },
//     ],
//   },
// ]);
function App() {
  return <UserRouter />;
}

export default App;
