import { createSlice } from "@reduxjs/toolkit"

interface StateType {
  reload: boolean
}

export const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    reload: false
  },
  reducers: {
    setReloadMood: (state: StateType, action) => {
      state.reload = action.payload
    }
  }
})

export const { setReloadMood } = moodSlice.actions

export default moodSlice.reducer