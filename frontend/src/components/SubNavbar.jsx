import React, { useContext } from 'react'
import Styles from "./subnavbar.module.css"
import { AuthContext } from '../Contexts/AuthContext'
import { Link, useLocation } from 'react-router-dom'

const SubNavbar = () => {
  const { isAuth, userName, userRole } = useContext(AuthContext)
  const { pathname } = useLocation();
  return (
    <div className={Styles.sub_navbar}>
      {
        pathname === "/" && <h2>Hi, Welocome</h2>
      }

      {
        isAuth ? <>
          <h3>{`${userName} (${userRole})`}</h3>
          <div className={Styles.links_container}>
            <Link to="/">Marketplace</Link>
            <Link to="/orders">Orders</Link>
            {
              userRole === "dealer" && <>
                <Link to="/inventory">Inventory</Link>
                <Link to="/oems">OEM Specs</Link>
              </>
            }
          </div>
        </> :
          <h3>Please Login to your Account <Link to="/login">login</Link></h3>
      }
    </div>
  )
}

export default SubNavbar