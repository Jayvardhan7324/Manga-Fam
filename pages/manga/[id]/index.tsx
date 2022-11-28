import { NextPage } from 'next'
import { Provider } from 'react-redux'
import store from '../../../redux/store/manga_store'
import { ModeContext } from '../../../hooks/theme_provider'
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import MangaDescription from '../../../components/MangaDescription'


const MangaPage: NextPage = (props) => {
  return (
    <Provider store={store}>
      <ModeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <>
            <Header {...{ toggleTheme, mode: theme }} />
            <div className="flex flex-col flex-nowrap md:flex-row mb-10 lg:mb-10">
              <Navigation/>
              <MangaDescription/>
            </div>
          </>
        )}
      </ModeContext.Consumer>
    </Provider>
  )
}

export default MangaPage