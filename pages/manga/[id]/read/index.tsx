import { type NextPage } from 'next'
import { Provider } from 'react-redux'
import store from '../../../../redux/store/manga_store'
import { ModeContext } from '../../../../hooks/theme_provider'
import Header from '../../../../components/Header'
import Navigation from '../../../../components/Navigation'
import Main from '../../../../components/Main'
import PageContainer from '../../../../components/PageContainer'

const Page: NextPage = () => {
  return (
    <Provider store={store}>
      <ModeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <>
            <Header {...{toggleTheme, mode: theme }} />
            <Main>
              <Navigation/>
              <PageContainer/>
            </Main>
          </>
        )}
      </ModeContext.Consumer>
    </Provider>
  )
}

export default Page