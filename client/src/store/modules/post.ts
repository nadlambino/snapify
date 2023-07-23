import { createSlice } from "@reduxjs/toolkit"


interface StateType {
  reloadPosts: boolean
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    reloadPosts: true
  },
  reducers: {
    setReloadPosts: (state: StateType, action) => {
      state.reloadPosts = action.payload
    }
  }
})

export const { setReloadPosts } = postSlice.actions

export default postSlice.reducer