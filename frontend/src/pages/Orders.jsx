import React, { useContext, useEffect, useState } from 'react'
import Styles from "./orders.module.css"
import { AuthContext } from '../Contexts/AuthContext';
import SubNavbar from '../components/SubNavbar'
import OrderItem from '../components/OrderItem';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { userRole } = useContext(AuthContext)

  const getOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL

    const endPoint = userRole === "buyer" ? "/orders" : "/orders/dealer"
    try {
      const { data } = await axios.get(`${baseUrl}${endPoint}`, {
        headers: {
          'Authorization': token
        }
      })
      setOrders(data)
    } catch (error) {
      console.log("error", error)
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <div>
      <SubNavbar />
      <div style={{ overflow: "auto" }}>
        {
          orders.length > 0 && <table className={Styles.orders_table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                {
                  userRole === "buyer" ?
                    <>
                      <th>Dealer Name</th>
                      <th>Dealer Email</th>
                    </> :
                    <>
                      <th>Buyer Name</th>
                      <th>Buyer Email</th>
                    </>
                }
              </tr>
            </thead>
            <tbody>
              {
                orders.map((item, idx) => {
                  return <OrderItem key={idx} {...item} />
                })
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default Orders