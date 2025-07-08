import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const { isLoggedIn } = useContext(AppContext);
  console.log(isLoggedIn)

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
