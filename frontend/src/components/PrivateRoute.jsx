import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isTokenValid = () => {
    const tokenData = sessionStorage.getItem("token");

    if (!tokenData) {
      return false; // No token found
    }

    return true; // Token is valid
  };

  const tokenIsValid = isTokenValid();

  if (!tokenIsValid) {
    return <Navigate to="/login" replace />; // Redirect to login if token is invalid
  }

  return <>{children}</>;
};

export default PrivateRoute;