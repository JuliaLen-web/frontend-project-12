import LoginPage from "../pages/login";
import NotFoundPage from "../pages/404";

export const routes= [
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/404", element: <NotFoundPage /> },
];
