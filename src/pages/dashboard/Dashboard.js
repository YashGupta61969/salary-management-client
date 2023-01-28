import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./dashboard.css";

function Dashboard() {
  const { token } = useSelector((state) => state.admin.admin);
  const [employees, setEmployees] = useState([]);
  const [attendence, setAttendence] = useState(0)
  const [lastMonthattendence, setLastMonthattendence] = useState(0)

  useEffect(() => {
    token &&
      fetch("http://localhost:8000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) =>{
          setAttendence(100-res.this_month_attendence.toFixed(1))
          setEmployees(res.result) 
        })
        .catch(err=>console.log(err));;
  }, [token]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboardInfo">
        <h3>Total Number Of Employees :- {employees && employees.length}</h3>
        <h3>This Month's Attendence Percentage :- {attendence}</h3>
        <h3>Last Month's Attendence Percentage :- {lastMonthattendence}</h3>
      </div>
    </div>
  );
}

export default Dashboard;
