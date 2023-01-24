import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

function AdminSignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = ()=>{
    fetch('http://localhost:8000/admin/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,email,password
      })
    }).then(res=>res.text()).then(res=>{
      const response = JSON.parse(res)
      if(response.status !== 'error'){
        setEmail('')
        setPassword('')
        setName('')
        alert(response.message)
        navigate('/login')
      }else{
        alert(response.message)
      }
    }).catch(err=>console.log(err))
  }
  return (
    <div className="page">
      <h1 className="head">Salary Management</h1>
      <h1 className="loginHead">Sign Up</h1>
      <div className="loginForm">
        <input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
        />

        <input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />

        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />

        <button className="loginBtn" onClick={signup}>
          <p>Sign up</p>
        </button>

        <p className="loginCap">Already Have An Account ?</p>

        <button className="createAnAccountBtn" onClick={()=>navigate('/login')}>
          <p>Login</p>
        </button>
      </div>
    </div>
  );
}

export default AdminSignUp;
