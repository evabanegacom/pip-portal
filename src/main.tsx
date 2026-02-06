import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Default options
            duration: 4000,
            style: {
              borderRadius: "12px",
              padding: "12px 16px",
              fontWeight: 500,
              fontSize: "14px",
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
