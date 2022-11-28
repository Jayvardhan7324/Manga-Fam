import { useState, useEffect, useRef } from 'react'

const useOpenOnScrollUp = () => {
  const [open, toggle] = useState<boolean>(true)
  const yCoords = useRef<number>(0)

  useEffect(() => {
    const scrollHandler = (event: any) => {
      const target = event.target

      if (target || target.scrollingElement) {
        const element = target.scrollingElement ? target.scrollingElement : target
        const scrollTop = element.scrollTop

        // open when the user scroll down
        if (scrollTop - yCoords.current < 0) toggle(true)
        else toggle(false)

        yCoords.current = scrollTop
      }
    }

    window.addEventListener('scroll', scrollHandler, true)

    return () => {
      window.removeEventListener("scroll", scrollHandler, true)
    }
  }, [])

  return open
}

export { useOpenOnScrollUp }