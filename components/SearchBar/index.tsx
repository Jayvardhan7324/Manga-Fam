import { useState, useRef, useEffect } from 'react'
import { ModeContext } from '../../hooks/theme_provider'
import Filter from './Filter'
import Search from './Search'
import ShownManga from './ShownManga'
import SearchResults from './SearchResults'
import { useGetSearchResults } from '../../hooks/getSearchResults'

const SearchBar = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const [searchText, changeSearchText] = useState<string>("")
  const [inputIsFocused, changeFocus] = useState<boolean>(false)
  const [loading, results] = useGetSearchResults(searchText)

  useEffect(() => {
    const searchInput = searchInputRef.current

    const onInputFocused = () => {
      changeFocus(true)
    }

    const onInputBlur = () => {
      changeFocus(false)
    }

    if (searchInput) {
      searchInput.addEventListener("focus", onInputFocused, false);
      searchInput.addEventListener("blur", onInputBlur, false);
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener("focus", onInputFocused, false);
        searchInput.removeEventListener("blur", onInputBlur, false);
      }
    }

  }, [])

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <section
          style={{ backgroundColor: "var(--primary-bg-color)" }}
          className="flex-shrink-0 flex flex-row flex-nowrap items-center p-1 w-full h-auto relative"
        >
          <Filter {...{ theme }} />
          <Search {...{ theme, changeSearchText }} ref={searchInputRef} />
          <ShownManga {...{ theme }} />

          {searchText !== "" && inputIsFocused ? (
            <SearchResults 
              {...{ loading, results, theme, changeSearchText }} 
            />
          ) : null}
        </section>
      )}
    </ModeContext.Consumer>
  )
}

export default SearchBar
