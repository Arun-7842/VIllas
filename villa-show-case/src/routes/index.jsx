import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hello from "../pages/Hello";
import AdminRegistration from "../admin/AdminRegistration";
import AdminLogin from "../admin/AdminLogin";
import Dashboard from "../admin/DashboardFile/Dashboard";
import Home from "../admin/adminPages/Home";
import Villa from "../admin/adminPages/Villa";
import AddNewVilla from "../admin/adminPages/AddNewVilla";
import Bookings from "../admin/adminPages/Bookings";
import Inquiries from "../admin/adminPages/Inquiries";
import AddTestimonials from "../admin/adminPages/AddTestimonials";
import Registration from "../components/Registration";
import ForgotPassword from "../components/ForgotPassword";
import VillaDetails from "../components/VillaDetails";
// import AdminPermission from "../layout/AdminPermission";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Hello />,
      },
      {
        path: "/admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/registration",
        element: <AdminRegistration />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "VillaDetails/:id",
        element: <VillaDetails />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "Villa",
            element: <Villa />,
          },
          {
            path: "VillaDetails/:id",
            element: <VillaDetails />,
          },
          {
            path: "Add-New-Villa",
            element: <AddNewVilla />,
          },
          {
            path: "Add-testimonials",
            element: <AddTestimonials />,
          },
          {
            path: "booking",
            element: <Bookings />,
          },
          {
            path: "Inquirie",
            element: <Inquiries />,
          },
        ],
      },
    ],
  },
]);

export default router;
