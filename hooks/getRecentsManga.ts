import { useState, useEffect } from 'react'
import Manga from '../components/utils/Manga'
import { Recent, type RecentType } from '../components/utils/Manga'

const useGetRecents = () => {
  const [recents, changeRecents] = useState([])
  const offset = 0
  const limit = 10

  const getRecentMangasIds = (): string[] => {
    const stored_recent = Recent.getAll()

    const ids: string[] = []

    for (let i = offset; i < offset + limit; i ++) {
      if (stored_recent[i] === undefined) return ids

      if (stored_recent[i].id) ids.push(stored_recent[i].id)
    }

    return ids
  }

  const getMangas = async (ids: string[]): Promise<Manga[]> => {

    if (ids.length === 0) return []

    const response = await Manga.getMangasByIds(ids)
      .catch(err => console.error(err))

    if (response) return response

    return []
  }

  useEffect(() => {
    const ids = getRecentMangasIds()

    getMangas(ids)
      .then((res: any) => {
        if (res.result === "ok") {
          changeRecents(res.data)
        }
      })

  }, [])

  return recents
}

export { useGetRecents }