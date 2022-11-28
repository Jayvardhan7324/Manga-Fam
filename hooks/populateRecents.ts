import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateRecent } from '../redux/action/manga_action'
import { Recent } from '../components/utils/Manga'

const usePopulateRecent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const recents = Recent.getAll()

    dispatch(updateRecent(recents))
  }, [])
}

export { usePopulateRecent }