import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function EmployeeForm() {
  const {token} = useSelector(state=>state.admin.admin)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState(0)
    const [address, setAddress] = useState('')
    const [baseSalary, setBaseSalary] = useState(0)

    const addEmployee = ()=>{
      if(mobile.length < 10){
        return alert('Moblile Must Be At Least 10 Numbers Long')
      }
      fetch("http://localhost:8000/employee", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({
          name,email,address,mobile,base_salary:baseSalary
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.status === 'success'){
            alert(res.message)
          }else{
            alert(res?.error?.errors[0]?.message)
          }
        })
        .catch(err=>console.log('err',err));
    }
    
  return (
    <div className="dashboard">
    <h1>Add Employee</h1>

    <div className="salaryFormContainer">
      <div className="formInput">
        <h4>Employee Name</h4>
        <input value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div className="formInput">
        <h4>Email</h4>
        <input type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      <div className="formInput">
        <h4>Mobile</h4>
        <input type={"number"} value={mobile} onChange={(e)=>e.target.value.length < 12 && setMobile(e.target.value)}/>
      </div>

      <div className="formInput">
        <h4>Address</h4>
        <input value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </div>

      <div className="formInput">
        <h4>Base Salary</h4>
        <input type={"number"} value={baseSalary} onChange={(e)=>setBaseSalary(e.target.value)}/>
      </div>

      <button onClick={addEmployee}>Add Employee</button>
    </div>
  </div>
  )
}

export default EmployeeForm
