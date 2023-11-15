import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  MapPage,
  MainPage,
  RegisterPage,
  MyPageMain,
  MyPageModify,
  MyPageRecord,
  MyPageRecordAll,
  MyPageRecordDetail,
  BicycleMain,
  Management,
  BicycleRegistration,
  RegisterTerms,
  RegisterSuccess,
  PreRiding,
  PartManagement,
  RidingPage,
  ManagementDetail,
  Withdraw,
  ChangePassword,
  ResetPassword,
} from "./pages";

import { useLocationStore } from "../src/store/locationStore";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/password/change",
    element: <ChangePassword />,
  },
  {
    path: "/password/reset",
    element: <ResetPassword />,
  },
  {
    path: "/riding/before",
    element: <PreRiding />,
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
  },
  {
    path: "/management/part",
    element: <PartManagement />,
  },
  {
    path: "/management/detail",
    element: <ManagementDetail />,
  },
  {
    path: "/map",
    element: <MapPage />,
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
  {
    path: "/bicycle/registration",
    element: <BicycleRegistration />,
  },
  {
    path: "/management",
    element: <Management />,
  },
  {
    path: "/register/terms",
    element: <RegisterTerms />,
  },
  {
    path: "/register/success",
    element: <RegisterSuccess />,
  },
  {
    path: "/bicycle/registration",
    element: <BicycleRegistration />,
  },
  {
    path: "/register/terms",
    element: <RegisterTerms />,
  },
  {
    path: "/register/success",
    element: <RegisterSuccess />,
  },
  {
    path: "/riding",
    element: <RidingPage />,
  },
]);

function App() {
  const { setLocation, setMaxSpeed } = useLocationStore();

  function handleMessage(e: { data: string }) {
    const { latitude, longitude, speed } = JSON.parse(e.data);
    setLocation({
      latitude,
      longitude,
      speed,
    });
    setMaxSpeed(speed);
  }

  window.addEventListener("message", handleMessage);

  return <RouterProvider router={ROUTER} />;
}

export default App;
