import { memo } from 'react'
import { ModeContext } from '../../hooks/theme_provider'
import classname from 'classnames'

const MangaChapters = memo(function mangaChanpters() {
  const array = new Array(15).fill(0)
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          {array.map((_, index) => (
            <div
              key={index}
              className="skeleton rounded-md w-auto h-12 my-1 mx-1"
            >
            </div>
          ))}
        </>
      )}
    </ModeContext.Consumer>
  )
})

const MangaCover = memo(function mangaCover() {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div 
          role="skeleton placeholder"
          className={classname(
            "w-28 h-32 m-2 rounded-lg skeleton skeleton-card",
          )}
        >

        </div>
      )}
    </ModeContext.Consumer>
  )
})

const MangaSlider = memo(function mangaSlider({ index }: { index: number }) {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div
          role="skeleton placeholder"
          data-index={index}
          className={
            classname(
              "skeleton rounded-md slider_card p-2 my-1 mx-2"
            )
          }
        >

        </div>
      )}
    </ModeContext.Consumer>
  )
})

const MangaSection = memo(function mangaSection() {
  return (
    <div className="flex flex-col flex-nowrap w-full">
      <div className="flex flex-col flex-nowrap items-center md:flex-row w-full">
        <div className="skeleton rounded-lg my-2 flex-shrink-0" style={{ width: "190px", height: "250px" }}></div>
        
        <div className="flex flex-col flex-nowrap w-full md:mx-2">
          <div className="skeleton w-8/12 h-10 rounded-lg m-1"></div>
          
          <div className="flex flex-row flex-nowrap m-1">
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
          </div>

          <div className="skeleton w-8/12 h-10 rounded-lg m-1"></div>

          <div className="flex flex-row flex-nowrap m-1">
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
          </div>
        </div>
      </div>

      <div className="skeleton w-10/12 rounded-lg h-40 my-4 "></div>
    </div>
  )
})

export { MangaCover, MangaSlider, MangaChapters, MangaSection }
