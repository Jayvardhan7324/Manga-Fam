import { type FC } from 'react'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'


const getAnotherTitle = (title: Record<string, string>, altTitles: Record<string, string>[]): string => {
  // if english title exists
  if (title.en) return title.en

  // if English title doesn't exists
  if (Object.keys(title).length > 0) {
    for (const item of Object.values(title)) {
      return item
    }
  }

  // return a altTitle if  doesn't exists
  for (const item of altTitles) {
    if (Object.values(item).length > 0) return Object.values(item)[0]
  }

  return "No title is available"
} 


type TitleProps = {
  loading: boolean,
  title: Record<string, string>,
  altTitles: Record<string, string>[]
}

const Title: FC<TitleProps> = ({ loading, title, altTitles }) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          {loading ? (
            <div
              className={classname(
                "w-8 h-4 rounded-md skeleton"
              )}
            >
            </div>
          ) : (
            <h2 className={classname(
              "text-3xl min-w-0 break-words md:max-w-xl xl:max-w-2xl font-bold",
              theme === "LIGHT" ? "text-secondary_black" : "text-d9-white",
            )}>
              {getAnotherTitle(title, altTitles)}
            </h2>
          )}
        </>
      )}
    </ModeContext.Consumer>
  )
}

export default Title