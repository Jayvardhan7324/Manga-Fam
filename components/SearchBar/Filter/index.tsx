import { type FC, type ForwardedRef, forwardRef, useRef } from 'react'
import { useToggle } from '../../../hooks/useToggle'
import { useClickAway } from '../../../hooks/useClickAway'
import classname from 'classnames'
import { useTransition, animated } from 'react-spring'
import FilterPopup from './Popup'

type PopupTypes = {
  theme: "LIGHT" | "DARK",
  open: boolean,
}

const Popup: FC<PopupTypes> = ({ theme, open }) => {

  const top_transitions = useTransition(open, {
    from: { height: 0 },
    enter: { height: 500 }, 
    leave: { height: 0 },
    delay: 200,
    reverse: true,
    config: { duration: 200 }
  })

  const bottom_transitions = useTransition(open, {
    from: { y: 300 },
    enter: { y: 0 },
    leave: { y: 300 },
    delay: 200,
    reverse: true,
    config: { duration: 200 },
  })
  
  return (
    <>
      {
        top_transitions(({ height }, open) => 
          open && 
          <animated.div
            style={{ height: height.to(y => `${y}px`) }}
            className={
              classname(
                "rounded-md hidden md:block filter_popup", 
                theme === "LIGHT" ? "bg-d9-white" : "bg-4B-black"
              )}
          >
            <FilterPopup/>
          </animated.div>)
      }

      {
        bottom_transitions(({ y }, open) => 
          open &&
          <animated.div
            style={{ transform: y.to(value => `translateY(${value}px)`) }}
            className={
              classname(
                "rounded-md md:hidden filter_popup"
              )}
          >
            <FilterPopup/>
          </animated.div>
        )
      }
    </>
  )
}

const Filter: FC<{ theme: "LIGHT" | "DARK" }> = ({ theme }) => {
  const container = useRef<HTMLDivElement>(null)
  const [open, toggle] = useToggle(false)

  // add click away hook
  useClickAway(container, open, toggle)

  return (
    <div className='relative' ref={container}>
      <button
        type="button"
        role="button"
        className={
          classname(
            "rounded-full p-2",
            theme === "LIGHT" ? "bg-secondary_white" : "bg-secondary_black",
            theme === "LIGHT" ? "hover:bg-d9-white" : "hover:bg-4B-black",
            theme === "LIGHT" ? "fill-primary-color" : "fill-d9-white",
            { 
              "hover:fill-d9-white": theme !== "LIGHT",
            }
          )}
        onClick={toggle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className={classname(" w-4 h-4 fill-custom-gray fill-inherit")}>
          <path d="M1,4.75H3.736a3.728,3.728,0,0,0,7.195,0H23a1,1,0,0,0,0-2H10.931a3.728,3.728,0,0,0-7.195,0H1a1,1,0,0,0,0,2ZM7.333,2a1.75,1.75,0,1,1-1.75,1.75A1.752,1.752,0,0,1,7.333,2Z"/>
          <path d="M23,11H20.264a3.727,3.727,0,0,0-7.194,0H1a1,1,0,0,0,0,2H13.07a3.727,3.727,0,0,0,7.194,0H23a1,1,0,0,0,0-2Zm-6.333,2.75A1.75,1.75,0,1,1,18.417,12,1.752,1.752,0,0,1,16.667,13.75Z"/>
          <path d="M23,19.25H10.931a3.728,3.728,0,0,0-7.195,0H1a1,1,0,0,0,0,2H3.736a3.728,3.728,0,0,0,7.195,0H23a1,1,0,0,0,0-2ZM7.333,22a1.75,1.75,0,1,1,1.75-1.75A1.753,1.753,0,0,1,7.333,22Z"/>
        </svg>
      </button>

      <Popup {...{ theme, open }}/>
    </div>
  )
}

export default Filter