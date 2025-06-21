export const baseURL = "http://localhost:8080";

const SummaryApi = {
  addVilla: {
    url: "/api/villaShowCase/add-villa-show-case",
    method: "POST",
  },
  getVilla: {
    url: "/api/villaShowCase/get",
    method: "GET",
  },
  getVillaDetails: {
    url: "/api/villaShowCase/get/:id",
    method: "GET",
  },
  updateVilla: {
    url: "/api/villaShowCase/update/:id",
    method: "put",
  },
  deleteVilla: {
    url: "/api/villaShowCase/delete/:id",
    method: "delete",
  },
  registrationAdmin: {
    url: "/api/admin/registration",
    method: "POST",
  },
  adminLogin: {
    url: "/api/admin/admin-login",
    method: "POST",
  },
  adminLogout: {
    url: "/api/admin/logout",
    method: "get",
  },
  adminSummary: {
    url: "/api/admin/summary",
    method: "get",
  },
  adminDetails: {
    url: "/api/admin/admnDetails",
    method: "get",
  },
  uplodImage: {
    url: "/api/file/upload",
    method: "post",
  },
  //testimonials

  testimonial: {
    url: "/api/tesimonial/add-testimonial",
    method: "post",
  },
  getTestimonials: {
    url: "/api/tesimonial/get-testimonials",
    method: "get",
  },
  updateTestimonial: {
    url: "/api/tesimonial/update-testimonial/:id",
    method: "put",
  },
  deleteTestimonial: {
    url: "/api/tesimonial/delete-testimonial/:id",
    method: "delete",
  },
  // user
  userRegistration: {
    url: "/api/user/register",
    method: "post",
  },
  userLogin: {
    url: "/api/user/login",
    method: "post",
  },
  userLogout: {
    url: "/api/user/logout",
    method: "get",
  },
  userForgotPassword: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  verifyOtp: {
    url: "/api/user/verify-otp",
    method: "put",
  },
  userDetails: {
    url: "/api/user/profile/:id",
    method: "get",
  },
  userUpdate: {
    url: "/api/user/profile/update/:id",
    method: "put",
  },
  userAddWishlist: {
    url: "/api/user/wishlist/:userId",
    method: "post",
  },
  userRemoveWishlist: {
    url: "/api/user/wishlist/:userId/:itemId",
    method: "delete",
  },
  userWishlist: {
    url: "/api/user/wishlist/:userId",
    method: "get",
  },
  bookVilla: {
    url: "/api/book/bookingVilla",
    method: "post",
  },
  getAllBookings: {
    url: "/api/book/all",
    method: "get",
  },
  bookVillaCheck: (_id) => ({
    url: `/api/book/villa/${_id}/availability`,
    method: "post",
  }),
};

export default SummaryApi;
