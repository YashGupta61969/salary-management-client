import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './adminLogin.css'

function AdminLogin() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='page'>
      <h1 className='head'>Salary Management</h1>
      <h1 className='loginHead'>Login</h1>
      <div className='loginForm'>

            <input type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>

            <input type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
            
            <button className='loginBtn'>
              <p>Login</p>
            </button>

            <p className='loginCap'>Don't Have An Account ?</p>

            <button className='createAnAccountBtn' onClick={()=>navigate('/signup')}>
              <p>Create A New Account</p>
            </button>
      </div>
    </div>
  )
}

export default AdminLogin
