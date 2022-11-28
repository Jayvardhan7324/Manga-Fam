import { useState } from 'react'

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [open, toggle] = useState<boolean>(initialState)

  const _toggle = () => { toggle(!open) }

  return [open, _toggle]
}

export { useToggle }