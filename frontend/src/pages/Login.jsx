import React, { useContext, useEffect, useState } from 'react'
import Styles from "./auth.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { isAuth, loginUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(userData)
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
          <h3>Login</h3>
          <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type='email' placeholder='Email' required />
          <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type='password' placeholder='Password' required />
          <input type='submit' value="Login" />
          <p>Don't have an account ? <Link to='/register'>Register</Link></p>
        </form>
      </div >
    </div >
  )
}

export default Login