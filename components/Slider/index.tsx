import Link from 'next/link'
import { FC, useEffect, useState, useRef } from 'react'
import classname from 'classnames'
import { useActiveSlider } from '../../hooks/useActiveSlider'
import { usePopularManga } from '../../hooks/usePopularManga'
import Cover from '../Cover'
import { ModeContext } from '../../hooks/theme_provider'
import { MangaSlider } from '../Skeleton'
import type { Manga } from '../utils/Manga'

const MANGADEX_UPLOADS = "https://uploads.mangadex.org/covers/"

type SliderNavProps = {
  total_slider: number,
  active_slider: number,
  changeSlider: (active_slide_index: number) => void
}

const SliderItem: FC<{ manga: Manga, index: number }> = ({ manga, index }) => {
  const { attributes, id, relationships } = manga
  const { title, description } = attributes

  const cover_art = relationships.find(item => item.type === "cover_art")
  const author = relationships.find(item => item.type === "author")

  const author_name = author?.attributes.name || ""
  const filename = cover_art?.attributes.fileName || ""

  const low_image = `${MANGADEX_UPLOADS}${id}/${filename}.256.jpg`
  const high_image = `${MANGADEX_UPLOADS}${id}/${filename}.512.jpg`


  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <Link data-index={index} href={`/manga/${id}`}>
          <section 
            className={classname(
              "flex flex-row rounded-lg mx-2 p-2 slider_card overflow-hidden",
              theme === "LIGHT" ? "bg-secondary_white" : "bg-secondary_black",
            )}
          >
            
            <div className="w-full rounded-md overflow-hidden" style={{ minWidth: "calc(50% - 20px)" }}>
              <Cover low={low_image} high={high_image} />
            </div>
    
            <div className="flex-shrink-1 flex flex-col flex-nowrap ml-2" style={{ minWidth: "calc(50% - 20px)"}}>
              <span className={classname(
                "flex-shrink-1 p-1 text-sm text-ellipsis block h-fit",
                theme === "LIGHT" ? "text-primary-color" : "text-white"
              )}>
                {title.en}
              </span>
    
              <span className={classname(
                "text-xs text-ellipsis overflow-hidden text-custom-gray min-w-0"
              )}
              >
                <p className="flex-shrink-1 min-w-0 text-ellipsis">{description ? description.en : "Description is not available" }</p>
              </span>
            </div>
          </section>
        </Link>
      )}
    </ModeContext.Consumer>
  )
}

const SliderNav: FC<SliderNavProps> = ({ total_slider, active_slider, changeSlider }) => {
  const array = new Array(total_slider).fill(0)
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div className="w-full py-1 my-1 flex flex-row flex-nowrap justify-center items-center">
          {array.map((_, index) => (
            <button 
              type="button"
              role="button"
              key={index}
              onClick={() => { changeSlider(index) }}
              className={
                classname(
                  "rounded-full mx-1 w-2 h-2 md:w-3 md:h-3",
                  theme === "LIGHT" ? "bg-d9-white" : "bg-secondary_black",
                  active_slider === index ? "bg-primary-color" : "",
              )}>  
            </button>
          ))}
        </div>
      )}
    </ModeContext.Consumer>
  )
}

const PopularHeader = () => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <h3 className={classname("text-lg font-semibold p-3", theme === "LIGHT" ? "text-primary-color" : "text-d9-white")}>
          Popular
        </h3>
      )}
    </ModeContext.Consumer>
  )
}

const Slider = () => {
  const total_slider = 5
  const array = new Array(5).fill(0)

  const container = useRef<HTMLDivElement>(null)
  
  const [loading, error, mangas ] = usePopularManga()
  
  const [active, changeSlider] = useActiveSlider(mangas.length, container)


  return (
    <div className="flex flex-col flex-nowrap hidden_scroll">

      <PopularHeader/>

      <div ref={container} className="flex flex-row flex-nowrap p-1 overflow-x-auto slider_wrapper hidden_scroll scrollbar-none">

        {
          mangas.length > 0 ?
          (
            mangas.map((manga: Manga, index: number) => (
              <SliderItem key={index} { ...{ manga, index } } />
            ))
          ) : null
        }

        {
          loading ? (
            array.map((_, index) => (
              <MangaSlider key={index} index={index} />
            ))
          ) : null
        }

      </div>

      {
        mangas.length > 0 ?
        <SliderNav
          total_slider={mangas.length}
          active_slider={active}
          changeSlider={changeSlider}
        /> : null
      }
    </div>
  )
}

export default Slider