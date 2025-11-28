import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './app/pages/login'
import { PrivateOutlet } from './PrivateOutlet'
import SignupPage from './app/pages/signup'
import NotFoundPage from './app/pages/404'

const App = () => (
  <Routes>
    <Route path="/" element={<PrivateOutlet />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/404" element={<NotFoundPage />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default App
