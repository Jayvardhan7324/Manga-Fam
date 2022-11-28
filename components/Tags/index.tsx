import { useRef } from 'react'
import classname from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { updatedTags, refreshManga } from '../../redux/action/action'
import { useHorizontalScroll } from '../../hooks/horizontal_scroll'


const Tags = ({ theme }: { theme: "LIGHT" | "DARK" }) => {

  const dispatch = useDispatch()
  const tag_array = useSelector((state: any) => state.main.genre)

  const element = useRef(null)

  const change_tag = (tag: string) => {
    const new_tag_array = { ...tag_array }
    new_tag_array[`${tag}`] = !tag_array[`${tag}`]

    // console.log(new_tag_array)

    // dispatch the new genre list to redux store
    dispatch(updatedTags(new_tag_array))

    // refresh the mangas
    dispatch(refreshManga())
  }

  // Horizontal scroll through mouse wheel
  useHorizontalScroll(element)

  return (
    <section 
      ref={element}
      style={{ backgroundColor: "var(--primary-bg-color)" }} 
      className="md:sticky z-10 md:top-0 md:left-0 overscroll-contain flex flex-row flex-nowrap items-center flex-shrink-0 overflow-x-scroll py-1 hidden_scroll"
    >
      {Object.keys(tag_array).map((tag: string) => (
        <span 
          key={tag} 
          className={
            classname(
              "flex-shrink-0 rounded-lg p-1 px-2 mx-1",
              theme === "LIGHT" ? "bg-secondary_white" : "bg-secondary_black",
              theme === "LIGHT" ? "text-primary-color" : "text-secondary_white",
              theme === "LIGHT" ? "hover:bg-d9-white" : "hover:bg-4B-black",
              tag_array[tag] ? "active_tag" : ""
            )
          }
        >
          <button
            type="button"
            role="button"
            className="text-inherit text-xs md:text-sm"
            onClick={() => { change_tag(tag) }}
          >
            {tag}
          </button>
        </span>
      ))}
    </section>
  )
}

export default Tags