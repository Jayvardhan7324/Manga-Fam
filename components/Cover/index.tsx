import type { FC } from 'react'

type CoverType = {
  low: string | null,
  high: string | null,
  fill?: any
}

const Cover: FC<CoverType> = ({ low, high, fill = "cover" }) => {
  return (
    <picture className={`w-full h-full object-${fill}`}>
      {low ? <source srcSet={low} media="(min-width: 0px)" /> : null}
      {high ? <source srcSet={high} media="(min-width: 600px)" /> : null}
      <img className="w-full h-full" style={{ objectFit: fill }} alt="" src={high || ""} />
    </picture>
  )
}

export default Cover