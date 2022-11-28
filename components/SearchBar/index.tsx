import { useState, useRef } from 'react'
import { ModeContext } from '../../hooks/theme_provider'
import Filter from './Filter'
import Search from './Search'
import ShownManga from './ShownManga'
import SearchResults from './SearchResults'
import { useGetSearchResults } from '../../hooks/getSearchResults'

const SearchBar = () => {

  const searchContainerRef = useRef<HTMLDivElement | null>(null)

  const [searchText, changeSearchText] = useState<string>("")
  const [loading, results] = useGetSearchResults(searchText)

  return (
    <ModeContext.Consumer>
      {({theme}) => (
        <section 
          style={{ backgroundColor: "var(--primary-bg-color)" }}
          className="flex-shrink-0 flex flex-row flex-nowrap items-center p-1 w-full h-auto relative"
        >
          <Filter { ...{ theme }} />
          <Search { ...{ theme, changeSearchText }} ref={searchContainerRef} />
          <ShownManga { ...{ theme }} />

          { searchText !== "" ? (
            <SearchResults {...{ loading, results, theme, changeSearchText }} />
          ) : null}
        </section>
      )}
    </ModeContext.Consumer>
  )
}

export default SearchBar