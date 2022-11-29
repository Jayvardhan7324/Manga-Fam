/* eslint-disable @next/next/no-img-element */
import { type FC, useRef, useEffect, useState } from 'react'
import classname from "classnames"
import { useRouter } from 'next/router'
import { ModeContext } from '../../../hooks/theme_provider'
import { useGetRecentData } from '../../../hooks/getRecentDate'
import { type Manga } from '../../utils/Manga'
import { useTransition, animated } from 'react-spring'
import Cover from '../../Cover'
import Chapters from '../../Chapters'
import ArrowLeft from './arrow-left'
import ArrowRight from './arrow-right'
import ArrowBack from './arrow-back'
import Menu from './menu'

interface PopupProps {
  manga: Manga,
  chapters: any,
  total: number,
  active: number,
  changeActive: (page: number) => void,
}

interface SliderProps {
  total: number,
  active: number,
  changeActive: (page: number) => void,
}

const ChaptersPopup: FC<{ manga: Manga, chapters: any, toggleChapters: () => void }> = ({ manga, chapters, toggleChapters }) => {
  const recentData = useGetRecentData(manga)
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <div className="mt-8">
            <button
              role="button"
              type="button"
              onClick={() => { toggleChapters() }}
              className={classname(
                "w-5 h-5 flex flex-row flex-nowrap items-center justify-center",
                theme === "LIGHT" ? "fill-primary-color" : "fill-d9-white",
              )}
            >
              <ArrowBack/>
            </button>
          </div>
    
          <Chapters {...{manga, loading: false, chapters, recentData }} />
        </>
      )}
    </ModeContext.Consumer>
  )
}

const Slider: FC<SliderProps> = ({ total, active, changeActive }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLSpanElement | null>(null)


  useEffect(() => {
    const setSlider = () => {
      if (containerRef && sliderRef && containerRef.current && sliderRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const sliderRect = sliderRef.current.getBoundingClientRect()
        
        if (total && active) {
          const perPageAmount = containerRect.width / total

          // style the slider position
          const left = (perPageAmount * active) - sliderRect.width * 0.5
          sliderRef.current.style.left = `${left}px` 
        }
      }
    }

    setSlider()
  }, [active])


  useEffect(() => {

    const handlePointerMove = (event: any) => {
      const rect = containerRef && containerRef.current ? containerRef.current.getBoundingClientRect() : null
      const sliderRect = sliderRef.current?.getBoundingClientRect()
      const x = event.clientX

      if (rect === null) return // return if the rect is null

      const perPageAmount = rect.width / total

      if (sliderRect && sliderRef.current) {
        const coords = x - rect.x
        if (coords + (sliderRect.width * 0.5) > rect.x && coords + (sliderRect.width * 0.5) < rect.x + rect.width) {
          sliderRef.current.style.left = `${coords - (sliderRect.width * 0.5)}px`

          const page = Math.floor(coords / perPageAmount)

          if (active !== page) {
            changeActive(page)
          }
        }
      }
    }

    const handlePointerEnter = (event: any) => {
      // console.log("added")
      // add "pointermove" listener
      containerRef.current && containerRef.current?.addEventListener("pointermove", handlePointerMove, false)

    }

    const handlePointerLeave = (event: any) => {

      // console.log("removed")
      // remove "pointermove" listener
      containerRef.current && containerRef.current?.removeEventListener("pointermove", handlePointerMove, false)
    }

    if (containerRef.current && sliderRef.current) {
      containerRef.current.addEventListener("pointerenter", handlePointerEnter, false)
      containerRef.current.addEventListener("pointerleave", handlePointerLeave, false)
    }

    return () => {
      containerRef.current?.removeEventListener("pointerenter", handlePointerEnter, false)
      containerRef.current?.removeEventListener("pointerleave", handlePointerLeave, false)
    }
  }, [containerRef, sliderRef])

  return (
    <div ref={containerRef} className="w-full py-2 mx-2 my-2 flex flex-row flex-unwrap items-center cursor-grab">
      <span className="relative block w-full h-0.5 rounded-md bg-primary-color">
        <span style={{ transition: "left 0.1s linear" }} ref={sliderRef} className="absolute -top-2 left-0 block w-4 h-4 rounded-full bg-primary-color"></span>
      </span>
    </div>
  )
}

interface PageType { volume: string, chapter: string }

