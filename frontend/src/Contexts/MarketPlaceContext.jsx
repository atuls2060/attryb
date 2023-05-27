import axios from "axios";
import { createContext, useState } from "react";


export const MarketPlaceContext = createContext();

const MarketPlaceContextProvider = ({ children }) => {
    const [carList, setCarList] = useState([]);

    const getCarList = async (filterField="", order="",colorFilter="") => {
        const { token } = JSON.parse(localStorage.getItem("user")) || {}
        const baseUrl = process.env.REACT_APP_BASE_URL
        try {
            const { data } = await axios.get(`${baseUrl}/marketplace`, {
                headers: {
                    'Authorization': token
                },
                params: {
                    filterField,
                    order,
                    colorFilter
                }
            })
            setCarList(data)
        } catch (error) {
            console.log("error", error)
            alert(error.response.data.message)
        }
    }


    return <MarketPlaceContext.Provider value={{ carList, getCarList }}>
        {
            children
        }
    </MarketPlaceContext.Provider>
}
export default MarketPlaceContextProvider