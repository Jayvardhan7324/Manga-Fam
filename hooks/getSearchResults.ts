import { useState, useEffect } from 'react'
import Manga from '../components/utils/Manga'

const useGetSearchResults = (searchText: string): [boolean, Manga[]] => {
  const [loading, changeLoading] = useState<boolean>(false)
  const [results, changeResults] = useState<Manga[]>([])

  useEffect(() => {
    changeLoading(true)

    Manga.searchMangas(searchText)
      .then(res => {
        if (res.result === "ok") {
          const { data } = res

          if (data) changeResults(data)
        }

        changeLoading(false)
      })
      .catch(error => {
        // change the loading status
        changeLoading(false)

        console.error(error)
      })
  }, [searchText])

  return [loading, results]
}

export { useGetSearchResults }