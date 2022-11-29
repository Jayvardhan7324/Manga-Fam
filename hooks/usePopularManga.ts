import { useState, useEffect } from 'react'
import Manga from '../components/utils/Manga'
import * as type from '../components/utils/Manga'



/**
 * @desc Fetch the mangas from the JIKAN API
 * @returns {Promise<Record<string, any>>}
 */
const fetchPopularManga = async (): Promise<Record<string, any>> => {
  const response = await fetch('/popular')
  
  if (response && response.status !== 200) throw new Error("Response is not valid")

  const json = await response.json()

  return json
}

/**
 * @desc Get the title from the response recieved from the JIKAN API
 * @param result {Record<string, any>} Response received from the jikan api
 * @returns {string[]}
 */
const getPopularMangaTitles = (result: Record<string, any>): string[] => {
  const { data } = result
  const titleList: string[] = []

  let count = 0

  for (const item of data) {
    const { titles } = item

    const obj = titles.find((item: any) => item.type === "Default")

    titleList.push(obj.title)

    // break if the count reaches 5
    if (count > 4) break

    // increase the count
    ++ count
  }

  return titleList
}

/**
 * 
 * @param titles {string[]} list of manga titles
 * @returns {Promise<Manga[]>}
 */
const fetchMangas = async (titles: string[]): Promise<Manga[]> => {

  const responses = await 
    Promise.all(titles.map((title: string) => Manga.searchMangas(title, 0, 1)))

  if (responses.length === 0) throw new Error("Cannot fetch mangas")

  const mangas: type.Manga[] = []

  responses.forEach((response: any) => {
    const { data } = response

    if (data.length > 0) mangas.push(data[0])
  })

  return mangas
}


/**
 * @desc React hook to get Popular mangas
 * @returns {[boolean, boolean, Manga[]]}
 */
const usePopularManga = (): [boolean, boolean, Manga[]] => {
  const [loading, changeLoadingStatus] = useState<boolean>(false)
  const[error, changeErrorStatus] = useState<boolean>(false)
  const [_mangas, changeMangas] = useState<Manga[]>([])

  const getMangas = async () => {
    const titles = await fetchPopularManga()
      .then(res => getPopularMangaTitles(res))
      .catch(err => console.error(err))

    if (!titles) throw new Error("Cannot get title")

    const result = await fetchMangas(titles)
      .catch(err => console.error(err))

    if (!result) throw new Error("Cannot get all mangas")

    return result
  }

  useEffect(() => {

    // change the loading status
    changeLoadingStatus(true)
    changeErrorStatus(false)

    getMangas()
      .then(res => {
        // reset the loading status
        changeLoadingStatus(false)

        // change the mangas
        changeMangas(res)
      })
      .catch(err => {
        changeErrorStatus(true)
        changeLoadingStatus(false)
      })

  }, [])

  return [loading, error, _mangas]
}

export { usePopularManga }