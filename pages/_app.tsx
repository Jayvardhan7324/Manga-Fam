import "../styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ModeContext, useThemeMode } from "../hooks/theme_provider";
import { useRegisterWorker } from "../hooks/registerWorker";
import ProgressBar from "../components/ProgresssBar";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, changeLoadingState] = useState<boolean>(false);
  const [themeMode, changeMode] = useThemeMode();

  // Hook to register the service worker
  useRegisterWorker();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) =>
      url !== Router.asPath && changeLoadingState(true);
    const handleRouteChangeComplete = (url: string) =>
      url !== Router.asPath && changeLoadingState(false);

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeError", handleRouteChangeComplete);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <ModeContext.Provider value={{ theme: themeMode, toggleTheme: changeMode }}>
      <Head>
        {/** Web Manifest **/}
        <link rel="manifest" type="application/json" href="/app.webmanifest" />
      </Head>

      <ProgressBar />
      <Component {...pageProps} changeMode={changeMode} />
    </ModeContext.Provider>
  );
}
