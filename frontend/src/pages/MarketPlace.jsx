import React, { useContext, useEffect, useState } from 'react'
import Styles from "./marketplace.module.css"
import CarCard from '../components/CarCard';
import { MarketPlaceContext } from '../Contexts/MarketPlaceContext';
import SubNavbar from '../components/SubNavbar';

const MarketPlace = () => {
  const { carList, getCarList } = useContext(MarketPlaceContext)

  useEffect(() => {
    getCarList()
  }, [])
  return (
    <>
      <div className={Styles.cars_list_container}>
        <SubNavbar />
        <div className={Styles.filters_container}>
          <select>
            <option value="">Filter by Price</option>
            <option value="" >Price : Low to High</option>
            <option value="">Price : High to Low</option>
          </select>
          <select>
            <option value="">Filter by Colors</option>
            <option value="">All</option>
            <option value="">Black</option>
            <option value="">White</option>
            <option value="">Red</option>
            <option value="">Green</option>
            <option value="">Yellow</option>
            <option value="">Silver</option>
          </select>
          <select>
            <option value="">Filter by Mileage</option>
            <option value="">Mileage : Low to High</option>
            <option value="">Mileage : High to Low</option>
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