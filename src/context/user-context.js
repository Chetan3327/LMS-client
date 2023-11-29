import axios from "axios";
import React, {createContext, useState} from "react";
import { useCookies } from 'react-cookie';

export const UserContext = createContext(null)


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [cookie, setCookie, removeCookie] = useCookies(['jwt-access-token'])
    axios.defaults.headers.common['Authorization'] = cookie['jwt-access-token']


    const contextValue = {BACKEND_URL, search, setSearch, category, setCategory}

    return(
        <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>
    )

}

