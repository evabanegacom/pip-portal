import { createSlice } from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
interface RouteState {
  currentRoute: string
}

const initialState: RouteState = {
  currentRoute: '',
}

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload
    },
  },
})

export const { setCurrentRoute } = routeSlice.actions
export default routeSlice.reducer
