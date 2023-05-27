import React, { useContext } from 'react'
import Styles from "./carcard.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { MarketPlaceContext } from '../Contexts/MarketPlaceContext'
import axios from 'axios'

const CarCard = ({ _id, image, title, price, colors,mileage, isInventory = false,getInventory }) => {
  const navigate = useNavigate()
  const {getCarList} = useContext(MarketPlaceContext)

  const handleDelete = async () => {
    let confirmed = window.confirm("Confirm to delete")
    if (confirmed) {
      const { token } = JSON.parse(localStorage.getItem("user")) || {}
      const baseUrl = process.env.REACT_APP_BASE_URL
      try {
        await axios.delete(`${baseUrl}/marketplace/${_id}`,{
          headers: {
            'Authorization': token
          }
        })
        alert("deleted")
        getInventory()

      } catch (error) {
        console.log("error", error)
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div className={Styles.card}>
      <Link to={`/${_id}`}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>Price : ₹ {price}</p>
        <p>Mileage :  {mileage} Km/L</p>
        {
          colors && <p style={{ margin: "15px 0px" }}>Colors :{colors?.map((item, idx) => <span style={{ backgroundColor: item, color: item == "White" ? "black" : "white", padding: "5px" }} key={idx}>{item}</span>)}</p>
        }
        <p>Model : 2018</p>
      </Link>
      {
        isInventory &&
        <>
          <button onClick={() => navigate(`/inventory/edit/${_id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      }
    </div>
  )
}

export default CarCard