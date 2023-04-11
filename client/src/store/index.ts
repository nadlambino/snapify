import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth'
import feedReducer from './modules/feed'
import moodReducer from './modules/mood'

export default configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    mood: moodReducer,
  }
})
