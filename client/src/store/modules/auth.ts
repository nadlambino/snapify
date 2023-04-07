import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface StateType {
  user?: object | undefined,
  token?: string | undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth: (state: StateType, action: PayloadAction) => {
      Object.assign(state, action.payload)
    }
  }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer