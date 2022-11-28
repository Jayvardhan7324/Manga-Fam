import { type FC } from 'react'
import classname from 'classnames'
import Link from 'next/link'
import { ModeContext } from '../../hooks/theme_provider'
import { useGetRecents } from '../../hooks/getRecentsManga'
import { useGetStoredRecentData } from '../../hooks/getRecents'
import Cover from '../Cover'
import Manga, { type RecentType } from '../utils/Manga'

const MANGADEX_URL = "https://uploads.mangadex.org"

const sortTimeMap = () => {
  const one_day_ms = 1000 * 60 * 60 * 60 * 24 * 1
  const yesterday_ms = one_day_ms * 2
  const two_day_ms = one_day_ms * 3
  const three_day_ms = one_day_ms * 4
  const four_day_ms = one_day_ms * 5

  const date: Date = new Date()

  const { hour, minutes, seconds } = 
    { 
      hour: date.getHours(), 
      minutes: date.getMinutes(), 
      seconds: date.getSeconds() 
    }

  const total_ms = (hour * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000)
  const timeTillMidnight = date.getTime() - total_ms
  
  const eventMap = {
    "Today": date.getTime() - total_ms,
    "Yesterday": date.getTime() - (total_ms + yesterday_ms),
    "2 Days Ago": date.getTime() - (total_ms + two_day_ms),
    "3 Days Ago": date.getTime() - (total_ms + three_day_ms),
    "A While Ago": date.getTime() - (total_ms + four_day_ms),
  }

  return eventMap
}

const sortRecents = (recents: any) => {
  const manga_By_time: Record<string, any[]> = {
    "Today": [],
    "Yesterday": [],
    "2 Days Ago": [],
    "3 Days Ago": [],
    "A While Ago": [],
  }

  const timeMap = sortTimeMap()

  for (const item of recents) {
    const { lastRead } = item

    if (lastRead > timeMap["Today"]) manga_By_time["Today"].push(item)
    else if (lastRead < timeMap["Today"] && lastRead > timeMap["Yesterday"]) manga_By_time["Yesterday"].push(item)
    else if (lastRead < timeMap["Yesterday"] && lastRead > timeMap["2 Days Ago"]) manga_By_time["2 Days Ago"].push(item)
    else if (lastRead < timeMap["2 Days Ago"] && lastRead > timeMap["3 Days Ago"]) manga_By_time["3 Days Ago"].push(item)
    else manga_By_time["A While Ago"].push(item)
  }

  return manga_By_time
}



const RecentItem: FC<{ manga: any }> = ({ manga }) => {

  const { id, attributes, relationships } = manga
  const { title , status, updatedAt } = attributes
  
  const cover_art = relationships.find((item: any) => item.type === "cover_art")
  const author = relationships.find((item: any) => item.type === "author")

  const filename = cover_art ? cover_art.attributes.fileName : ""
  const author_name = author ? author.attributes.name : ""
  
  const low_cover = `${MANGADEX_URL}/covers/${id}/${filename}.256.jpg`
  const high_cover = `${MANGADEX_URL}/covers/${id}/${filename}.512.jpg`

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <Link href={`/manga/${id}`}>
            <div className={classname(
              "flex flex-row flex-nowrap p-2 rounded-lg recent_item md:m-2",
              theme === "LIGHT" ? "text-secondary_black" : "text-d9-white",
              theme === "LIGHT" ? "hover:bg-secondary_white" : "hover:bg-secondary_black"
            )} 
          >
            <div className="rounded-lg overflow-hidden h-full flex-shrink-0">
              <Cover low={low_cover} high={high_cover} />
            </div>
      
            <div className="flex flex-col flex-nowrap ml-2">
              <span className="text-sm font-semibold">{title.en}</span>
              
              <div className={classname(
                "w-min-0 flex-shrink-0 text-custom-gray flex flex-row flex-nowrap items-center my-2"
              )}>
                <span>{author_name}</span>
                <span className={classname(
                  "ml-4 px-2 py-1 rounded-md bg-custom-gray text-d9-white"
                )}>{status}</span>
              </div>

              <span>
                Updated at {`${new Date(updatedAt).getDate()}/${new Date(updatedAt).getMonth()}/${new Date(updatedAt).getFullYear()}`}
              </span>
      
            </div>
          </div>
        </Link>
      )}
    </ModeContext.Consumer>
  )
}

const RecentTimeHeading: FC<{heading: string, mangas: Manga[]}> = ({ heading, mangas }) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
          <>
          <h2 className={classname(
            "text-lg font-semibold m-2",
            theme === "LIGHT" ? "text-secondary_black" : "text-d9-white",
          )}>{heading}</h2>
          <div className="flex flex-col flex-wrap m-1 md:flex-row" >
            {mangas.map((manga: Manga, index: number) => (
              <RecentItem manga={manga} key={index} />
            ))}
          </div>
        </>
      )}
    </ModeContext.Consumer>
  )
}


const RecentContainer = () => {
  const mangas = useGetRecents()
  const recents = useGetStoredRecentData()

  const sorted_recents = sortRecents(recents) 

  const get_filtered_mangas = (result: any[], mangas: Manga[]): Manga[] => {
    const filtered_mangas = mangas.filter((manga: Manga) => {
      if (result.find(item => item.id === manga.id)) return manga
    })

    return filtered_mangas
  }

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <section className="flex flex-col flex-nowrap w-full h-full">
          <div className={classname(
            "w-full p-2 h-min text-lg font-bold border-b border-solid",
            theme === "LIGHT" ? "text-primary-color" : "text-custom-gray",
            theme === "LIGHT" ? "border-primary-color" : "border-custom-gray"
          )}>
            <h2 className="text-inherit">
              Recents
            </h2>
          </div>

          <>
            {Object.keys(sorted_recents).map((key: string, index: number) => {
              const result: any[] = sorted_recents[key]

              const filtered_mangas = get_filtered_mangas(result, mangas)

              return result.length > 0 ? <RecentTimeHeading heading={key} mangas={filtered_mangas} key={index} /> : null
            })}
          </>
        </section>
      )}
    </ModeContext.Consumer>
  )
}

export default RecentContainer