import { useMemo, memo } from 'react'
import classname from 'classnames'
import type { FC } from 'react'
import Link from 'next/link'
import { ModeContext } from '../../hooks/theme_provider'
import Cover from '../Cover'
import type { Manga } from '../utils/Manga'

interface MangaCoverProps {
  manga: Manga
}

const get_altTitle = (altTitle: Record<string, string>[]) => {
  for (const alt of altTitle) {
    const values = Object.values(alt)

    if (values.length > 0) return values[0]
  }
}

const MANGADEX_UPLOADS_URL = "https://uploads.mangadex.org/covers/"

const MangaCover: FC<MangaCoverProps> = ({ manga }) => {
  const { id, attributes, relationships } = manga
  const { title, altTitles } = attributes

  const _title = title.en ?? get_altTitle(altTitles)

  const { name } = useMemo(() => {
    const author = relationships.find(item => item.type === "author")
    const name = author?.attributes.name || ""

    return { name }
  }, [relationships])


  const { low_cover, high_cover } = useMemo(() => {
    const cover_art = relationships.find(item => item.type === "cover_art")

    if (!cover_art) return { low_cover: "", high_cover: "" }

    const filename = cover_art.attributes.fileName

    const low_cover = filename ? `${MANGADEX_UPLOADS_URL}${id}/${filename}.256.jpg` : ""
    const high_cover = filename ? `${MANGADEX_UPLOADS_URL}${id}/${filename}.512.jpg` : ""

    return { low_cover, high_cover }
  }, [relationships, id])


  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div 
          className={classname(
            "flex-grow flex flex-col flex-nowrap manga-element p-2 rounded-lg",
            theme === "LIGHT" ? "hover:bg-d9-white" : "hover:bg-secondary_black"
          )} 
          title={_title}

        >
          <Link className="w-full" href={`/manga/${id}`}>
            <div style={{ aspectRatio: 0.8 }} className="rounded-md manga-card overflow-hidden">
              <Cover low={low_cover} high={high_cover} />
            </div>
          </Link>

          <span 
            className={classname(
              "text-ellipsis flex flex-row flex-nowrap mt-1 break-words min-w-0 max-w-[180px] font-bold max-h-10 h-min overflow-hidden",
              theme === "LIGHT" ? "text-black" : "text-d9-white"
            )}
          >
            <Link
              href={`/manga/${id}`}
              className="min-w-0 text-ellipsis break-words manga_text"
            >
                {_title}
            </Link>
          </span>

          <span
            className={classname(
              "text-custom-gray"
            )}
          >
            {name}
          </span>
        </div>
      )}
    </ModeContext.Consumer>
  )
}

export default memo( MangaCover )
