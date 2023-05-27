import React, { useEffect, useState } from 'react'
import Styles from "./dealersinventory.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubNavbar from '../components/SubNavbar'
import CarCard from '../components/CarCard';

const DealerInventory = () => {
  const [carList, setCarList] = useState([]);
  const naviate = useNavigate()

  const getInventory = async () => {
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    try {
      const { data } = await axios.get(`${baseUrl}/marketplace/dealer/inventory`, {
        headers: {
          'Authorization': token
        }
      })
      setCarList(data)
    } catch (error) {
      console.log("error", error)
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    getInventory()
  }, [])

  return (
    <>
      <SubNavbar />
      <div className={Styles.inventory}>
        <button onClick={() => naviate("/inventory/add")}>Add Car</button>
        <div>
          {
            carList.map((car, idx) => {
              return <CarCard key={idx} {...car} isInventory={true} getInventory={getInventory} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default DealerInventory