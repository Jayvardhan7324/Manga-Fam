import classnames from 'classnames'

const Arrow = ({ className }: {className?: string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 24 24"
      className={className}
    ><path fill="fill: inherit" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg>
  )
}

export default Arrow
