import classname from 'classnames'
import { useSelector } from 'react-redux'


const ShownManga = ({ theme }: { theme: "LIGHT" | "DARK" }) => {
  const [total, mangas] = useSelector((state: any) => [state.manga.total, state.manga.mangas]);
  const shown = mangas.length
  return (
    <span className={classname("text-xs hidden md:inline-block text-custom-gray ml-auto px-2")}>
      Showing {shown} of {total} mangas
    </span>
  )
}

export default ShownManga
