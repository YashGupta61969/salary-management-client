import React from "react";
import { useNavigate } from "react-router-dom";
import "./salary.css";

function Salary() {
    const navigate = useNavigate() 

  return (
    <div className="dashboard">
      <h1>Salaries</h1>
      <div className="salaryForm">
        <button onClick={()=>navigate('/salary-form')}>Add Salary</button>
      </div>
      <div className="tableContainer">
        <table>
          <tr>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Total Working Days</th>
            <th>Total Leaves Taken</th>
            <th>Overtime</th>
            <th>Total Salary Made</th>
          </tr>
          <tr>
            <td>Anom</td>
            <td>19</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
          </tr>
          <tr>
            <td>Subham</td>
            <td>25</td>
            <td>Male</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Salary;
