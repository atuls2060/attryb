import React, { useEffect, useState } from 'react'
import Styles from "./oems.module.css"
import SubNavbar from '../components/SubNavbar'
import OEMSCard from '../components/OEMSCard';
import axios from 'axios';

const OEMS = ({ }) => {
  const [specs, setSpecs] = useState([]);
  const [totalSpecs, setTotalSpecs] = useState(0);
  const [keyword, setKeyword] = useState("")


  const getData = async (keyword = "") => {
    const { token } = JSON.parse(localStorage.getItem("user")) || {}
    const baseUrl = process.env.REACT_APP_BASE_URL
    try {
      const { data } = await axios.get(`${baseUrl}/oems?keyword=${keyword}`, {
        headers: {
          'Authorization': token
        }
      })
      setSpecs(data.specs)
      setTotalSpecs(data.totalSpecs)
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
  const handleSearch = () => {
    getData(keyword)
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <div>
      <SubNavbar />
      <h2>Total OEM Specs : {totalSpecs}</h2>
      <div className={Styles.search_container}>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search' />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={Styles.specs_list} >
        {
          specs.map((item) => {
            return <OEMSCard  key={item._id} {...item} />
          })
        }
      </div>
    </div>
  )
}

export default OEMS