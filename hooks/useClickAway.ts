import { useEffect, type RefObject } from 'react'

type Ref = RefObject<HTMLElement>

// if otherRef is in the event composed path
const eventHasOther = (event: any, other: Ref[] = []): boolean => {
  if (other.length === 0) return true

  let result: boolean = false

  other.forEach((item: Ref) => {
    if (item.current) {
      result = event.composedPath().includes(item.current)
    }
  })

  return result
}

const useClickAway = (container: Ref, open: boolean, toggle: () => void, otherRef: Ref[] = []) => {
  useEffect(() => {

    const clickHandler = (event: any) => {
      if (container.current) {
        if (!event.composedPath().includes(container.current) && !eventHasOther(event, otherRef)) {
          toggle()
        }
      }
    }

    if (container && container.current && open) {
      window.addEventListener("click", clickHandler, false)
    }

    return () => {
      window.removeEventListener("click", clickHandler, false)
    }
  }, [container, otherRef])
}

export { useClickAway }