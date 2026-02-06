import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useDispatch } from "react-redux"
import IdleTimeout from "./components/idle-timeout"
import SingleTabManager from "./components/single-tab"

const App = () => {
  const element = useRoutes(routes)
  const dispatch = useDispatch()

  return (
    <>
      <SingleTabManager onDuplicateTab={() => dispatch({ type: "auth/logout" })} />
        {/* {shouldShowNavbar && <Navbar />} */}
      <IdleTimeout
        timeout={300_000} // 5 minutes
        warningTime={240_000} // 4 minutes
        onTimeout={() => {
         console.log("User has been logged out due to inactivity.")
         // Dispatch logout action or any other state management logic
         dispatch({ type: "auth/logout" })
        }}
      />

      {/* App routes */}
      <div className="min-h-screen bg-gray-50">
        {element}
      </div>
    </>
  )
}

export default App
