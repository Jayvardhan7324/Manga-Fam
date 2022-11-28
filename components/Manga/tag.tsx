import { type FC } from 'react'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'

type TagsProps = {
  loading: boolean,
  tags: string[]
}

const array = new Array(5).fill(0)

const Tags: FC<TagsProps> = ({ loading, tags }) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          {loading ? (
            <div className="flex flex-row flex-wrap">
              {
                array.map((_, index: number) => (
                  <span key={index} className="skeleton w-3 h-5 rounded-md"></span>
                ))
              }
            </div>
          ) : (
            <div className="my-2 flex flex-row flex-wrap">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className={classname(
                    "rounded-md py-1 px-2 m-1 text-sm whitespace-nowrap",
                    theme === "LIGHT" ? "text-primary-color" : "text-d9-white",
                    theme === "LIGHT" ? "bg-d9-white" : "bg-custom-gray",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </ModeContext.Consumer>
  )
}

export default Tags