import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesComponent = () => {
  const auth = false;
  return auth ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedRoutesComponent;
