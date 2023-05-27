import React, { useContext } from 'react'
import Styles from "./navbar.module.css"
import { AuthContext } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const { isAuth, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const gotToLogin = () => {
    navigate("/login")
  }

  return (
    <div className={Styles.navbar}>
      <div>
        <h3 onClick={() => navigate("/")}>Buy Car</h3>
        <div>
          {
            isAuth ? <button onClick={logoutUser} >Logout</button> : <button onClick={gotToLogin} >Login</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar