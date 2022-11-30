import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../reducer/reducer'
import { mangaReducer } from '../reducer/mangaReducer'

const store = configureStore({
  reducer : {
    main: reducer,
    manga: mangaReducer,
  }
})


export default store