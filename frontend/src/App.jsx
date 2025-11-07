import { Route, Routes } from 'react-router-dom';
import LoginPage from './app/pages/login';
import { PrivateOutlet } from './utils/PrivateOutlet';
import SignupPage from './app/pages/signup';
import NotFoundPage from './app/pages/404';
import ChatPage from './app/pages/chat';

const App = () => (
  <Routes>
    <Route path="*" element={<PrivateOutlet />}>
      <Route path="" element={<ChatPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/404" element={<NotFoundPage />} />
  </Routes>
);

export default App;
