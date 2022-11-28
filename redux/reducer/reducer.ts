import { createReducer } from '@reduxjs/toolkit'
import { genre, theme, ContentRating, Status, Publication } from '../../components/utils/tags'

const initialState = {
  refresh: true,
  genre,
  theme,
  contentRating: ContentRating,
  status: Status,
  publication: Publication,
}

const reducer = createReducer(initialState, {
  'UPDATE_GENRE': (state, { payload }) => ({ ...state, genre: payload.genre }),
  'UPDATE_THEME': (state, { payload }) => ({ ...state, theme: payload.theme }),
  'UPDATE_STATUS': (state, { payload }) => ({ ...state, status: payload.status }),
  'UPDATE_PUBLICATION': (state, { payload }) => ({ ...state, publication: payload.publication }),
  'UPDATE_CONTENT_RATING': (state, { payload }) => ({ ...state, contentRating: payload.contentRating }),
  'REFRESH_MANGA': (state, { payload }) => ({ ...state, refresh: !state.refresh })
})


export { reducer }