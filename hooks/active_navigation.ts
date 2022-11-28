import { useEffect, useState } from 'react'
import Router from 'next/router'

type NAV = "home" | "favourites" | "recents"

const useActiveNavigation = () => {
  
  const [active, changeActive] = useState<NAV>("home")
  
  useEffect(() => {
    const path = Router.asPath

    switch(path.split('/')[1]) {
      case 'home': {
        changeActive('home')
        break
      }
      case 'favourites': {
        changeActive('favourites')
        break
      }
      case 'recents': {
        changeActive('recents')
        break
      }
      default: break
    }
  }, [])

  return active
}

export { useActiveNavigation }