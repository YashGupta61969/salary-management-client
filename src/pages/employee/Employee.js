import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Employee() {
  const { token } = useSelector((state) => state.admin.admin);
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    token &&
      fetch("http://localhost:8000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) =>{
            setEmployees(res.result)   
        })
        .catch(err=>console.log(err));;
  }, []);

  return (
    <div className="dashboard">
      <h1>Employees</h1>
      <div className="salaryForm">
        <button onClick={() => navigate("/employee-form")}>Add Employee</button>
      </div>
      <div className="tableContainer">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Base Salary</th>
            </tr>
            {employees &&
              employees.map((emp) => {
                return (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobile}</td>
                    <td>{emp.address}</td>
                    <td>{emp.base_salary}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
