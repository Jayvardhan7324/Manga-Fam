import type { FC } from 'react'
import Image from 'next/image'

type CoverType = {
  low: string | null,
  high: string | null,
  fill?: any
}

const Cover: FC<CoverType> = ({ low, high, fill = "cover" }) => {
  return (
    <div className="relative w-full h-full">
      <Image alt="" src={low ? low : ""} fill={true} className="object-cover" />
    </div>
  )
}

export default Cover