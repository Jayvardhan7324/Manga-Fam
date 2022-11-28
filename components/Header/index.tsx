import Logo from '../Logo'
import Mode from '../Mode'

const Header = ({ mode, toggleTheme }: { mode: "LIGHT" | "DARK", toggleTheme: () => void }) => {
  return (
    <header className="w-full h-10 md:h-16 flex flex-row flex-nowrap justify-between items-center p-2">
      <div>
        <Logo/>
      </div>

      <button
        type="button"
        role="mode button"
        onClick={toggleTheme}
      >
        <Mode { ...{ mode } } />
      </button>
    </header>
  )
}

export default Header