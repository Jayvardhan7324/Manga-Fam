import { type FC } from 'react'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'
import { type Manga } from '../utils/Manga'
import { useGetRecommended } from '../../hooks/getRecommended'
import MangaCover from '../MangaCover'
import * as Skeleton from '../Skeleton'


type RecommendedType = {
  manga: Manga,
  loading: boolean,
}

const Recommended: FC<RecommendedType> = ({ manga, loading }) => {
  const [mangaLoading, error, mangas] = useGetRecommended(manga)
  const array = new Array(10).fill(0)

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <h2
              className={classname(
                "text-lg font-semi-bold mt-4",
                theme === "LIGHT" ? "text-primary-color" : "text-d9-white",
              )}
            >
              You may also like
          </h2>
          <section className="flex flex-row flex-nowrap overflow-x-auto md:flex-wrap my-2">
            {loading || mangaLoading ? (
              array.map((_, index) => (
                <Skeleton.MangaCover key={index} />
              ))
            ) : (
              mangas.length > 0 ? (
                mangas.map((item, index) => (
                  <div key={index} className="max-w-[200px]">
                    <MangaCover manga={item} />
                  </div>
                ))
              ) : null
            )}
          </section>
        </>
      )}
    </ModeContext.Consumer>
  )
}

export default Recommended
