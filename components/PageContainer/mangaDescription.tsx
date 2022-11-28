import { type FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import classname from 'classnames'
import Cover from '../Cover'
import { type Manga } from '../utils/Manga'
import { ModeContext } from '../../hooks/theme_provider'

interface MangaDescriptionType {
  manga: Manga
}

const MANGADEX_URL = "https://uploads.mangadex.org"


const getDescription = (description: Record<string, string>): string => {
  if (description && description.en) {
    return description.en
  } else {
    return description ? Object.values(description)[0] : "No description available"
  }
}


const MangaDescription: FC<MangaDescriptionType> = ({ manga }) => {
  const router = useRouter()
  const { vol, chapter } = router.query

  const { id, attributes, relationships } = manga
  const { title, status, updatedAt, description } = attributes

  const updateDate = updatedAt ? 
    `${new Date(updatedAt).getDate()}/${new Date(updatedAt).getMonth()}/${new Date(updatedAt).getFullYear()}`
    : "-- : --"

  const author = relationships.find(item => item.type === "author")
  const cover_art = relationships.find(item => item.type === "cover_art")

  const filename = cover_art ? cover_art.attributes.fileName : ""
  const low_cover = `${MANGADEX_URL}/covers/${id}/${filename}.256.jpg`
  const high_cover = `${MANGADEX_URL}/covers/${id}/${filename}.512.jpg`

  const author_name = author ? author.attributes.name : ""

  return (
    <>
      <Head>
        <title>{`${title.en} Vol.${vol} Ch.${chapter}`}</title>
        <meta name="description" content={description.en} />
        <meta name="keywords" content={`${title.en}, Vol ${vol}, Chapter ${chapter}`}/>
        <meta property="og:title" content={title.en} />
        <meta property="og:description" content={description.en} />
        <meta property="og:url" content={""} />
      </Head>

      <ModeContext.Consumer>
        {({ theme }) => (
          <div className="flex flex-col flex-nowrap p-1">
            <div className="rounded-lg overflow-hidden m-1">
              <Cover low={low_cover} high={high_cover} />
            </div>
      
            <span className={classname(
              "flex-shrink-0 w-full text-lg break-words m-1",
              theme === "LIGHT" ? "text-primary-color" : "text-secondary_white"
            )}>{title.en}</span>
      
            <div className="flex flex-row items-center w-full text-sm m-1">
              <span className={classname(
                "text-custom-gray"
              )}>{author_name}</span>
              <span className={classname(
                "rounded-lg ml-10 px-2 py-1",
                theme === "LIGHT" ? 
                  "bg-d9-white text-primary-color" : 
                  "bg-secondary_black text-d9-white"
              )}>{status}</span>
            </div>
      
            <span className={classname(
              "flex-shrink-0 m-1 w-full",
              theme === "LIGHT" ? "text-4b-black" : "text-d9-white",
            )}>Last updated: {updateDate}</span>

            <span className={classname(
              "flex-shrink-0 m-1 w-full text-custom-gray",
            )}>
              {getDescription(description)}
            </span>
          </div>
        )}
      </ModeContext.Consumer>
    </>
  )
}

export default MangaDescription