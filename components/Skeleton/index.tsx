import { ModeContext } from '../../hooks/theme_provider'
import classname from 'classnames'

const MangaChapters = () => {
  const array = new Array(10).fill(0)
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          {array.map((_, index) => (
            <div
              key={index}
              className="skeleton rounded-md w-auto h-10 my-2 mx-1"
            >
            </div>
          ))}
        </>
      )}
    </ModeContext.Consumer>
  )
}

const MangaCover = () => {
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
}

const MangaSlider = ({ index }: { index: number }) => {
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
}

const MangaSection = () => {
  return (
    <div className="flex flex-col flex-nowrap w-full">
      <div className="flex flex-col flex-nowrap items-center md:flex-row w-full">
        <div className="skeleton rounded-lg my-2 flex-shrink-0" style={{ width: "230px", height: "320px" }}></div>
        
        <div className="flex flex-col flex-nowrap w-full md:mx-2">
          <div className="skeleton w-full h-10 rounded-lg m-1"></div>
          
          <div className="flex flex-row flex-nowrap m-1">
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
          </div>

          <div className="skeleton w-full h-10 rounded-lg m-1"></div>

          <div className="flex flex-row flex-nowrap m-1">
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
            <div className="skeleton w-20 h-10 rounded-lg m-1"></div>
          </div>
        </div>
      </div>

      <div className="skeleton w-full rounded-lg h-40 my-2 mx-1"></div>
    </div>
  )
}

export { MangaCover, MangaSlider, MangaChapters, MangaSection }