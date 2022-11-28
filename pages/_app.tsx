import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { ModeContext, useThemeMode } from '../hooks/theme_provider'
import ProgressBar from '../components/ProgresssBar'


export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, changeLoadingState] = useState<boolean>(false)
  const [themeMode, changeMode] = useThemeMode()

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => (url !== Router.asPath) && changeLoadingState(true)
    const handleRouteChangeComplete = (url: string) => (url !== Router.asPath) && changeLoadingState(false)

    Router.events.on("routeChangeStart", handleRouteChangeStart)
    Router.events.on("routeChangeError", handleRouteChangeComplete)
    Router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart)
      Router.events.off("routeChangeError", handleRouteChangeComplete)
      Router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [])

  return (
    <ModeContext.Provider value={{ theme: themeMode, toggleTheme: changeMode }}>
      <ProgressBar/>
      <Component {...pageProps} changeMode={changeMode} />
    </ModeContext.Provider>
  )
}
