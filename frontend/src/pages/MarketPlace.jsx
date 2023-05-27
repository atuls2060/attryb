import React, { useContext, useEffect, useState } from 'react'
import Styles from "./marketplace.module.css"
import CarCard from '../components/CarCard';
import { MarketPlaceContext } from '../Contexts/MarketPlaceContext';
import SubNavbar from '../components/SubNavbar';

const MarketPlace = () => {
  const { carList, getCarList } = useContext(MarketPlaceContext)
  const [priceFilter, setPriceFilter] = useState("")
  const [mileageFilter, setMileageFilter] = useState("")
  const [colorFilter, setColorFilter] = useState("")


  const applyFilter = (e) => {
    const filterField = e.target.name
    const order = e.target.value
    if (filterField === "price") {
      setPriceFilter(order)
    } else if (filterField === "mileage") {
      setMileageFilter(order)
    }
    getCarList(filterField, order,colorFilter)
  }

  useEffect(() => {
    getCarList("","",colorFilter)
  }, [colorFilter])
  return (
    <>
      <div className={Styles.cars_list_container}>
        <SubNavbar />
        <div className={Styles.filters_container}>
          <select name="price" value={priceFilter} onChange={applyFilter}>
            <option value="">Filter by Price</option>
            <option value="asc" >Price : Low to High</option>
            <option value="desc">Price : High to Low</option>
          </select>
          <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
            <option value="">Filter by Colors</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="silver">Silver</option>
          </select>
          <select name="mileage" value={mileageFilter} onChange={applyFilter}>
            <option value="">Filter by Mileage</option>
            <option value="asc">Mileage : Low to High</option>
            <option value="desc">Mileage : High to Low</option>
          </select>
        </div>
        <div>
          {
            carList.map((car, idx) => {
              return <CarCard key={idx} {...car} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default MarketPlace