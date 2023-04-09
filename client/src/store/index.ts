import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth'
import feedReducer from './modules/feed'

export default configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer
  }
})
