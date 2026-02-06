import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "./request-slices/auth-slice"
import { authApi } from "./requests/auth-api"
import routeReducer from "./request-slices/route-slice"
export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    route: routeReducer, // ← add this
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
