import React, { useEffect, useState } from 'react'
import Styles from "./addedit.module.css"
import SubNavbar from '../components/SubNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AddEdit = ({ }) => {
  const { id } = useParams()
  const [specs, setSpecs] = useState([]);
  const [carData, setCarData] = useState({
    image: "",
    title: "",
    price: null,
    oemsId: "",
    kmsOnOdometer: null,
    majorScratches: false,
    originalPaint: true,
    accidentsReported: null,
    previousBuyers: null,
    registrationPlace: "",
  })



  const handleAddCar = async () => {
    if (carData.image == "" || carData.title == "" || !carData.price ||
      carData.oemsId == "" || carData.kmsOnOdometer == null || carData.accidentsReported  == null|| carData.previousBuyers == null || carData.registrationPlace == ""

    ) {
      alert("All fields required")
      return
    }
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    if (id) {
      //update car
      try {
        await axios.patch(`${baseUrl}/marketplace/${id}`,carData, {
          headers: {
            'Authorization': token
          }
        })
        alert("Car Updated")
      } catch (error) {
        alert(error.response.data.message)
      }
    } else {
      try {
        await axios.post(`${baseUrl}/marketplace`,carData, {
          headers: {
            'Authorization': token
          }
        })
        alert("Car added")
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }

  const getCarDetails = async (id) => {
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    try {
      const { data } = await axios.get(`${baseUrl}/marketplace/details/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      setCarData(data)
    } catch (error) {
      console.log("error", error)
      alert(error.response.data.message)
    }
  }

  const getOems = async () => {
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    try {
      const { data } = await axios.get(`${baseUrl}/oems`, {
        headers: {
          'Authorization': token
        }
      })
      setSpecs(data.specs)
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
  useEffect(() => {
    if (id) {
      getCarDetails(id)
    }
    getOems()
  }, [])

  return (
    <>
      <SubNavbar />
      <div className={Styles.add_edit}>
        <div>
          <label>Select OEM Specs</label><br />
          <select value={carData.oemsId} onChange={(e) => setCarData({ ...carData, oemsId: e.target.value })}>
            <option value="">Select OEMS</option>
            {
              specs.map((item, idx) => {
                return <option key={idx} value={item._id}>{item.model}</option>
              })
            }
          </select><br />
          <label>Image Url</label>
          <input value={carData.image} onChange={(e) => setCarData({ ...carData, image: e.target.value })} type='string' placeholder='Image Url' />
          <label>Title</label>
          <input value={carData.title} onChange={(e) => setCarData({ ...carData, title: e.target.value })} type='string' placeholder='Title' />
          <label>Price</label>
          <input value={carData.price} onChange={(e) => setCarData({ ...carData, price: e.target.value })} type='string' placeholder='Price' />
          <label>KMs on Odometer</label>
          <input value={carData.kmsOnOdometer} onChange={(e) => setCarData({ ...carData, kmsOnOdometer: e.target.value })} type='number' placeholder='KMs on Odometer' />
          <div>
            <input value={carData.majorScratches} onChange={(e) => setCarData({ ...carData, majorScratches: e.target.value })} type='checkbox' />
            <label> Major Scratches</label>
          </div>
          <div>
            <input value={carData.originalPaint} onChange={(e) => setCarData({ ...carData, originalPaint: e.target.value })} type='checkbox' />
            <label> Original Paint</label>
          </div>
          <label>Number of accidents reported</label>
          <input value={carData.accidentsReported} onChange={(e) => setCarData({ ...carData, accidentsReported: e.target.value })} type='number' placeholder=' Number of accidents reported' />
          <label>Number of previous buyers</label>
          <input value={carData.previousBuyers} onChange={(e) => setCarData({ ...carData, previousBuyers: e.target.value })} type='number' placeholder='Number of previous buyers' />
          <label>Registration Place</label>
          <input value={carData.registrationPlace} onChange={(e) => setCarData({ ...carData, registrationPlace: e.target.value })} type='string' placeholder='Registration Place' />
          <button onClick={handleAddCar}>{id ? "Update Car" : "Add Car"}</button>
        </div>
        {
          carData.image !== "" && <img src={carData.image} alt='preivew' />
        }
      </div>
    </>
  )
}

export default AddEdit