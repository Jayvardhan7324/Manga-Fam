import { useState, useRef, type FC } from 'react'
import classname from 'classnames'
import Fab_icon from './Fab_icon'
import Popup from './fab_popup'
import { type Manga } from '../../utils/Manga'
import { useTransition, animated } from 'react-spring'
import { ModeContext } from '../../../hooks/theme_provider'
import { useClickAway } from '../../../hooks/useClickAway'


interface FABProps {
  manga: Manga,
  chapters: any,
  total: number,
  active: number,
  changeActive: (page: number) => void,
}

const FAB: FC<FABProps> = ({ manga, chapters, total, active, changeActive }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [open, toggle] = useState<boolean>(false)

  const transition = useTransition(open, {
    from: { height: 0 },
    enter: { height: 500 },
    leave: { height: 0 },
    delay: 200,
    config: { duration: 100 },
    reverse: true,
  })

  const toggleMenu = () => { toggle(!open) }

  // toggle the popup
  useClickAway(containerRef, toggleMenu, [popupRef])

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <div
            ref={containerRef} 
            className={classname(
            "fixed bottom-20 right-10 rounded-full z-50 drop-shadow-lg lg:hidden",
            theme === "LIGHT" ? "bg-primary-color" : "bg-secondary_black"
          )}>
            <button
              role="button"
              type="button"
              className="w-10 h-10 p-3 fill-secondary_white"
              onClick={toggleMenu}
            >
              <Fab_icon/>
            </button>
          </div>

          {
            transition(({ height }, open) => (
              open ? (
                <animated.div
                  ref={popupRef}
                  style={{ maxHeight: height.to(y => `${y}px` )}}
                  className={classname(
                    "p-2 flex flex-col flex-nowrap rounded-t-xl fixed bottom-0 left-0 w-full h-auto z-50",
                    theme === "LIGHT" ? "bg-white" : "bg-black"
                  )}
                >
                  <Popup
                    {...{ manga, chapters, total, active, changeActive }}
                  />
                </animated.div>
              ) : null
            ))
          }
        </>
      )}
    </ModeContext.Consumer>
  )
}

export default FAB
