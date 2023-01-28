import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./salaryForm.css";

function SalaryForm() {
  const { token } = useSelector((state) => state.admin.admin);

  const [employeeId, setEmployeeId] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeObj, setSelectedEmployeeObj] = useState({});
  const [employees, setEmployees] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalWorkingDays, setTotalWorkingDays] = useState("");
  const [totalLeavesTaken, setTotalLeavestaken] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [totalSalaryMade, setTotalSalaryMade] = useState(0);
  const [isSalaryCalculated, setIsSalaryCalculated] = useState(false);

  useEffect(() => {
    token &&
      fetch("http://localhost:8000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setEmployees(res.result);
          setEmployeeId(res.result[0].id);
        })
        .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    token &&
      fetch("http://localhost:8000/salary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const _selectedEmployee = employees.find(
            (emp) => emp.id === Number(employeeId)
          );

          setSelectedEmployeeObj(
            employees.find((emp) => emp.id === Number(employeeId))
          );
          const _isSalaryCalculated = res.result.filter((r) => {
            return r.Employee.id === _selectedEmployee.id;
          });
          if (_isSalaryCalculated.length > 0) {
            setIsSalaryCalculated(true);
          } else {
            setIsSalaryCalculated(false);
          }
        })
        .catch((err) => console.log(err));
  }, [employeeId]);

  useEffect(() => {
    const perDSalary = Number((
      selectedEmployeeObj.base_salary / totalWorkingDays
    ).toFixed());

    setTotalSalaryMade(
      Number((
        perDSalary *
        (totalWorkingDays - totalLeavesTaken + overtime / 8)
      ).toFixed())
    );
  }, [selectedEmployeeObj?.id, totalWorkingDays, overtime, totalLeavesTaken]);

  const addSalary = (e) => {
    e.preventDefault();
    if (!totalWorkingDays) {
      return alert("Please Add Total Working Days");
    }

    employeeId
      ? fetch("http://localhost:8000/salary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employee_id: employeeId,
            month,
            year,
            total_working_days: totalWorkingDays,
            total_leaves_taken: totalLeavesTaken,
            total_salary_made: totalSalaryMade,
            is_salary_calculated: true,
            overtime,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "success") {
              alert(res.message);
            } else {
              alert(res.message);
            }
          })
          .catch((err) => console.log("err", err))
      : alert("Please Select An Employee");
  };
  
  return (
    <div className="dashboard">
      <h1>Add Salary</h1>

      <form onSubmit={addSalary} className="salaryFormContainer">
        <div className="formInput">
          <h4>Employee Name</h4>
          <select
            value={selectedEmployee}
            onChange={(e) => {
              setEmployeeId(e.target.value);
              setSelectedEmployee(e.target.value);
            }}
          >
            {employees &&
              employees.map((emp) => {
                return (
                  <option key={emp.id} value={emp.id} name={emp.id}>
                    {emp.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="formInput">
          <h4>Month</h4>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option name="jan" value={0}>January</option>
            <option name="feb" value={1}>February</option>
            <option name="mar" value={2}>March</option>
            <option name="apr" value={3}>April</option>
            <option name="may" value={4}>May</option>
            <option name="jun" value={5}>June</option>
            <option name="jul" value={6}>July</option>
            <option name="aug" value={7}>August</option>
            <option name="sep" value={8}>September</option>
            <option name="oct" value={9}>October</option>
            <option name="nov" value={10}>November</option>
            <option name="dec" value={11}>December</option>
          </select>
        </div>

        <div className="formInput">
          <h4>Year</h4>
          <input
            type={"number"}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="formInput">
          <h4>Total Working Days</h4>
          <input
            required
            type={"number"}
            value={totalWorkingDays}
            onChange={(e) => setTotalWorkingDays(Number(e.target.value))}
          />
        </div>

        <div className="formInput">
          <h4>Total Leaves Taken</h4>
          <input
            type={"number"}
            value={totalLeavesTaken}
            onChange={(e) => setTotalLeavestaken(Number(e.target.value))}
          />
        </div>

        <div className="formInput">
          <h4>Overtime</h4>
          <input
            type={"number"}
            value={overtime}
            onChange={(e) => setOvertime(Number(e.target.value))}
          />
        </div>

        <button onClick={addSalary}>Add Salary</button>
      </form>
    </div>
  );
}

export default SalaryForm;