const ChapterNav = ({ chapters, toggleChapters }: any) => {
  const router = useRouter()
  const [prevChapter, changePrevChapter] = useState<PageType>({ volume: "", chapter: "" })
  const [nextChapter, changeNextChapter] = useState<PageType>({ volume: "", chapter: "" })

  const { id, vol, chapter } = router.query

  useEffect(() => {
    const findPrevAndNextChapter = () => {
      let prevVol = ""
      let prevCh = ""
      let nextVol = ""
      let nextCh = ""

    let found = false 
    
    for (const item of Object.values(chapters)) {
      const { volume } = item  as any
      const chp = (item as any).chapters

      for (const chItem of Object.values(chp)) {
        const ch = (chItem as any).chapter as string

        if (found) {
          nextVol = volume
          nextCh = ch
          break
        }

        if (volume === vol && chapter === ch) {
          found = true
        }

        if (!found) {
          prevVol = volume
          prevCh = ch
        }
      }

      if (found) {
        if (nextVol === "" && nextCh === "") continue
        break
      }
    }

      changePrevChapter({ volume: prevVol, chapter: prevCh })
      changeNextChapter({ volume: nextVol, chapter: nextCh })
    }

    findPrevAndNextChapter()
  }, [vol, chapter])

  const handlePrev = () => {
    if (prevChapter.volume !== "" && prevChapter.chapter !== "") {
      router.push({
        pathname: `/manga/${id}/read`,
        query: {
          vol: prevChapter.volume,
          chapter: prevChapter.chapter,
        }
      })
    }
  }


  const handleNext = () => {
    if (nextChapter.volume !== "" && nextChapter.chapter !== "") {
      router.push({
        pathname: `/manga/${id}/read`,
        query: {
          vol: nextChapter.volume,
          chapter: nextChapter.chapter,
        }
      })
    }
  }

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div
          className={classname(
            "flex flex-row flex-nowrap items-stretch justify-around gap-1",
            theme === "LIGHT" ? "text-primary-color fill-primary-color" : "text-d9-white fill-d9-white"
          )}
        >
          <button
            role="button"
            type="button"
            className={classname(
              "flex flex-row flex-nowrap px-2 py-1 rounded-md h-full",
              theme === "LIGHT" ? "bg-secondary_white hover:bg-d9-white" : "bg-secondary_black hover:bg-4B-black"
            )}
            onClick={handlePrev}
          >
            { prevChapter.volume === "" && prevChapter.chapter === "" ? (
              <span className="text-custom-gray m-1">No Previous Chapter</span>
            ) : (
              <>
                <span className="block w-4 h-4 m-1">
                  <ArrowLeft/>
                </span>

                <span className="m-1">
                  {`Vol.${prevChapter.volume === "none" ? "TBD" : prevChapter.volume} Ch.${prevChapter.chapter === "none" ? "TBD" : prevChapter.chapter}`}
                </span>
              </>
            )}
          </button>

          <button
            role="button"
            type="button"
            onClick={() => { toggleChapters() }}
            className={classname(
              "flex flex-row flex-nowrap px-2 py-1 rounded-md h-full",
              theme === "LIGHT" ? "bg-secondary_white hover:bg-d9-white" : "bg-secondary_black hover:bg-4B-black"
            )}
          >
            <span className="block w-4 h-4 m-1">
              <Menu/>
            </span>
            
            <span className="m-1">
              All Chapters
            </span>
          </button>

          <button
            role="button"
            type="button"
            className={classname(
              "flex flex-row flex-nowrap px-2 py-1 rounded-md h-full",
              theme === "LIGHT" ? "bg-secondary_white hover:bg-d9-white" : "bg-secondary_black hover:bg-4B-black"
            )}
            onClick={handleNext}
          >
            { nextChapter.volume === "" && nextChapter.chapter === "" ? (
              <span className="text-custom-gray m-1">No Next Chapter</span>
            ) : (
              <>
                <span className="m-1 h-fit">
                  {`Vol.${nextChapter.volume !== "none" ? nextChapter.volume : "TBD"} Ch.${nextChapter.chapter === "none" ? "TBD" : nextChapter.chapter}`}
                </span>

                <span className="block w-4 h-4 m-1">
                  <ArrowRight/>
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </ModeContext.Consumer>
  )
}

const MangaDescription = ({ manga }: { manga: Manga }) => {

  const { id, attributes, relationships } = manga
  
  const title = attributes ? attributes.title : null
  const author = relationships.find(item => item.type === "author")
  const cover = relationships.find(item => item.type === "cover_art")

  const filename = cover ? cover.attributes.fileName : null
  const author_name = author ? author.attributes.name : null

  const cover_url = filename ? `https://uploads.mangadex.org/covers/${id}/${filename}.256.jpg` : null

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div className="flex flex-row flex-nowrap p-2">
          <div className="flex-shrink-0 w-24 h-36 rounded-md overflow-hidden">
            { cover_url ? (
              <Cover low={cover_url} high="" />
            ) : null}
          </div>
    
          <div className="flex flex-col flex-nowrap ml-5 w-full">
            <span 
              className={classname(
                "text-sm font-bold break-words w-full",
                theme === "LIGHT" ? "text-primary-color" : "text-d9-white"
              )}
            >{title && title.en ? title.en : "No Title is available"}</span>
            <span className="text-sm text-custom-gray">{author_name ? author_name : "Author name is unavailable"}</span>
          </div>
        </div>
      )}
    </ModeContext.Consumer>
  )
}

const Popup: FC<PopupProps> = ({ manga, chapters, total, active, changeActive, }) => {
  const [openChapters, toggleChapters] = useState<boolean>(false)

  const transition = useTransition(openChapters, {
    from: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: -100, opacity: 0 },
    config: { duration: 200 },
  })

  const toggle = () => {
    toggleChapters(!openChapters)
  }
  
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          {transition(({ x, opacity }, openChapters) => (
            <>
              {openChapters ? (
                <animated.div
                  style={{ transform: x.to(val => `translateX(${val}%)`), opacity: opacity.to(val => `${val}`)}}
                  className="flex flex-row flex-nowrap overflow-hidden"
                >
                  <ChaptersPopup {...{ manga, chapters, toggleChapters: toggle }} />
                </animated.div>
              ) : (
                <animated.div
                  style={{ transform: x.to(val => `translateX(${val}%)`), opacity: opacity.to(val => `${val}`)}} 
                >
                  <MangaDescription {...{ manga }} />

                  <div className={classname(
                    "flex flex-row flex-nowrap items-center justify-center m-2 text-sm font-bold",
                    theme === "LIGHT" ? "text-primary-color" : "text-d9-white"
                  )}>
                    <span>{active}</span>
                    <span>/</span>
                    <span>{total}</span>
                  </div>
            
                  <div className="flex-shrink-1 flex flex-row flex-nowrap items-center m-2">
                    <Slider {...{ total, active, changeActive }} />
                  </div>
        
                  <ChapterNav chapters={chapters} toggleChapters={toggle} />
                </animated.div>
              )}
            </>
          ))}
        </>
      )}
    </ModeContext.Consumer>
  )
}

export default Popup