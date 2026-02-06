import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface RequestsState {
  selectedId: string | null
}

const initialState: RequestsState = {
  selectedId: null,
}

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    selectRequest(state, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    clearSelection(state) {
      state.selectedId = null
    },
  },
})

export const { selectRequest, clearSelection } = requestsSlice.actions
export default requestsSlice.reducer
