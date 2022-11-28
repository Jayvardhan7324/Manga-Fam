import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Manga from '../components/utils/Manga'

type ReturnType = {
  loading: boolean,
  error: boolean,
  manga: any,
  chapters: any,
}

const useGetMangaAndChapters = (): ReturnType => {

  const router = useRouter()
  const [loading, changeLoading] = useState<boolean>(true)
  const [error, changeError] = useState<boolean>(false)
  const [manga, changeManga] = useState(null)
  const [chapters, changeChapters] = useState(null)

  const { id } = router.query

  useEffect(() => {
    const mangaID = Array.isArray(id) ? id[0] : id
  
    if (mangaID) {

      // change loading to true
      changeLoading(true)
      // change error to false
      changeError(false)

      Manga.getMangaAndChapters(mangaID)
        .then(res => {
          const { manga, chapters } = res

          if (manga && chapters) {
            if (manga.result === "ok" && chapters.result === "ok") {
              changeManga(manga.data)
              changeChapters(chapters.volumes)
            }
          }

          changeLoading(false)
        })
        .catch(error => {
          console.error("Error in \"getMangaAndChapters\" hook", error)
        })

      // change loading to false
      changeLoading(false)
    }
  }, [id])

  return { loading, error, manga, chapters }
}


export { useGetMangaAndChapters }