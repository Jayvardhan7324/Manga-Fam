import { useRef, useEffect, useState } from 'react'
import Pages from '../Pages'
import Sidebar from './Sidebar'
import FAB from './FAB'
import { useGetMangaAndChapters } from "../../hooks/getMangaAndChapters"
import { useUpdateRecent } from '../../hooks/updateRecents'
import { useGetPages } from '../../hooks/getPages'

const PageContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)

  const [active, changeActive] = useState<number>(0)
  const [lockScroll, toggleLock] = useState<boolean>(false)

  const { loading, error, manga, chapters } = useGetMangaAndChapters()
  const result = useGetPages(chapters)

  const chapter = result ? result.chapter : null
  const data = chapter ? chapter.data : []

  // change the active page with slider
  const changeActivePage = (page: number) => {
    if (page > 0 && page <= data.length) changeActive(page)
  }

  useEffect(() => {
    const scrollOnActiveChange = () => {
      if (containerRef.current && pageRef.current) {
        const container = containerRef.current
        const pageContainer = pageRef.current

        const children = pageContainer.children

        for (let i = 0; i < children.length; i ++) {
          const child = children[i] as HTMLElement
          const rect = child.getBoundingClientRect()
          
          if (!(rect.y <= 0 && rect.y + rect.height > 0)) {
            const index = child.dataset['index'] ? parseInt(child.dataset['index']) : 0
            
            if (!isNaN(index) && active === index) {
              // lock the scroll
              toggleLock(true)

              container.scrollTo({
                top: rect.top + container.scrollTop,
              })

              // unlock the scroll
              toggleLock(false)
            }
          }
        }
      }
    }

    scrollOnActiveChange()
  }, [active])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && pageRef.current && !lockScroll) {
        const pageContainer = pageRef.current

        const children = pageContainer.children

        for (let i = 0; i < children.length; i ++) {
          const child = children[i] as HTMLElement
          const rect = child.getBoundingClientRect()

          if (rect.y <= 0 && rect.y + rect.height > 0) {
            const index = child.dataset['index'] ? parseInt(child.dataset['index']) : 0

            // change the active Page
            if (!isNaN(index) && active !== index) changeActive(index)
          }
        }
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll, true)
    }

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll, true)
    }
  }, [containerRef])

  useUpdateRecent(manga, chapters)

  return (
    <div ref={containerRef} className="w-full h-full flex flex-row flex-nowrap main_wrapper">
      {manga && chapters && result ? <Pages {...{ chapters, manga, result }} ref={pageRef} /> : null}
      <Sidebar
        {...{ loading, manga, chapters }}
      />
      <FAB
        manga={manga}
        chapters={chapters}
        total={data.length}
        active={active}
        changeActive={changeActivePage}
      />
    </div>
  )
}

export default PageContainer