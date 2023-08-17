import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  MainPage,
  RegisterPage,
  MyPageMain,
  MyPageRecord,
  MyPageRecordAll,
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
    path: "/mypage",
    element: <MyPageMain />,
  },
  {
    path: "/mypage/record",
    element: <MyPageRecord />,
  },
  {
    path: "/mypage/record/all",
    element: <MyPageRecordAll />,
  },
]);

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
