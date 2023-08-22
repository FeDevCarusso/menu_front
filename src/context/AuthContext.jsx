import React, { createContext, useEffect, useState } from 'react'
import { is_login } from '../api/axios'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    useEffect(function () {
        async function initLoginService() {
            const result = await is_login()
            setIsChecked(true)
            setIsAuthenticated(result?.data?.bool)
        }

        initLoginService()
    })

    return <AuthContext.Provider value={{ isAuthenticated, isChecked }}>{children}</AuthContext.Provider>
}

export default AuthProvider
