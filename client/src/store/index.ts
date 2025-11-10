import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth'
import postReducer from './modules/post'

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  }
})
