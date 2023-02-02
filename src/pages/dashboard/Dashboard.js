import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/adminSlice";
import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
        .then((res) => {
          setAttendence(100 - res.this_month_attendence.toFixed(1))
          setLastMonthattendence(100 - res.last_month_attendence.toFixed(1))
          setEmployees(res.result)
        })
        .catch(err => console.error(err));;
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard_head">
        <h1>Dashboard</h1>
        <button onClick={()=>{
          dispatch(logout()) 
          navigate('/login')
        }}>Log Out</button>
      </div>
      <div className="dashboardInfo">
        <h3>Total Number Of Employees :- {employees && employees.length}</h3>
        <h3>This Month's Attendence Percentage :- {attendence}%</h3>
        <h3>Last Month's Attendence Percentage :- {lastMonthattendence}%</h3>
      </div>
    </div>
  );
}

export default Dashboard;
