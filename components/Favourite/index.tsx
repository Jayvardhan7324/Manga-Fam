import MangaCover from '../MangaCover'
import * as Skeleton from '../Skeleton'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'
import { useGetFavourites } from '../../hooks/getFavourite'
import type { Manga } from '../utils/Manga'


const NoFavourite = () => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div
          className={classname(
            "py-4 w-full flex flex-row items-center justify-center text-bold text-lg",
            theme === "LIGHT" ? "text-primary-color" : "text-d9-white"
          )}
        >
          <span>No favourites!</span>
        </div>
      )}
    </ModeContext.Consumer>
  )
}

const Favourite = () => {
  const array = new Array(10).fill(0)
  const [ loading, favourites, changeFavourites ] = useGetFavourites()
  return (
    <>
      <section className="flex flex-row flex-nowrap w-full h-full p-2 overflow-y-auto">
        {
          loading ? (
            array.map((_, index: number) => (
              <Skeleton.MangaCover key={index} />
            ))
          ) : null
        }

        {
          favourites.length > 0 ? (
            favourites.map((manga: Manga, index: number) => (
              <MangaCover key={index} manga={manga} />
            ))
          ) : (
            <NoFavourite/>
          )
        }
      </section>
    </>
  )
}

export default Favourite