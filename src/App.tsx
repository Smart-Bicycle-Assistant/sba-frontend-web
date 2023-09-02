import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  MainPage,
  RegisterPage,
  MyPageMain,
  MyPageModify,
  MyPageRecord,
  MyPageRecordAll,
  MyPageRecordDetail,
  BicycleMain,
  BicycleDetail,
  BicycleRegistration,
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
    path: "/mypage/modify",
    element: <MyPageModify />,
  },
  {
    path: "/mypage/record",
    element: <MyPageRecord />,
  },
  {
    path: "/mypage/record/all",
    element: <MyPageRecordAll />,
  },
  {
    path: "/mypage/record/:recordNo",
    element: <MyPageRecordDetail />,
  },
  {
    path: "/bicycle",
    element: <BicycleMain />,
  },
<<<<<<< HEAD
  { path: "/bicycle", element: <BicycleMain /> },
=======
  {
    path: "/bicycle/registration",
    element: <BicycleRegistration />,
  },
>>>>>>> feat/mybicycle
  {
    path: "/bicycle/detail",
    element: <BicycleDetail />,
  },
  {
    path: "/bicycle/registration",
    element: <BicycleRegistration />,
  },
]);

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
