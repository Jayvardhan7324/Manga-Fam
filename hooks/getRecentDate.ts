import { useEffect, useState } from 'react'
import { type Manga, Recent } from '../components/utils/Manga'

const useGetRecentData = (manga: Manga | null): null | any => {
  const [recentData, changeRecentData] = useState(null)

  useEffect(() => {
    if (manga !== null) {
      const recents = Recent.getAll()

      if (recents && recents.length > 0) {
        recents.forEach((item: any) => {
          if (item.id === manga.id) changeRecentData(item)
        })
      }
    }
  }, [manga])

  return recentData
}

export { useGetRecentData }