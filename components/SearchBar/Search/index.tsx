import { useState, useEffect, type FC, forwardRef } from 'react' 
import classname from 'classnames'
import Cross from './cross'

interface SearchProps {
  theme: "LIGHT" | "DARK",
  changeSearchText: (text: string) => void,
}

const Search = forwardRef<HTMLDivElement, SearchProps>(function Search ({ theme, changeSearchText }, ref) {
  const [value, changeValue] = useState<string>("")

  const handleInput = (event: any) => { changeValue(event.target.value) }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value !== "") changeSearchText(value)
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  return (
    <div 
      ref={ref}
      className={
      classname(
        "flex flex-row flex-nowrap items-center p-2 rounded-lg w-full mx-2",
        theme === "LIGHT" ? "bg-secondary_white" : "bg-secondary_black",
      )}
      style={{ maxWidth: "600px" }}
    >
      <span className={classname("w-4 h-4 fill-custom-gray", { "fill-secondary_white": theme !== "LIGHT" })}>
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-inherit" viewBox="0 0 24 24">
          <g id="_01_align_center" data-name="01 align center">
            <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
          </g>
        </svg>
      </span>

      <input 
        type="text"
        placeholder="Search for manga ...."
        value={value}
        onInput={handleInput}
        className={
          classname(
            "text-custom-gray bg-transparent mx-2 w-full appearance-none outline-none",
            theme === "LIGHT" ? "" : "text-secondary_white",
          )
        }
      />

      <button
        role="button"
        type="button"
        className="fill-custom-gray w-4 h-4"
        onClick={() => { changeValue(""); changeSearchText("") }}
      >
        <Cross/>
      </button>
    </div>
  )
})

export default Search