import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PrivateRoutes from './PrivateRoutes'
import MarketPlace from '../pages/MarketPlace'
import CarDetails from '../pages/CarDetails'
import Orders from '../pages/Orders'
import DealerInventory from '../pages/DealerInventory'
import OEMS from '../pages/OEMS'
import AddEdit from '../pages/AddEdit'

const AllRoutes = () => {
  return (
    <div style={{ width: "90%", margin: "30px auto", }}>
      <Routes>
        <Route path="/" element={<MarketPlace />} />
        <Route path="/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
        <Route path="/inventory" element={<PrivateRoutes><DealerInventory /></PrivateRoutes>} />
        <Route path="/oems" element={<PrivateRoutes><OEMS /></PrivateRoutes>} />
        <Route path="/inventory/add" element={<PrivateRoutes><AddEdit /></PrivateRoutes>} />
        <Route path="/inventory/edit/:id" element={<PrivateRoutes><AddEdit /></PrivateRoutes>} />
      </Routes>
    </div>
  )
}

export default AllRoutes