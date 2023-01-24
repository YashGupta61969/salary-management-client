import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/slices/adminSlice'
import './adminLogin.css'

function AdminLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = ()=>{
    fetch('http://localhost:8000/admin/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email, password
      })
    }).then(res=>res.json()).then(res=>{
      localStorage.setItem('admin',JSON.stringify(res))
      dispatch(login(res))
      navigate('/')
    }).catch(err=>console.log(err))
  }

  return (
    <div className='page'>
      <h1 className='head'>Salary Management</h1>
      <h1 className='loginHead'>Login</h1>
      <div className='loginForm'>

            <input type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>

            <input type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
            
            <button className='loginBtn' onClick={loginUser}>
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
