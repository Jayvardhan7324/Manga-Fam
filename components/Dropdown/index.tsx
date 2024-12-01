import { useState, useCallback, useEffect } from 'react'

interface IDropdownProps {
  label: string
  show: boolean
  close: () => void
  items: any[]
}

export default function Dropdown({ label, show, close, items }: IDropdownProps) {

  const handleClick = useCallback(() => {}, [])

  return (
    <div className="flex flex-col gap-1">
      {/* Dropdown Button */}
      <div className="">
        <button
          type="button"
          className="flex flex-row items-center justify-between p-1"
          onClick={handleClick}
        >
          <span>{label}</span>
        </button>
      </div>

      {/* Dropdown Items */}
      <div>
        <ul className="flex flex-col gap-1">

        </ul>
      </div>
    </div>
  )
}
