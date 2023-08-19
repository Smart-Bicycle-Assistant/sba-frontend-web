import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  MainPage,
  RegisterPage,
  BicyclePage,
  BicycleDetail,
} from "./pages";

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
  {
    path: "/bicycle",
    element: <BicyclePage />,
  },
  {
    path: "/bicycle-detail",
    element: <BicycleDetail />,
  },
]);

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
