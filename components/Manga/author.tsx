import { type FC } from 'react'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'

type AuthorType = {
  loading: boolean,
  author_name: string,
  status: string,
  publicationDemographic: string,
  contentRating: string,
}

const array = new Array(3).fill(0)

const Author: FC<AuthorType> = ({ loading, author_name, status, publicationDemographic, contentRating }) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        loading ? (
          <div>
            {
              array.map((_, index: number) => (
                <span key={index} className="w-5 h-3 skeleton"></span>
              ))
            }
          </div>
        ) : (
          <div 
            className="flex flex-row flex-wrap md:flex-nowrap items-center my-2"
            style={{ minWidth: "300px" }}
          >
            <span
              className={ classname("text-lg mr-2", theme === "DARK" ? "text-secondary_white" : "text-4B-black") }
            >
              {author_name}
            </span>

            <div className="flex flex-row flex-wrap my-2 md:my-0 md:flex-nowrap items-center">
              {
                [status, publicationDemographic, contentRating].map((value: string, index: number) => (
                  value ? (
                    <span
                      key={index}
                      className={classname(
                        "px-2 py-1 text-sm rounded-xl mx-2",
                        theme === "LIGHT" ? "text-primary-color" : "text-d9-white",
                        theme === "LIGHT" ? "bg-d9-white" : "bg-4B-black",
                      )}
                    >
                      {value}
                    </span>
                  ) : null
                ))
              }
            </div>
          </div>
        )
      )}
    </ModeContext.Consumer>
  )
}

export default Author
