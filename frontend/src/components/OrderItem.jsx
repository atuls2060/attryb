import React from 'react'
import Styles from "./orderitem.module.css"
const OrderItem = ({image, title, price, name, email }) => {
    return (
        <tr className={Styles.order}>
            <td>
                <img src={image} alt={title} width="100px" height="100%" />
            </td>

            <td>
                < p>{title}</p>
            </td>
            <td>
                <p>₹ {price}</p>
            </td>
            <td>
                <p>{name}</p>
            </td>
            <td>
                <p>{email}</p>
            </td>
        </tr >
    )
}

export default OrderItem