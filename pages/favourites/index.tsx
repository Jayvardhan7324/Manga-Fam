import type { NextPage } from 'next'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../../redux/store/manga_store'
import { ModeContext } from '../../hooks/theme_provider'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Navigation from '../../components/Navigation'
import FavouritesContainer from '../../components/FavouritesContainer'

const FavouritesPage: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Favourites</title>
      </Head>

      <Provider store={store}>
        <ModeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <>
              <Header {...{ toggleTheme, mode: theme }} />
              <Main>
                <Navigation/>
                <div className="flex flex-row min-w-0 h-full w-full">
                  <FavouritesContainer/>
                </div>
              </Main>
            </>
          )}
        </ModeContext.Consumer>

      </Provider>

    </>
  )
}

export default FavouritesPage
