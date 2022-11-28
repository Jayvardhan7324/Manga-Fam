import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

const ProgressBar = () => {
  const router = useRouter()
  const animation1Ref = useRef<Animation | null>(null)
  const animation2Ref = useRef<Animation | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [start, changeStart] = useState<boolean>(false)
  const [complete, changeComplete] = useState<boolean>(false)

  useEffect(() => {
    if (barRef && barRef.current) {

      if (start) {
        const finish_anim = () => {
          changeStart(false)
        }

        animation1Ref.current = barRef.current.animate([
          { width: "0%", visibility: "visible" },
          { width: "75%" }
        ], {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
        })

        animation1Ref.current.oncancel = () => { finish_anim() }
        animation1Ref.current.onremove = () => { finish_anim() }
        animation1Ref.current.onfinish = () => { finish_anim() }
      }
    }
  }, [start])

  useEffect(() => {
    if (barRef && barRef.current) {

      if (complete) {
        const finish_anim = () => {
          changeComplete(false)
          
          if (barRef && barRef.current) {
            barRef.current.style.width = "0"
            barRef.current.style.visibility = "hidden"
          }
        }

        animation2Ref.current = barRef.current.animate([
          { width: "100%" }
        ], {
          duration: 100,
          easing: "ease-in-out",
          fill: "forwards",
        })

        animation2Ref.current.onfinish = () => { finish_anim() }
      }

    }
  }, [complete])

  useEffect(() => {

    const handleRouteChangeStart = () => {
      // change the start
      changeStart(true)
    }

    const handleRouteChangeComplete = () => {
      // change the complete
      changeComplete(true)
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    router.events.on("routeChangeError", handleRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
      router.events.off("routeChangeError", handleRouteChangeComplete)
    }
  })

  return (
    <div className="w-full" style={{ height: "2px" }}>
      <div ref={barRef} className="w-0 progress_bar bg-primary-color h-full"></div>
    </div>
  )
}

export default ProgressBar