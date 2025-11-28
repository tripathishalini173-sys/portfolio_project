// RoleProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "./auth"; // your role logic

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole(); // e.g., "admin", "user"

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
