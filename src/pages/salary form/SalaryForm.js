import React, { useState } from "react";
import "./salaryForm.css";

function SalaryForm() {
  const [employee, setEmployee] = useState("Enter Here");
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const [totalLeavesTaken, setTotalLeavestaken] = useState(0);
  const [overtime, setOvertime] = useState(0);

  return (
    <div className="dashboard">
      <h1>Add Salary</h1>

      <div className="salaryFormContainer">
        <div className="formInput">
          <h4>Employee Name</h4>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <option name="Ashok"> Ashok</option>
            <option name="johny">johny</option>
          </select>
        </div>

        <div className="formInput">
          <h4>Month</h4>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option name="jan">January</option>
            <option name="feb">February</option>
            <option name="mar">March</option>
            <option name="apr">April</option>
            <option name="may">May</option>
            <option name="jun">June</option>
            <option name="jul">July</option>
            <option name="aug">August</option>
            <option name="sep">September</option>
            <option name="oct">October</option>
            <option name="nov">November</option>
            <option name="dec">December</option>
          </select>
        </div>

        <div className="formInput">
          <h4>Year</h4>
          <input type={"number"} value={year} onChange={(e)=>setYear(e.target.value)}/>
        </div>

        <div className="formInput">
          <h4>Total Working Days</h4>
          <input type={"number"} value={totalWorkingDays} onChange={(e)=>setTotalWorkingDays(e.target.value)}/>
        </div>

        <div className="formInput">
          <h4>Total Leaves Taken</h4>
          <input type={"number"} value={totalLeavesTaken} onChange={(e)=>setTotalLeavestaken(e.target.value)}/>
        </div>

        <div className="formInput">
          <h4>Overtime</h4>
          <input type={"number"} value={overtime} onChange={(e)=>setOvertime(e.target.value)}/>
        </div>

        <button>Add Salary</button>
      </div>
    </div>
  );
}

export default SalaryForm;
