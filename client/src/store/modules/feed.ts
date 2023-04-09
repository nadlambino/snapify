import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface StateType {
  reloadFeed: boolean
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    reloadFeed: false
  },
  reducers: {
    setReloadFeed: (state: StateType, action) => {
      state.reloadFeed = action.payload
    }
  }
})

export const { setReloadFeed } = feedSlice.actions

export default feedSlice.reducer