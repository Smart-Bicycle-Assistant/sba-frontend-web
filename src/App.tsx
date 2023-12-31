import { useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  Report,
  HomePage,
  OnBoardingPage,
  ErrorPage,
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

import { useUser } from "./store/userStore";
import { useToken } from "./store/tokenStore";
import { useLocationStore } from "../src/store/locationStore";
import { useRidingStore } from "./store/ridingStore";
import { useModalStore } from "./store/modalStore";
import { RefreshApi } from "./apis/user";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <OnBoardingPage />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/main",
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
  const { setUser, setLoggedIn } = useUser((state) => state);
  const { setToken } = useToken((state) => state);

  useEffect(() => {
    const refreshData = async () => {
      if (localStorage.getItem("token") === null) {
        return;
      }

      setToken(localStorage.getItem("token") as string);

      const res = await RefreshApi();

      if (res.message === "OK") {
        setUser({
          id: res.data.id,
          email: res.data.email,
          nickname: res.data.nickname,
        });

        setLoggedIn();
      }
    };

    refreshData();
  }, []);

  const { setLocation, setMaxSpeed } = useLocationStore();
  const { isRiding, rearDetection } = useRidingStore();
  const { alertModal, setAlertModal } = useModalStore();
  const eventHandlerRef = useRef<((e: MessageEvent) => void) | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleMessage(e: { data: string }) {
    const { latitude, longitude, speed, boxCount } = JSON.parse(e.data);
    setLocation({
      latitude: latitude,
      longitude: longitude,
      speed: speed,
    });
    setMaxSpeed(speed);

    if (boxCount >= 1) {
      if (isRiding && rearDetection) {
        if (!alertModal) {
          setAlertModal(true);

          const timer = setTimeout(() => {
            setAlertModal(false);
          }, 3000);

          return () => clearTimeout(timer);
        }
      }
    }
  }

  useEffect(() => {
    if (eventHandlerRef.current) {
      window.removeEventListener("message", eventHandlerRef.current);
    }
    eventHandlerRef.current = handleMessage;
    window.addEventListener("message", eventHandlerRef.current);

    return () => {
      if (eventHandlerRef.current) {
        window.removeEventListener("message", eventHandlerRef.current);
      }
    };
  }, [handleMessage]);

  window.addEventListener("message", handleMessage);

  return <RouterProvider router={ROUTER} />;
}

export default App;
