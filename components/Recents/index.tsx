import { useGetRecents } from "../../hooks/getRecentsManga"
import { type RecentType } from '../utils/Manga'


const processRecents = (recents: RecentType[]): Map<string, RecentType[]> => {
  const result: Map<string, RecentType[]> = new Map()

  for (const item of recents) {
  }

  return result
}

const Recents = () => {
  const recents = useGetRecents()

  return(
    <div>

    </div>
  )
}

export default Recents