import Head from "next/head";
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ModeContext } from "../hooks/theme_provider";
import Header from "../components/Header";
import Main from "../components/Main";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import Container from "../components/MangaContainer";
import Store from "../redux/store/home_store";
import { Provider } from "react-redux";

const Home = () => {
  return (
    <>
      {/* Vercel Speed Insights */}
      <SpeedInsights/>
      <Head>
        <title>Manga Fam</title>
        <meta
          name="description"
          content="From One piece to Dragon ball Z, read thousands of mangas."
        />
        <meta name="keywords" content="Manga Fam" />
        <meta property="og:title" content="Manga Fam" />
        <meta
          property="og:description"
          content="Read thousands of mangas for free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/manga_fam_og.jpg" />
      </Head>
      <Provider store={Store}>
        <ModeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <>
              <Header mode={theme} toggleTheme={toggleTheme} />
              <Main>
                <Navigation />
                <div className="flex flex-col flex-nowrap min-w-0 w-full">
                  <SearchBar />
                  <Container />
                </div>
              </Main>
            </>
          )}
        </ModeContext.Consumer>
      </Provider>
    </>
  );
};

export default Home;
