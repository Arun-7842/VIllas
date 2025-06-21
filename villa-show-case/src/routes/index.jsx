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
import Registration from "../components/Registration";
import ForgotPassword from "../components/ForgotPassword";
import VillaDetails from "../components/VillaDetails";
import AddTestimonial from "../admin/adminPages/AddTestimonial";
import ShowTestimonials from "../admin/adminPages/ShowTestimonials";
import VillaDetailsForUser from "../components/VillaDetailsForUser";
import DashboardUser from "../user/dashboard/DashboardUser";
import UserProfile from "../user/UserProfile";
import UserWishlist from "../user/UserWishlist";
import TermsAndConditions from "../components/TermsAndConditions";
import PrivacyPolicy from "../components/PrivacyPolicy";
import About from "../components/About";
import Services from "../components/Services";

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
        path: "/login",
        element: <AdminLogin />,
      },
      {
        path: "/Admin",
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
        element: <VillaDetailsForUser />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
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
            element: <AddTestimonial />,
          },
          {
            path: "testimonials",
            element: <ShowTestimonials />,
          },
          {
            path: "booking",
            element: <Bookings />,
          },
        ],
      },
      {
        path: "/user-data",
        element: <DashboardUser />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "Wishlist",
            element: <UserWishlist />,
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
            element: <AddTestimonial />,
          },
          {
            path: "testimonials",
            element: <ShowTestimonials />,
          },
          {
            path: "booking",
            element: <Bookings />,
          },
        ],
      },
    ],
  },
]);

export default router;
