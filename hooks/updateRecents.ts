import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { type Manga, Recent } from '../components/utils/Manga'

const useUpdateRecent = (manga: Manga, chapters: any) => {
  const router = useRouter()

  const { id, vol, chapter } = router.query

  useEffect(() => {
    if (manga && chapters) {
      let chapterID: string | null = null

      Object.values(chapters).forEach((item: any) => {
        if (item.volume === vol) {
          Object.values(item.chapters).forEach((value: any) => {
            if (value.chapter === chapter) chapterID = value.id
          })
        }
      })

      if (chapterID) Recent.updateManga(manga, chapterID)
    }
  }, [id, vol, chapter, manga, chapters])
}

export { useUpdateRecent }