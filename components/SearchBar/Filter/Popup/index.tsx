import { type FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classname from 'classnames'
import { ModeContext } from '../../../../hooks/theme_provider'
import { 
  updatedPublication,
  updatedContentRating, 
  updatedStatus, 
  updatedTheme, 
  refreshManga
} from '../../../../redux/action/action'

const getOptions = (state: any) => ({
  publication: state.main.publication,
  status: state.main.status,
  contentRating: state.main.contentRating,
  theme: state.main.theme,
})

type FilterGroupProps = {
  label: string,
  options: Record<string, boolean>,
  changeSelected: (option: string) => void,
}

const FilterGroup: FC<FilterGroupProps> = ({ label, options, changeSelected }) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div className="w-full p-2 my-2">
          <span className={
            classname(
              "sticky top-5 left-0 w-min p-1 px-2 z-50 rounded-lg font-semi-bold text-sm",
              theme === "LIGHT" ? "text-primary-color" : "text-white",
              theme === "LIGHT" ? "bg-d9-white" : "bg-4B-black"
            )
            }>
            {label}
          </span>
          <div className="flex flex-col flex-nowrap my-2">
            {Object.keys(options).map((option: string) => (
              <button
                role="button"
                type="button"
                key={option}
                className={
                  classname(
                    "py-2 px-2 m-1 flex flex-row flex-nowrap justify-start rounded-lg text-xs md:text-sm text-custom-gray",
                    theme === "LIGHT" ? "hover:bg-secondary_white" : "hover:bg-secondary_black",
                    options[option] ? "active_filter_option" : "",
                  )
                }
                onClick={() => changeSelected(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </ModeContext.Consumer>
  )
}

const FilterPopup = () => {
  const dispatch = useDispatch()
  const options = useSelector(getOptions)
  
  const { publication, status, contentRating, theme } = options

  const changePublication = (option: string) => {
    const new_publication = { ...publication }
    new_publication[option] = !publication[option]

    dispatch(updatedPublication(new_publication))
  }

  const changeStatus = (option: string) => {
    const new_status = { ...status }
    new_status[option] = !status[option]

    dispatch(updatedStatus(new_status))
  }

  const changeContentRating = (option: string) => {
    const new_contentRating = { ...contentRating }
    new_contentRating[option] = !contentRating[option]

    dispatch(updatedContentRating(new_contentRating))
  }

  const changeTheme = (option: string) => {
    const new_theme = { ...theme }
    new_theme[option] = !theme[option]

    dispatch(updatedTheme(new_theme))
  }

  const refreshPage = () => {
    // dispatch the event
    dispatch(refreshManga())
  }

  return (
    <section className="rounded-lg relative overflow-y-scroll h-full">
      <div 
        className="sticky top-0 left-0 z-10 border-b border-solid border-custom-gray flex flex-row flex-nowrap items-center px-1 py-2 justify-end"
        style={{ backgroundColor: "var(--filter-popup-bg-color)" }}
      >
        <button
          role="button"
          type="button"
          className="rounded-md text-base p-2 px-4 border border-solid border-transparent hover:border-primary-color filter_apply_button"
          onClick={refreshPage}
        >
          Done
        </button>
      </div>

      <FilterGroup label="Status" options={status} changeSelected={changeStatus} />
      <FilterGroup label="Publication" options={publication} changeSelected={changePublication} />
      <FilterGroup label="Content Rating" options={contentRating} changeSelected={changeContentRating} />
      <FilterGroup label="Theme" options={theme} changeSelected={changeTheme} />
    </section>
  )
}

export default FilterPopup