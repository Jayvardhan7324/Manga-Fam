/* eslint-disable @next/next/no-img-element */
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
      {src ? 
        <img referrerPolicy='no-referrer' onError={handleError} src={src} className="w-full h-full object-cover" alt="" />
      : null}
    </div>
  )
}



export default Cover