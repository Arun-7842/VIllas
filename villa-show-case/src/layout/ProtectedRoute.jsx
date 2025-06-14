import React from "react";
import { Navigate } from "react-router-dom";
import isAdmin from "../utils/isAdmin";
import { getAdminFromStorage } from "../utils/auth.js";

const ProtectedRoute = ({ children, requiredRole = "Admin" }) => {
  const admin = getAdminFromStorage();
        
  // Check if user is logged in
  if (!admin || !admin.role || !admin._id) {
    return <Navigate to="/admin-login" replace />;
  }

  // Check if user has required role
  if (requiredRole === "Admin" && !isAdmin(admin.role)) {
    return <Navigate to="/" replace />;
  }

  // Check if token exists
  if (!admin.refresh_token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
