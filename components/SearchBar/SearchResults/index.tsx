/* eslint-disable @next/next/no-img-element */
import { type FC } from 'react'
import Link from 'next/link'
import classname from 'classnames'
import Spinner from './spinner'
import { type Manga } from '../../utils/Manga'


interface SearchResultsProps {
  theme: "LIGHT" | "DARK",
  loading: boolean,
  results: Manga[],
  changeSearchText: (value: string) => void
}

const ResultItem: FC<{manga: Manga, theme: "LIGHT" | "DARK"}> = ({ manga, theme }) => {
  const { id, attributes, relationships } = manga

  const title = attributes ? attributes.title : null
  const status = attributes ? attributes.status : null

  const cover = relationships.find(item => item.type === "cover_art")
  const author = relationships.find(item => item.type === "author")

  const filename = cover ? cover.attributes.fileName : null
  const author_name = author ? author.attributes.name : null

  const cover_url = `https://uploads.mangadex.org/covers/${id}/${filename}.256.jpg`

  return (
    <Link
      title={title ? title.en : ""}
      href={`/manga/${id}`}
      className={classname(
        theme === "LIGHT" ? "hover:bg-d9-white" : "hover:bg-secondary_black",
      )}
    >
      <li className="flex flex-row flex-nowrap p-2 m-1">
        <div className="w-16 h-20 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={cover_url}
            alt=""
          />
        </div>

        <div className="flex flex-col flex-nowrap ml-3">
          <span className={classname(
            "break-words w-full overflow-hidden",
            theme === "LIGHT" ? "text-primary-color" : "text-d9-white",
          )}>{title ? title.en : "Title is unavailable"}</span>
          <span className="text-custom-gray">{author_name ? author_name : "Author is unavailable"}</span>
          <span className="my-1 px-1 py-0.5 rounded-md bg-custom-gray text-white w-min">{status ? status : "ongoing"}</span>
        </div>
      </li>
    </Link>
  )
}

const SearchResults: FC<SearchResultsProps> = ({ loading, results, theme, changeSearchText }) => {
  return (
    <div
      className={classname(
        "absolute top-full left-0 rounded-lg overflow-x-hidden overflow-y-auto z-50",
      )}
      style={{ 
        width: "min(100%, 800px)",
        backgroundColor: "var(--primary-bg-color)",
        transition: "height 0.2s ease-in-out", 
        maxHeight: "calc(100vh - 200px)" 
      }}
    >
      {loading ? (
        <div 
          className={classname(
            "flex flex-row flex-nowrap items-center justify-center p-2 h-20 flex-shrink-0",
            theme === "LIGHT" ? "fill-primary-color" : "fill-d9-white",
          )}>
          <Spinner/>
        </div>
      ) : (
        <ul className="flex flex-col flex-nowrap">
          {results.map((result: any, index: number) => (
            <ResultItem key={index} manga={result} theme={theme} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchResults