import { createReducer } from '@reduxjs/toolkit'
import Manga from '../../components/utils/Manga'


const initialState: { favourites: Manga[], recents: any } = {
  favourites: [],
  recents: [],
}

const reducer = createReducer(initialState, {
  'UPDATE_FAVOURITE': (state, { payload }) => ({ ...state, favourites: payload }),
  'UPDATE_RECENT': (state, { payload }) => ({ ...state, recents: payload }),
})

export { reducer }