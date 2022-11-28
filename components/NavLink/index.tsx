import classname from 'classnames'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import Link from 'next/link'
import { ModeContext } from "../../hooks/theme_provider";
import { type Manga } from '../utils/Manga'

interface NavLinkProps {
  manga: Manga,
}

const NavLink: FC<NavLinkProps> = ({ manga }) => {
  const router = useRouter()
  const { id, attributes } = manga
  const { title } = attributes

  const volume = router.query.vol
  const chapter = router.query.chapter
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div className={classname(
          "text-xs md:text-sm flex flex-row flex-wrap md:flex-nowrap w-full my-1",
          theme === "LIGHT" ? "text-primary-color" : "text-d9-white",
        )}>
          <Link
            className="hover:underline text-inherit"
            href="/" title="home">
            Home
          </Link>

          {title ? (
            <>
            <span className="text-inherit mx-1">
              {">"}
            </span>
            <Link className="text-inherit" href={`/manga/${id}`}>
              <span style={{ maxWidth: "180px" }} className="hover:underline inline-block whitespace-nowrap text-ellipsis overflow-hidden">{title.en}</span>
            </Link>
            </>
          ) : null}

          {volume ? (
            <>
            <span className="mx-1 text-inherit">
              {">"}
            </span>
            <Link className="hover:underline text-inherit" href={`/read?vol=${volume}`}>
              vol.{volume}
            </Link>
            </>
          ) : null}

          {chapter ? (
            <>
            <span className="decoration-inherit text-inherit mx-1">{">"}</span>
            <Link className="hover:underline text-inherit" href={`/read?vol=${volume}&chapter=${chapter}`}>
              ch.{chapter}
            </Link>
            </>
          ) : null}
        </div>
      )}
    </ModeContext.Consumer>
  )
}


export default NavLink