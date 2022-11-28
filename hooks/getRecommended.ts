import { useState, useEffect } from 'react'
import Manga from '../components/utils/Manga'

const useGetRecommended = (manga: Manga): [boolean, boolean, Manga[]] => {
  const [loading, changeLoading] = useState<boolean>(true)
  const [error, changeError] = useState<boolean>(false)
  const [mangas, changeMangas] = useState([])

  useEffect(() => {
    // change the loading state to true
    changeLoading(true)
    // change the error state to false
    changeError(false)

    Manga.getRecommendedMangas(manga)
      .then((res: any) => {
        if (res.result === "ok") {
          const { data } = res

          if (data) {
            changeMangas(data)
          }
        }
      })
      .catch(error => {
        console.error(error)
        // change the error state to true
        changeError(true)
        // change the loading state to false
        changeLoading(false)
      })

      changeLoading(false)
  }, [])  

  return [loading, error, mangas]
}

export { useGetRecommended }