import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isAdmin from "../utils/isAdmin";
import { getAdminFromStorage, clearAdminStorage } from "../utils/auth";

const AdminPermission = ({ children }) => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminPermission = () => {
      const admin = getAdminFromStorage();

      // Check if admin data exists and has valid structure
      if (!admin || !admin.role || !admin._id) {
        console.log("No valid admin data found");
        setHasPermission(false);
        clearAdminStorage(); // Clear invalid data
        setIsLoading(false);
        navigate("/login", { replace: true });
        return;
      }

      // Check if user has admin role
      if (!isAdmin(admin.role)) {
        setHasPermission(false);
        setIsLoading(false);
        navigate("/", { replace: true });
        return;
      }

      // Additional security check - verify token exists
      if (!admin.refresh_token) {
        console.log("No refresh token found");
        setHasPermission(false);
        clearAdminStorage();
        setIsLoading(false);
        navigate("/login", { replace: true });
        return;
      }

      console.log("Admin permission granted");
      setHasPermission(true);
      setIsLoading(false);
    };

    checkAdminPermission();
  }, [navigate]);

  // Show loading state while checking permissions
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // Don't render children if no permission
  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};

export default AdminPermission;
