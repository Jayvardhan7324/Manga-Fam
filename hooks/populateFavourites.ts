import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateFavourite } from '../redux/action/manga_action'
import Manga from '../components/utils/Manga'

const usePopulateFavourites = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const favourites = Manga.getFavouriteMangas()
    dispatch(updateFavourite(favourites))
  }, [])
}

export { usePopulateFavourites }