import { createAction } from '@reduxjs/toolkit'
import type { Manga } from '../../components/utils/Manga'

const addManga = createAction("ADD_MANGA", (total: number, mangas: Manga[] ) => {
  return {
    payload: {
      total,
      mangas,
    },
  }
})

const updateManga = createAction("UPDATE_MANGA", (total: number, mangas: Manga[]) => {
  return {
    payload: {
      total,
      mangas,
    },
  }
})

const updateFavourite = createAction("UPDATE_FAVOURITE", (payload: Manga[]) => {
  return {
    payload,
  }
})

const updateRecent = createAction("UPDATE_RECENT", (payload: Manga[]) => {
  return {
    payload,
  }
})

export { addManga, updateManga, updateFavourite, updateRecent }