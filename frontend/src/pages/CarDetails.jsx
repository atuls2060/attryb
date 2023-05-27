import React, { useContext, useEffect, useState } from 'react'
import Styles from "./cardetails.module.css"
import SubNavbar from '../components/SubNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CarDetails = () => {
  const { id } = useParams()
  const [car, setCar] = useState({})

  const getCarDetails = async (id) => {
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    try {
      const { data } = await axios.get(`${baseUrl}/marketplace/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      setCar(data)
    } catch (error) {
      console.log("error", error)
      alert(error.response.data.message)
    }
  }
  const placeOrder = async (e) => {
    e.preventDefault()
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    try {
       await axios.post(`${baseUrl}/orders`, { carId: car._id, dealerId: car.dealerId }, {
        headers: {
          'Authorization': token
        }
      })
      alert("Order Placed")
    } catch (error) {
      console.log("error", error)
      alert(error.response.data.message)
    }
  }
  useEffect(() => {
    getCarDetails(id)
  }, [id])
  return (
    <>
      <SubNavbar />
      <div className={Styles.car_details}>
        <img src={car.image} alt={car.title} />
        <div>
          <h3>{car.title}</h3>
          <ul>
            <li><b>KMs On Odometer :</b> {car.kmsOnOdometer}</li>
            <li><b>Major Scratches :</b>  {car.majorScratches ? "Yes" : "No"}</li>
            <li><b>Max Speed :</b>  {car.maxSpeed} KM/h</li>
            <li><b>Previous Buyers :</b>  {car.previousBuyers}</li>
            <li><b>Price : </b>₹ {car.price}</li>
            <li><b>Registration Place :</b>  {car.registrationPlace}</li>
            <li><b>year : </b> {car.year}</li>
          </ul>
          <button onClick={placeOrder} className={Styles.place_order_btn}>Place Order</button>
        </div>
      </div>
    </>
  )
}

export default CarDetails