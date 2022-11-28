import { useState, createContext, useEffect, type Context } from 'react'

type MODE = "LIGHT" | "DARK"
type ModeContextType = {
  theme: MODE,
  toggleTheme: () => void,
}

const ModeContext: Context<ModeContextType> = createContext<ModeContextType>({ theme: "LIGHT", toggleTheme: () => {}})

// get MODE from localStorage
const getModeFromStorage = (): MODE => {

  if (localStorage.getItem("MODE") !== null) {
    return localStorage.getItem("MODE") as MODE
  } else {

    // if key "MODE" doesn't exists
    localStorage.setItem("MODE", "LIGHT")

    return "LIGHT"
  }
}

const setModeInStorage = (mode: MODE) => {
  if (localStorage.getItem("MODE") !== null) {
    localStorage.setItem("MODE", mode)
  } else {
    localStorage.setItem("MODE", mode)
  }
}

export { ModeContext }

export const useThemeMode = (): [ MODE, () => void ] => {

  const [themeMode, changeThemeMode] = useState<MODE>("LIGHT")

  const changeMode = () => {
    // store the value in localstorage
    setModeInStorage(themeMode !== "LIGHT" ? "LIGHT" : "DARK")

    if(themeMode === "LIGHT") changeThemeMode("DARK")
    else changeThemeMode("LIGHT")
  }

  useEffect(() => {
    changeThemeMode(getModeFromStorage())
  }, [])

  // change the class of the root
  useEffect(() => {

    if (themeMode === "LIGHT") {
      // remove the dark class from the root
      document.querySelector(":root")?.classList.remove("dark")

      // add the light class
      document.querySelector(":root")?.classList.add("light")
    }
    else {
      
      // remove the light class from the root
      document.querySelector(":root")?.classList.remove("light")

      // add the dark class
      document.querySelector(":root")?.classList.add("dark")
    }

  }, [themeMode])

  return [themeMode, changeMode]
}