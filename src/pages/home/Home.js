import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="sidebar">
        <div className="dashboardLink" onClick={() => navigate("/")}>
          <h1>Dashboard</h1>
        </div>

        <div className="sidebarLinks" onClick={() => navigate("/employees")}>
          <h1>Employees</h1>
        </div>

        <div
          className="sidebarLinks"
          onClick={() =>
            navigate({
              pathname: "/salaries",
              search: "?page=1",
            })
          }
        >
          <h1>Salaries</h1>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Home;
