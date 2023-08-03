import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, MainPage, RegisterPage } from "./pages";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
