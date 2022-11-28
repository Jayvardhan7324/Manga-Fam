import { useEffect, type FC } from 'react'
import classname from 'classnames'
import Link from 'next/link'
import { ModeContext } from '../../hooks/theme_provider'
import { type RecentType, type Manga } from '../utils/Manga'
import { useGetFavourites } from '../../hooks/getFavourites'
import { useGetRecents } from '../../hooks/getRecentsManga'
import Cover from '../Cover'

interface FavouriteItemType {
  manga: Manga,
}

const MANGADEX_URL = "https://uploads.mangadex.org"

const FavouriteItem: FC<{ manga: any }> = ({ manga }) => {

  const { id, attributes, relationships } = manga
  const { title , status } = attributes
  
  const cover_art = relationships.find((item: any) => item.type === "cover_art")
  const author = relationships.find((item: any) => item.type === "author")

  const filename = cover_art ? cover_art.attributes.fileName : ""
  const author_name = author ? author.attributes.name : ""
  
  const low_cover = `${MANGADEX_URL}/covers/${id}/${filename}.256.jpg`
  const high_cover = `${MANGADEX_URL}/covers/${id}/${filename}.512.jpg`

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <Link href={`/manga/${id}`} className="h-min">
            <div className={classname(
              "flex flex-col flex-nowrap p-2 rounded-lg md:m-1 favourite_item",
              theme === "LIGHT" ? "text-secondary_black" : "text-d9-white",
              theme === "LIGHT" ? "hover:bg-secondary_white" : "hover:bg-secondary_black"
            )} 
          >
            <div className="rounded-lg overflow-hidden flex-shrink-1 lg:flex-shrink-0 h-full">
              <Cover low={low_cover} high={high_cover} />
            </div>
      
            <div className="h-auto text-ellipsis flex-shrink-0">
              <span className="h-8 md:h-10 lg:h-auto w-30 block break-words text-xs md:text-sm text-ellipsis overflow-hidden font-semibold">{title.en}</span>
            </div>
          </div>
        </Link>
      )}
    </ModeContext.Consumer>
  )
}


const FavouritesContainer = () => {
  const favourites = useGetFavourites()
  const recents = useGetRecents()

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <section className="w-full flex-shrink-0">

          <div className={classname(
            "w-full flex flex-row flex-nowrap items-center justify-between flex-shrink-0 p-2 border-b border-solid",
            theme === "LIGHT" ? "border-primary-color" : "border-custom-gray"
          )}>
            <h2 className={classname(
              "font-bold text-lg",
              theme === "LIGHT" ? 
                "text-primary-color" 
                : "text-custom-gray"
            )}>
              Favourites
            </h2>

            <span className="text-xs md:text-sm text-custom-gray">
              Showing {favourites.length} Manga
            </span>
          </div>

          { favourites && favourites.length > 0 ? (
            <div className="flex flex-row flex-wrap w-full h-auto">
             { 
              favourites.map((item: Manga, index: number) => {

                return <FavouriteItem key={index} manga={item} />
              })}
            </div>
          ) : (
            <div className="flex-shrink-0 h-full flex flex-row flex-nowrap items-center justify-center w-full">
              <span className={classname(
                "text-lg text-custom-gray",
              )}>No favourites..!</span>
            </div>
          )}
        </section>
      )}
    </ModeContext.Consumer>
  )
}

export default FavouritesContainer