import { useRef } from "react";
import Slider from '../Slider'
import Banner from '../Banner'
import MangaCover from "../MangaCover";
import * as Skeleton from '../Skeleton'
import Tags from '../Tags'
import { ModeContext } from '../../hooks/theme_provider'
import { useFetchMangas, useGetMangas } from "../../hooks/useFetchManga";


const Container = () => {
  const array = new Array(10).fill(0)

  const container = useRef<HTMLDivElement>(null)

  const { loading, error, mangas } = useGetMangas()
  const fetchingMore = useFetchMangas(container)

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div className="relative w-full overflow-y-auto" style={{ backgroundColor: "var(--primary-bg-color)"}}>

          {/* Banner */}
          <Banner/>

          <Tags { ...{ theme }} />
          <main className="manga__container py-2">
    
            {loading ? (
              array.map((_, index) => (
                <Skeleton.MangaCover key={index} />
              ))
            ) : null}
    
            {mangas.length > 0 ? (
              mangas.map((manga: any, index: any) => {
                const { id } = manga
    
                return <MangaCover key={id} manga={manga}/>
              })
            ) : null }
    
            {fetchingMore && (
              array.map((_, index) => (
                <Skeleton.MangaCover key={index} />
              ))
            )}
          </main>
    
          <span role="bottom indicator" ref={container}></span>
        </div>
      )}
    </ModeContext.Consumer>
  )
}

export default Container
