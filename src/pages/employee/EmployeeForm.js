import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function EmployeeForm() {
  const navigate = useNavigate()
  const { token } = useSelector(state => state.admin.admin)
  const { state } = useLocation()

  const [employeeId] = useState(state ? state.id : null)
  const [name, setName] = useState(state ? state.name : '')
  const [email, setEmail] = useState(state ? state.email : '')
  const [mobile, setMobile] = useState(state ? state.mobile : 0)
  const [address, setAddress] = useState(state ? state.address : '')
  const [baseSalary, setBaseSalary] = useState(state ? state.base_salary : 0)

  const addEmployee = () => {
    if (mobile.length < 10) {
      return alert('Moblile Must Be At Least 10 Numbers Long')
    }
    fetch("http://localhost:8000/employee", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name, email, address, mobile, base_salary: baseSalary
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          alert(res.message)
          navigate('/employees')
        } else {
          alert(res?.error?.errors[0]?.message)
        }
      })
      .catch(err => console.log('err', err));
    }
    
    const editEmployee = () => {
      if (mobile.length < 10) {
      return alert('Moblile Must Be At Least 10 Numbers Long')
    }
    fetch(`http://localhost:8000/employee/${employeeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name, email, address, mobile, base_salary: baseSalary
      })
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'success') {
        alert(res.message)
        navigate('/employees')
      } else {
        alert(res?.error?.errors[0]?.message)
      }
      })
      .catch(err => console.log('err', err));

  }

  return (
    <div className="dashboard">
      <h1>Add Employee</h1>

      <div className="salaryFormContainer">
        <div className="formInput">
          <h4>Employee Name</h4>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="formInput">
          <h4>Email</h4>
          <input type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="formInput">
          <h4>Mobile</h4>
          <input type={"number"} value={mobile} onChange={(e) => e.target.value.length < 12 && setMobile(e.target.value)} />
        </div>

        <div className="formInput">
          <h4>Address</h4>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="formInput">
          <h4>Base Salary</h4>
          <input type={"number"} value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />
        </div>

        {
          state?.id ? <button onClick={editEmployee}>Edit Employee</button> : <button onClick={addEmployee}>Add Employee</button>
        }

      </div>
    </div>
  )
}

export default EmployeeForm
