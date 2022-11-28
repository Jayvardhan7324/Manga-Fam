/* eslint-disable @next/next/no-img-element */
import { type FC, useEffect, useRef, useState, forwardRef } from 'react'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'
import NavLink from '../NavLink'
import Spinner from './spinner'

interface MangaPageType {
  data: string,
  dataSaver: string,
  index: number,
}



const MangaPage: FC<MangaPageType> = ({ data, dataSaver, index }) => {
  const [retry, changeRetry] = useState(false)
  const [loading, changeLoading] = useState(false)
  const image = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const handleError = (event: any) => {
      changeRetry(true)
    }

    const handleLoad = (event: any) => {
      changeLoading(true)

      if (image.current?.naturalHeight || image.current?.naturalWidth) changeLoading(false)
    }
 
    if (image.current) {
      image.current.onerror = handleError

      image.current.onload = handleLoad
    }
  }, [image])

  const handleRetryClick = () => {
    changeRetry(false)
  }

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div data-index={index + 1} className="flex-shrink-0 relative max-w-2xl page_wrapper">
          {retry ? (
            <div className="flex-shrink-0 flex flex-row flex-nowrap items-center justify-center">
              <button
                className={classname(
                  "px-2 py-1 rounded-xl text-sm md:text-lg",
                  theme === "LIGHT" ? "bg-secondary_white text-secondary_black" : "bg-4B-black text-d9-white"
                )}
                role="button"
                type="button"
                onClick={handleRetryClick}
              >
                Retry
              </button>
            </div>
          ) : (
            <picture>
              <source srcSet={dataSaver} media="(min-width:200px)"/>
              <source srcSet={data} media="(min-width:750px)" />
              <img ref={image} className="w-full h-full object-contain" loading="lazy" src={data} alt=""/>
            </picture>
          )}

          {
            loading ? (
              <div className="w-full h-full bg-4B-black absolute top-0 left-0 flex flex-row flex-nowrap items-center justify-center z-10">
                <Spinner/>
              </div>
            ) : null
          }

        </div>
      )}
    </ModeContext.Consumer>
  )
}

type PageRef = HTMLDivElement | null
type PageProps = { manga: any, chapters: any, result: any }

const Pages = forwardRef<PageRef, PageProps>(function Pages({ manga, chapters, result}, ref) {
  let chapter = result ? result.chapter : null
  let baseURL = result ? result.baseUrl : ""
  let hash = chapter ? chapter.hash : ""
  let data = chapter ? chapter.data : []
  let dataSaver = chapter ? chapter.dataSaver : []


  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <section
            ref={ref}
            className={classname(
            "relative w-full h-fit flex flex-col flex-nowrap items-center ",
            theme === "LIGHT" ? "bg-secondary_white" : "",
          )}>
            <NavLink manga={manga} />
            {chapter ? (
              data.map((filename: string, index: number) => (
                <MangaPage 
                  key={index}
                  index={index}
                  data={`${baseURL}/data/${hash}/${filename}`}
                  dataSaver={`${baseURL}/data-saver/${hash}/${dataSaver[index]}`}
                />
              ))
            ) : null}
          </section>
        </>
      )}
    </ModeContext.Consumer>
  )
})

export default Pages