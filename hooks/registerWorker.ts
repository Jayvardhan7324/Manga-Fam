import { useEffect } from 'react'

const useRegisterWorker = () => {
  
  const registerServiceWorker = async () => {

    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistration()
        
        // if the serviceWorker is already active
        if (registrations && registrations.active && registrations.active.state !== "activated") {
          console.log("Service worker already active")
          return
        }

        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        if (registration.installing) {
          console.log("Service worker installing")
        } else if (registration.waiting) {
          console.log("Service worker installed")
        } else if (registration.active) {
          console.log("Service worker active")
        }

      } catch(error) {
        console.error("Registration failed with ", error)
      }
    }
  }
  
  useEffect(() => {
    const loadHandler = () => {
      registerServiceWorker()
    }

    loadHandler()
  })
}

export { useRegisterWorker }