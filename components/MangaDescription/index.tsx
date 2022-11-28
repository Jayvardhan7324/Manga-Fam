import { useGetMangaAndChapters } from '../../hooks/getMangaAndChapters'
import Manga from '../Manga'
import Chapters from '../Chapters'
import { usePopulateFavourites } from '../../hooks/populateFavourites'
import { useGetRecentData } from '../../hooks/getRecentDate'


const MangaDescription = () => {
  const { loading, error, manga, chapters } = useGetMangaAndChapters()

  // populate favourites in redux store
  usePopulateFavourites()

  // get recent data from the local storage
  const recent = useGetRecentData(manga)
  return (
    <>
      <div className="flex flex-col flex-nowrap lg:flex-row md:flex-nowrap h-full w-full">
        <Manga {...{ loading, recentData: recent, manga }} />
        
        <div className="lg:w-80 flex-shrink-0 ml-2 px-1">
          <Chapters {...{ chapters, recentData: recent, loading }} />
        </div>
      </div>
    </>
  )
}

export default MangaDescription