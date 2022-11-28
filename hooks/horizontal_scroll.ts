import { useEffect, type RefObject } from 'react'

const useHorizontalScroll = (element: RefObject<HTMLElement> | null) => {
  useEffect(() => {

    // Mouse wheel event Handler
    const wheelEventHandler = (event: WheelEvent) => {
      const { deltaX, deltaY } = event

      // scroll the element horizontal
      element?.current?.scrollBy({
        top: 0,
        left: deltaY * 2,
        behavior: "smooth",
      })
    }

    if (element !== null && element.current) {
      // Add "Wheel" Event listener
      element.current.addEventListener("wheel", wheelEventHandler, false)
    }

    return () => {
      // Remove "Wheel" Event listener
      element && element.current?.removeEventListener("wheel", wheelEventHandler, false)
    }
  }, [element])
}

export { useHorizontalScroll }