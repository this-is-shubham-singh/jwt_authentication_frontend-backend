import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { isLoggedIn } = context;

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
