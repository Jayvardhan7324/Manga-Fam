import { useState, useEffect } from 'react'
import { Recent } from '../components/utils/Manga'

const useGetStoredRecentData = () => {
  const [recents, changeRecents] = useState([])

  useEffect(() => {
    const result = Recent.getAll()

    changeRecents(result)
  }, [])

  return recents
}

export { useGetStoredRecentData }