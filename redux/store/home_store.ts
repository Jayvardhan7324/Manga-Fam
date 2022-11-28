import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../reducer/reducer'
import { mangaReducer } from '../reducer/mangaReducer'

const store = configureStore({
  reducer : {
    main: reducer,
    manga: mangaReducer,
  }
})

store.subscribe(() => console.log(store.getState()))

export default store