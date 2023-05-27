import React from 'react'
import Styles from "./oemscard.module.css"

const OEMSCard = ({ model, year, listPrice, colors, mileage, power, maxSpeed }) => {
    return (
        <div className={Styles.oems_card}>
            <h3>Model : {model}</h3>
            <p><b>Year :</b> {year}</p>
            <p><b>Original Price :</b> ₹ {listPrice}</p>
            <p><b>Colors :</b> {colors.map((item, idx) => <span style={{ backgroundColor: item, color: item == "White" ? "black" : "white" }} key={idx}>{item}</span>)}</p>
            <p><b>Mileage :</b> {mileage}</p>
            <p><b>Power :</b> {power} BHP</p>
            <p><b>Max Speed :</b> {maxSpeed} KM/h</p>
        </div >
    )
}

export default OEMSCard