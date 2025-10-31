import {Route, Routes} from "react-router-dom"
import {routes} from "./routes/routes"
import LoginPage from "./pages/login"

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}/>
      ))}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default App
