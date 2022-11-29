import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'


const getChapter = (chapters: any, vol: string, chapter: string) => {
  let ch = null

  Object.keys(chapters).forEach((volume: string) => {
    if (volume === vol) {
      const chs = chapters[volume].chapters

      ch = chs[chapter] ? chs[chapter] : Object.values(chs)[0] 
    }
  })

  return ch
}


/**
 * 
 * @param ids {string[]} Array of Unique ids of the manga
 * @returns 
 */
const getEnglishChapter = async (ids: string[]): Promise<any> => {
  const url = new URL("/chapter", window.location.origin)
  
  ids.forEach((id) => url.searchParams.append('ids[]', id))

  const response = await fetch(url).then(res => res.json()).catch(err => console.log(err))

  const { data } = response

  // iterate over the data
  for (const item of data) {
    const { attributes } = item

    if (attributes.translatedLanguage === "en") return item
  }

  return data[0]
}

/**
 * 
 * @param id {string} Unique id of the manga
 * @returns 
 */
const getSingleChapter = async (id: string): Promise<string> => {
  const url = new URL(`/chapter/${id}`, window.location.origin)

  const response = await fetch(url).then(res => res.json()).catch(err => console.log(err))

  const { data } = response

  return data
}

const fetchPages = async (id: string) => {
  const response = await fetch(`${window.location.origin}/at-home/server/${id}`)

  const json = await response.json()

  return json
}

const useGetPages = (chapters: any): any => {
  const router = useRouter()
  const [result, change] = useState(null)

  const { id, vol, chapter } = router.query

  useEffect(() => {
    // reset the result
    change(null)

    if (chapters === null) return

    const ch = getChapter(chapters, vol as string, chapter as string)

    const getPages = async (chapter: any) => {
      const ids = [chapter.id, ...chapter.others]
      const data = ids.length === 1 ? await getSingleChapter(ids[0]) : await getEnglishChapter(ids)
      
      const response = await fetchPages(data.id)
  
      return response
    }

    getPages(ch)
      .then(res => {
        if (res && res.result === "ok") change(res)
      })
      .catch(err => console.log(err))

  
  }, [id, vol, chapter, chapters])

  return result
}

export { useGetPages }