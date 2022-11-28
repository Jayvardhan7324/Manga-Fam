import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../reducer/storedReducer'
import Manga, { Recent } from '../../components/utils/Manga'

const store = configureStore({
  reducer,
})

// update the value in localstorage, if there is a change in store
store.subscribe(() => {
  const state = store.getState()
  const { favourites, recents } = state

  console.log("favourites in store: ", favourites)
  Manga.setFavouriteMangas(favourites)
})

export default store