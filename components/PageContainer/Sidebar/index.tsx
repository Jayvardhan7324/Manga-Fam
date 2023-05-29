import { type FC, useState } from 'react'
import { type Manga } from '../../utils/Manga'
import classname from 'classnames'
import { useGetRecentData } from '../../../hooks/getRecentDate'
import { ModeContext } from '../../../hooks/theme_provider'
import MangaDescription from '../mangaDescription'
import Chapters from '../../Chapters'

interface SidebarProps {
  manga: Manga,
  chapters: any,
  loading: boolean,
}

interface SidebarOptions {
  description: boolean,
  chapters: boolean
}

interface ButtonProps {
  label: string,
  option: boolean,
  theme: "LIGHT" | "DARK",
  clickHandler: () => void
}

const Button: FC<ButtonProps> = ({ label, option, theme, clickHandler }) => {
  return (
    <button
      role="button"
      type="button"
      className={classname(
        "px-2 py-1 text-sm rounded-md mx-1",
        theme === "LIGHT" ? "text-primary-color hover:bg-secondary_white" : "text-d9-white hover:bg-secondary_black",
        option ? (theme === "LIGHT" ? "bg-d9-white" : "bg-4B-black") : ""
      )}
      onClick={clickHandler}
    >
      {label}
    </button>
  )
}

const Sidebar: FC<SidebarProps> = ({ manga, chapters, loading }) => {
  const [options, changeOptions] = useState<SidebarOptions>({ description: true, chapters: false })
  const recentData = useGetRecentData(manga)

  const handleDescription = () => {
    // change the options
    changeOptions({ description: true, chapters: false })
  }


  const handleChapters = () => {
    // change the options
    changeOptions({ description: false, chapters: true })
  }

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <section className="w-80 flex-shrink-0 sticky top-0 left-0 overflow-y-auto hidden scrollbar-none hidden_scroll lg:block">
          <div className="flex flex-row flex-nowrap items-center p-1">
            <Button
              label="Description"
              option={options.description}
              theme={theme}
              clickHandler={handleDescription}
            />
            <Button
              label="Chapters"
              option={options.chapters}
              theme={theme}
              clickHandler={handleChapters}
            />
          </div>
    
          {
            options.description ?
            (manga ? (<MangaDescription {...{ manga }} />) :
              <div className="w-full flex flex-row flex-nowrap items-center justify-center">
                <span className="text-sm text-custom-gray">No Description available</span>
              </div>
            )
            : null
          }
          {
            options.chapters ?
            (
              chapters ? (<Chapters {...{ loading, chapters, recentData }} />) : 
              <div className="w-full flex flex-row flex-nowrap items-center justify-center">
                <span className="text-sm text-custom-gray">No Chapters available</span>
              </div>
            ) : null
          }
        </section>
      )}
    </ModeContext.Consumer>
  )
}

export default Sidebar