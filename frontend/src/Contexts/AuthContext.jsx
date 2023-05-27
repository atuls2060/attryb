import { createContext, useState } from "react";
import axios from "axios"


export const AuthContext = createContext();
const { token = null, name = null, role = null } = JSON.parse(localStorage.getItem("user")) || {};
const AuthContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(token !== null);
    const [userName, setUserName] = useState(name);
    const [userRole, setRole] = useState(role);

    const loginUser = async (cred) => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        try {
            const { data } = await axios.post(`${baseUrl}/users/login`, cred)
            localStorage.setItem("user", JSON.stringify(data))
            setIsAuth(true);
            loadUser()
        } catch (error) {
            console.log("error", error)
            alert(error.response.data.message)
        }
    }
    const registerUser = async (cred) => {
        const baseUrl = process.env.REACT_APP_BASE_URL

        try {
            const { data } = await axios.post(`${baseUrl}/users/register`, cred)
            localStorage.setItem("user", JSON.stringify(data))
            setIsAuth(true);
            loadUser()
        } catch (error) {
            console.log("error", error)
            alert(error.response.data.message)
        }
    }

    const loadUser = () => {
        const { name = null, role = null } = JSON.parse(localStorage.getItem("user"))
        setUserName(name)
        setRole(role)
    }
    const logoutUser = () => {
        setIsAuth(false);
        localStorage.removeItem("user")
    }

    return <AuthContext.Provider value={{ isAuth, userName, userRole, loginUser, registerUser, logoutUser }}>
        {
            children
        }
    </AuthContext.Provider>
}
export default AuthContextProvider