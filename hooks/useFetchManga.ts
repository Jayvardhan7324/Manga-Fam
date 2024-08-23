import { useState, useEffect, type RefObject } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { refreshManga } from '../redux/action/action'
import { addManga, updateManga } from '../redux/action/manga_action'
import { pushMangas } from '../components/utils/pushMangas'
import Manga from '../components/utils/Manga'

const processOptions = (options: Record<string, boolean>): string[] => {
  const selected_options: string[] = []

  // Iterate the options, and push the key in the array 
  Object.keys(options).forEach((key: string) => {
    if ((options as any)[key]) selected_options.push(key)
  })

  return selected_options
}

const getMangas = (state: any) => state.manga.mangas

const filters = (state: any) => ({
  publication: state.main.publication,
  status: state.main.status,
  tags: { ...state.main.genre, ...state.main.theme },
  contentRating: state.main.contentRating,
})

const useGetMangas = () => {
  const dispatch = useDispatch()
  const [loading, changeLoading] = useState<boolean>(false)
  const [error, changeError] = useState<boolean>(false)
  
  const mangas = useSelector(getMangas)
  const options = useSelector(filters)
  const refresh = useSelector((state: any) => state.main.refresh)

  useEffect(() => {
    if (!refresh) return

    const opt = {
      publication: processOptions(options.publication),
      contentRating: processOptions(options.contentRating),
      status: processOptions(options.status),
      tags: processOptions(options.tags),
    }

    // set the loading state to true
    changeLoading(true)
    changeError(false)

    Manga.fetchMangas(0, opt)
      .then(response => {
        if (response.result === "ok") {
          const { total, data } = response 

          // dispatch the data to the store
          dispatch(updateManga(total, data))
        }

        // change the loading status to false
        changeLoading(false)
        
        // change the loading status to false
        changeError(false)
      })
      .catch(error => {
        // console.error(error)
        changeLoading(false)
        changeError(true)
      })

      // Refresh the manga
      refresh && dispatch(refreshManga())

  }, [dispatch, refresh])

  return {
    loading,
    error,
    mangas,
  }
}


const useFetchMangas = (container: RefObject<HTMLElement>) => {
  const dispatch = useDispatch()
  const [fetchingMore, changeFetchingMore] = useState<boolean>(false)

  const mangas = useSelector(getMangas)
  const options = useSelector(filters)

  useEffect(() => {
    if (fetchingMore) {
      const opt = {
        publication: processOptions(options.publication),
        status: processOptions(options.status),
        contentRating: processOptions(options.contentRating),
        tags: processOptions(options.tags),
      }
  
      Manga.fetchMangas(mangas.length, opt)
        .then((response) => {
          if (response.result === "ok") {
            const { total, data } = response

            // filter mangas
            const new_mangas = pushMangas(mangas, data)
  
            // dispatch the data to the store
            dispatch(addManga(total, new_mangas))
          }
  
          // change the fetching more to false
          changeFetchingMore(false)
        })
        .catch(err => { changeFetchingMore(false) })
    }
  }, [fetchingMore])
  
  useEffect(() => {
    const scrollHandler = (event: any) => {
      const target = event.target

      if (container && container.current) {
        const rect = container.current?.getBoundingClientRect()

        if ((rect.y - 100) <= window.innerHeight) {
          changeFetchingMore(true)
        }
      }
    }

    window.addEventListener("scroll", scrollHandler, true)

    return () => {
      window.removeEventListener("scroll", scrollHandler, true)
    }
  }, [container.current])

  return fetchingMore
}

export { useGetMangas, useFetchMangas }
