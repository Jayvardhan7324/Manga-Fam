import { useState, useEffect, useCallback, useRef, useContext, useMemo } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import Arrow from './arrow'
import Cover from '../Cover'
import { ModeContext } from '../../hooks/theme_provider'
import { usePopularManga } from "../../hooks/usePopularManga";
import type { Manga } from '../utils/Manga'

const MANGADEX_UPLOADS = "https://uploads.mangadex.org/covers/";

interface IBannerProps {
  manga: Manga
  prevBut?: JSX.Element
  nextBut?: JSX.Element
}

const Banner = ({ manga, prevBut, nextBut }: IBannerProps) => {
  const { theme } = useContext(ModeContext)

  const [mouseOver, changeMouseOver] = useState<boolean>(false)
  
  const { attributes, id, relationships } = manga
  const { title, description } = attributes

  const cover_art = useMemo(() => relationships.find(item => item.type === "cover_art"), [relationships])
  const author = useMemo(() => relationships.find(item => item.type === "author"), [relationships])

  const author_name = useMemo(() => author ? author.attributes.name : "" , [author])

  const { low_image, high_image } = useMemo(() => { 
    if (!cover_art)
      return {}

    const filename = cover_art.attributes.fileName
    return {
      low_image: `${MANGADEX_UPLOADS}${id}/${filename}.256.jpg`,
      high_image: `${MANGADEX_UPLOADS}${id}/${filename}.512.jpg`,
    }
  }, [cover_art])

  return (
    <div
      className="relative w-full h-full z-0"
      onMouseOver={() => changeMouseOver(true)}
      onMouseOut={() => changeMouseOver(false)}
    >

      {/* Previous Button */}
      {prevBut}

      <img
        src={high_image}
        alt={title.en}
        className="-z-10 absolute top-0 left-0 w-full h-full object-cover object-left-top"
      />

      <Link href={`/manga/${id}`} title={title.en}>
        <div
          style={{ 
            backgroundImage: theme === "DARK" ? 
            "linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, transparent 75%)" 
            : "linear-gradient(to top, rgba(255, 255, 255, 0.5) 20%, transparent 75%)",
            // @ts-ignore
            ["--banner-bg-position"]: mouseOver ? "0% 30%" : "0% 0%"
          }}
            className="flex-grow p-2 w-full h-full flex flex-col justify-end gap-1 animated__banner"
          >

          <div className="flex flex-row gap-2 items-end">

            {/* manga cover image */}
            <div className="flex-shrink-0 hidden md:block w-[200px] h-[250px] rounded-md overflow-hidden shadow-md">
              <Cover
                low={low_image || ""}
                high={high_image || ""}
              />
            </div>

            <div className="w-full h-min flex flex-col">
              {/* Manga title */}
              <span className={classnames("w-full", theme === "DARK" ?  "text-custom-gray" : "text-mid_black")}>
                <h1 className="flex-grow font-sans text-2xl md:text-5xl md:leading-[4rem] text-inherit overflow-hidden whitespace-nowrap  text-ellipsis">{title.en}</h1>
              </span>

              {/* Manga Description */}
              <span className={classnames("max-h-[100px] flex-grow-0 w-full", theme === "DARK" ?  "text-custom-gray" : "text-mid_black")}>
                <p className="font-sans text-sm md:text-md text-inherit overflow-hidden whitespace-nowrap text-ellipsis">{description.en}</p>
              </span>
            </div>
          </div>
          </div>
        </Link>

          {/* Next Button */}
          {nextBut}
        </div>
  )
}

export default function BannerList() {
  const { theme } = useContext(ModeContext)

  const [active, changeActive] = useState<number>(0)

  const [loading, error, mangas] = usePopularManga()

  const activeManga = useMemo(() => mangas.length == 0 ? null : mangas[active], [active, mangas])

  // Go to the previous banner image
  const handlePrevious = useCallback(() => {
    if (active > 0 && active < mangas.length)
      changeActive(active - 1)
  }, [active, mangas, changeActive])
  
  // Go to the next banner image
  const handleNext = useCallback(() => {
    if (active < mangas.length - 1)
      changeActive(active + 1)
  }, [active, mangas, changeActive])

  // Previous Button
  const previousButton = useMemo(() => {
    return (
      <button
        type="button"
        className="absolute top-1/2 left-0 -translate-y-1/2 z-40 bg-black/40 rounded-md p-2"
        onClick={handlePrevious}
      >
        <Arrow className={"w-4 h-4 md:w-8 md:h-8 stroke-d9-white fill-d9-white"}/>
      </button> 
    )
  }, [handlePrevious])


  // Next button
  const nextButton = useMemo(() => {
    return ( 
      <button
        type="button"
        className="absolute top-1/2 right-0 -translate-y-1/2 rotate-180 z-40 bg-black/40 rounded-md p-2"
        onClick={handleNext}
      >
        <Arrow className={"w-4 h-4 md:w-8 md:h-8 stroke-d9-white fill-d9-white"}/>
      </button> 
    )
  }, [handleNext])

  return (
    <section className="w-full h-[200px] md:h-[400px] | m-1 | rounded-md md:rounded-lg | overflow-hidden">
      {activeManga && (
        <Banner
          manga={activeManga}
          prevBut={active > 0 ? previousButton : undefined}
          nextBut={active < mangas.length - 1 ? nextButton : undefined}
        />
      )}

      {/* loading skeleton */}
      {(loading || mangas.length === 0) && (
        <div className="skeleton w-full h-full rounded-md m-2"></div>
      )}
    </section>
  )
}
