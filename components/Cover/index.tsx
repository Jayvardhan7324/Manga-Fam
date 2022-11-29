import type { FC } from 'react'
import { useState } from 'react'
import Image from 'next/image'

type CoverType = {
  low: string | null,
  high: string | null,
  fill?: any
}

const Cover: FC<CoverType> = ({ low, high, fill = "cover" }) => {
  const [src, changeSrc] = useState<string | null>(low)

  const handleError = () => {
    high && changeSrc(high)
  }
  return (
    <div className="relative w-full h-full">
      {src ? <Image alt="" src={src} fill={true} onError={handleError} className="object-cover w-full h-full" sizes="100vw" /> : null}
    </div>
  )
}

export default Cover