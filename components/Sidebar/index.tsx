import classname from 'classnames'
import Link from 'next/link'
import Clock from './clock'
import Favourite from './favourite'
import Home from './home'
import { useTransition, animated } from 'react-spring'
import { ModeContext } from '../../hooks/theme_provider'
import { useActiveNavigation } from '../../hooks/active_navigation'
import { useOpenOnScrollUp } from '../../hooks/openOnScollUp'

type ItemType = Array<{ name: string, href: string, icon: JSX.Element }>

const ITEM: ItemType = [
  {
    name: "Home",
    icon: <Home/>,
    href: '/'
  },
  {
    name: "Favourites",
    icon: <Favourite/>,
    href: '/favourites' 
  },
  {
    name: "Recents",
    icon: <Clock/>,
    href: '/recents'
  }
]

const Vertical = () => {
  const active = useActiveNavigation()

  return <ModeContext.Consumer>
    {({ theme }) => (
      <ul className="flex flex-col flex-nowrap p-2 w-min">
        {ITEM.map((item) => (
          <Link key={item.name} href={item.href} >
            <li className={
                classname(
                  "rounded-lg p-2 px-3 my-2 mx-1 block transition-colors",
                  active === item.name.toLowerCase() ? "active_nav" : "",
                  theme === "LIGHT" ? "hover:bg-secondary_white" : "hover:bg-secondary_black"
                )}>
              <div className='flex flex-row flex-nowrap items-center'>
                <span className="w-6 h-6">{item.icon}</span>
                <span className="primary text-xl font-semi-bold m-2 ml-4">{item.name}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )}
  </ModeContext.Consumer>
}

const Horizontal = () => {
  const active = useActiveNavigation()
  const open = useOpenOnScrollUp()

  const transition = useTransition(open, {
    from: { height: 0 },
    enter: { height: 60 },
    leave: { height: 0 },
    config: { duration: 200 },
    delay: 200,
  })

  return <ModeContext.Consumer>
    {({ theme }) => (
      transition(({ height }, open) => (
        open ? (
          <animated.ul 
            className="grid grid-cols-3 gap-4 p-1 w-full"
            style={{ height: height.to(y => `${y}px`) }}
          >
            {
              ITEM.map((item) => (
                <Link key={item.name} className="w-full block" href={item.href}>
                    <li className={
                      classname(
                        "flex flex-row flex-nowrap items-center justify-center w-full rounded-lg p-1 transition-colors duration-300",
                        active === item.name.toLowerCase() ? "active_nav" : "",
                        theme === "LIGHT" ? "hover:bg-secondary_white" : "hover:bg-secondary_black"
                      )}
                      >
                      <div className="flex flex-col flex-nowrap w-full items-center">
                        <span className="w-4 h-4">{item.icon}</span>
                        <span className="primary text-sm m-1">{item.name}</span>
                      </div>
                    </li>
                </Link>
              ))
            }
          </animated.ul>
        ) : null
      ))
    )}
  </ModeContext.Consumer>
}

export { Horizontal, Vertical }