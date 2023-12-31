import React, { useEffect } from "react";
import AdminNavigation from "./AdminNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import './adminCss/admincss.css'

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("customerInfo") ||
      !JSON.parse(localStorage.getItem("customerInfo")).user.is_staff
    ) {
      navigate("/auth");
      return;
    }
  }, []);

  return (
    <div className="admin__main__cont">
      <AdminNavigation />
      <Outlet />
    </div>
  );
};

export default Admin;
