import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { isAuth } = useContext(AuthContext)
  if (!isAuth) {
    return <Navigate to="/login" />
  }


  return (
    <>
      {
        children
      }
    </>
  )
}

export default PrivateRoutes