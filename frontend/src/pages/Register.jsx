import React, { useContext, useEffect, useState } from 'react'
import Styles from "./auth.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const Register = () => {
  const { isAuth, registerUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(userData)
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/")
    }
  }, [isAuth])
  return (
    <div>
      <div className={Styles.form_container}>
        <form onSubmit={handleSubmit} >
          <h3>Register</h3>
          <p>Only Dealer can list cars</p>
          <input value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} type='text' placeholder='Name' required />
          <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type='email' placeholder='Email' required />
          <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type='password' placeholder='Password' required />
          <select value={userData.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })} required >
            <option value="">Select Role</option>
            <option value="buyer" >Buyer</option>
            <option value="dealer">Dealer</option>
          </select>
          <input type='submit' value="Register" />
          <p>Already have an account ? <Link to='/'>Login</Link></p>
        </form>
      </div>
    </div >
  )
}

export default Register