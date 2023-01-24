import React from "react";
import './dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboardInfo">
        <h3>Total Number Of Employees :-</h3>
        <h3>This Month's Attendence Percentage :-</h3>
        <h3>Last Month's Attendence Percentage :-</h3>
      </div>
    </div>
  );
}

export default Dashboard;
