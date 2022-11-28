import { type FC } from 'react'
import classname from 'classnames'
import { ModeContext } from '../../hooks/theme_provider'

type DescriptionType = {
  loading: boolean,
  description: Record<string, string> | null
}

const getDescription = (description: Record<string, string> | null) => {
  if (!description) return "No Description is available"

  if (description.en) return description.en

  return Object.values(description)[0]
}

const Description: FC<DescriptionType> = ({ loading, description }) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          {loading ?(
            <div className="skeleton w-full h-10 my-3 rounded-lg">
            </div> 
          ) : (
            <div
              role="Description wrapper"
              className={classname(
                "flex flex-col flex-nowrap my-3 mx-1 p-2 rounded-lg max-w-4xl",
                theme === "LIGHT" ? "bg-secondary_white" : "bg-4B-black",
              )}
            >
              <h3
                className={classname(
                  "text-sm",
                  theme === "LIGHT" ? "text-primary-color" : "text-white",
                )}
              >Description</h3>
              <span 
                className={classname(
                  "my-2 break-words",
                  theme === "LIGHT" ? "text-custom-gray" : "text-d9-white"
                )}
              >
                {getDescription(description)}
              </span>
          </div>
          )}
        </>
      )}
    </ModeContext.Consumer>
  )
}

export default Description