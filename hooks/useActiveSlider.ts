import { useState, useEffect, type RefObject } from 'react'

const useActiveSlider = (total_slider: number, container: RefObject<HTMLDivElement>): [number, (active_slide_index: number) => void] => {
  const [active, changeSlider] = useState<number>(0)

  const changeActiveSlider = (activeSlider: number) => {
    if (active < total_slider && active >= 0) changeSlider(activeSlider)
  }

  useEffect(() => {
    const clear_timeout = setTimeout(() => {
      if (active + 1 >= total_slider) {
        changeActiveSlider(0)
        return
      }

      changeActiveSlider(active + 1)
    }, 5000)

    return () => {
      clearTimeout(clear_timeout)
    }
  }, [active])

  useEffect(() => {
    if (container.current) {
      const children = container.current.children
      const containerRect = container.current.getBoundingClientRect()

      const getRect = (child: Element) => {
        return child.getBoundingClientRect()
      }

      for (let i = 0; i < children.length; i ++) {
        const child = children[i]
        const index = (child as HTMLElement).dataset['index']

        if (index && parseInt(index) === active) {
          const rect = getRect(child)

          // console.log(rect.left - containerRect.left)

          // scroll the container
          container.current.scrollBy({
            top: 0,
            left: rect.left - containerRect.left - 10,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [active])

  return [active, changeSlider]
}

export { useActiveSlider }