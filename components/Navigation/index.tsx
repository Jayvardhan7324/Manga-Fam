import { Horizontal, Vertical } from '../Sidebar'

const Navigation = () => {
  return (
      <>
        <nav className="hidden max-w-min h-full md:block md:col-start-1 md:col-end-4 nav_wrapper">
          <Vertical/>
        </nav>

        <nav className="block fixed bottom-0 left-0 w-full h-min z-50 md:hidden nav_wrapper">
          <Horizontal/>
        </nav>
      </>
  )
}

export default Navigation