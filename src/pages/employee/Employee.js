import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './employee.css'

function Employee() {
  const { token } = useSelector((state) => state.admin.admin);
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [shouldComponentUpdate, setShouldComponentUpdate] = useState(true)

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

  const editEmployee = (name,email,mobile,address,base_salary,id)=>{
    navigate('/employee-form',{state:{name,email,mobile,address,base_salary,id}})
  }
  const deleteEmployee = (id)=>{
    fetch(`http://localhost:8000/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          alert(res.message)
          setShouldComponentUpdate(prev=>!prev)
        } else {
          alert(res?.error?.errors[0]?.message)
        }
      })
      .catch(err => console.log('err', err));
  }

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
              <th colSpan={2}>Actions</th>
            </tr>
            {employees &&
              employees.map((emp) => {
                const {id,name,email,mobile,address,base_salary} = emp;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{mobile}</td>
                    <td>{address}</td>
                    <td>{base_salary}</td>
                    <td colSpan={2}>
                      <button className="actionBtn edit" onClick={()=>editEmployee(name,email,mobile,address,base_salary,id)}>Edit</button>
                      <button className="actionBtn delete" onClick={()=>deleteEmployee(id)}>Delete</button>
                    </td>
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
