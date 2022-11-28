import { createContext, useState } from 'react'

type MangaContextType = {
  total: number,
  shown: number,
  updateShown: (total: number, shown: number) => void,
}

const initial_value = {
  total: 0,
  shown: 0,
  updateShown: () => {},
}

const MangaContext = createContext<MangaContextType>(initial_value)

const useShownManga = () => {
  const [mangas, changeMangas] = useState<{ total: number, shown: number }>({ total: 0, shown: 0 })

  const updateMangas = (total: number, shown: number) => { changeMangas({ total, shown }) }

  return [mangas, updateMangas]
}

export { MangaContext, useShownManga }