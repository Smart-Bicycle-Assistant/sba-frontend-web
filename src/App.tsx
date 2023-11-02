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
  BicycleDetail,
  BicycleRegistration,
  RegisterTerms,
  RegisterSuccess,
  PreRiding,
  PartManagement,
  RidingPage,
} from "./pages";
import { useUserLocation } from "./store/userStore";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/riding/before",
    element: <PreRiding />,
  },
  {
    path: "/management/part",
    element: <PartManagement />,
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
    path: "/bicycle/detail",
    element: <BicycleDetail />,
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
  const { setLocation } = useUserLocation();
  window.addEventListener("message", (e) => {
    const { latitude, longitude, speed } = JSON.parse(e.data);

    setLocation({
      latitude,
      longitude,
      speed,
    });
  });
  return <RouterProvider router={ROUTER} />;
}

export default App;
