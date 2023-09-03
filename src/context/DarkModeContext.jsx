import React, { createContext, useState } from 'react'

export const DarkModeContext = createContext()

const DarkModeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(localStorage.getItem("darkmode") || "light")

    function switchDarkmode() {
        if (isDark === "light") {
            localStorage.setItem("darkmode", "dark")
            setIsDark("dark")
        } else {
            localStorage.setItem("darkmode", "light")
            setIsDark("light")
        }
    }



    return (
        <DarkModeContext.Provider value={{ switchDarkmode, isDark }}>{children}</DarkModeContext.Provider>
    )
}

export default DarkModeProvider