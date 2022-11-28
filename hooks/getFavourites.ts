import { useEffect, useState } from 'react'
import Manga from '../components/utils/Manga'

const useGetFavourites = (): Manga[] => {
  const [mangas, changeMangas] = useState<Manga[]>([])

  useEffect(() => {
    const favourites = Manga.getFavouriteMangas()

    changeMangas(favourites)
  }, [])

  return mangas
}

export { useGetFavourites }