import { createReducer } from '@reduxjs/toolkit'
import type { Manga } from '../../components/utils/Manga'

interface State {
  total: number,
  mangas: Manga[],
}

const initialState: State = {
  total: 0,
  mangas: [],
}

const mangaReducer = createReducer(initialState, {
  'ADD_MANGA': (state, { payload }) => ({ total: payload.total, mangas: state.mangas.concat(payload.mangas) }),
  "UPDATE_MANGA": (state, { payload }) => ({ total: payload.total, mangas: payload.mangas })
})

export { mangaReducer }