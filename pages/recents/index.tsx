import type { NextPage } from 'next'
import { Provider } from 'react-redux'
import store from '../../redux/store/manga_store'
import { ModeContext } from '../../hooks/theme_provider'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Navigation from '../../components/Navigation'
import RecentContainer from '../../components/RecentContainer'

const RecentsPage: NextPage = () => {
  return (
    <Provider store={store}>
      <ModeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <>
            <Header { ...{ toggleTheme, mode: theme }} />
            <Main>
              <Navigation/>
              <RecentContainer/>
            </Main>
          </>
        )}
      </ModeContext.Consumer>
    </Provider>
  )
}

export default RecentsPage