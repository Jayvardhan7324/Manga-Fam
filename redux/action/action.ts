import { createAction } from '@reduxjs/toolkit'

const updatedTags = createAction("UPDATE_GENRE", (genre: string[]) => {
  return {
    payload: {
      genre,
    }
  }
}) 

const updatedStatus = createAction("UPDATE_STATUS", (status: string[]) => {
  return {
    payload: {
      status,
    }
  }
})

const updatedPublication = createAction("UPDATE_PUBLICATION", (publication: string[]) => {
  return {
    payload: {
      publication,
    }
  }
})

const updatedTheme = createAction("UPDATE_THEME", (theme: string[]) => {
  return {
    payload: {
      theme
    }
  }
})

const updatedContentRating = createAction("UPDATE_CONTENT_RATING", (cr: string[]) => {
  return {
    payload: {
      contentRating: cr,
    }
  }
})

const refreshManga = createAction("REFRESH_MANGA", () => {
  return {
    payload: {}
  }
})

export {
  updatedContentRating,
  updatedPublication,
  updatedStatus,
  updatedTags,
  updatedTheme,
  refreshManga,
}