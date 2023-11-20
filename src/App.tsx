import { useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  LoginPage,
  HomePage,
  OnBoardingPage,
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
} from './pages';

import { useUser } from './store/userStore';
import { useToken } from './store/tokenStore';
import { useLocationStore } from '../src/store/locationStore';
import { useRidingStore } from './store/ridingStore';
import { useModalStore } from './store/modalStore';
import { RefreshApi } from './apis/user';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <OnBoardingPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/password/change',
    element: <ChangePassword />,
  },
  {
    path: '/password/reset',
    element: <ResetPassword />,
  },
  {
    path: '/riding/before',
    element: <PreRiding />,
  },
  {
    path: '/withdraw',
    element: <Withdraw />,
  },
  {
    path: '/management/part',
    element: <PartManagement />,
  },
  {
    path: '/management/detail',
    element: <ManagementDetail />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/mypage',
    element: <MyPageMain />,
  },
  {
    path: '/mypage/modify',
    element: <MyPageModify />,
  },
  {
    path: '/mypage/record',
    element: <MyPageRecord />,
  },
  {
    path: '/mypage/record/all',
    element: <MyPageRecordAll />,
  },
  {
    path: '/mypage/record/:recordNo',
    element: <MyPageRecordDetail />,
  },
  {
    path: '/bicycle',
    element: <BicycleMain />,
  },
  {
    path: '/bicycle/registration',
    element: <BicycleRegistration />,
  },
  {
    path: '/management',
    element: <Management />,
  },
  {
    path: '/register/terms',
    element: <RegisterTerms />,
  },
  {
    path: '/register/success',
    element: <RegisterSuccess />,
  },
  {
    path: '/bicycle/registration',
    element: <BicycleRegistration />,
  },
  {
    path: '/register/terms',
    element: <RegisterTerms />,
  },
  {
    path: '/register/success',
    element: <RegisterSuccess />,
  },
  {
    path: '/riding',
    element: <RidingPage />,
  },
]);

function App() {
  const { setUser, setLoggedIn } = useUser((state) => state);
  const { setToken } = useToken((state) => state);

  useEffect(() => {
    const refreshData = async () => {
      if (localStorage.getItem('token') === null) {
        return;
      }

      setToken(localStorage.getItem('token') as string);

      const res = await RefreshApi();

      if (res.message === 'OK') {
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
  const { setAlertModal } = useModalStore();
  const eventHandlerRef = useRef<((e: MessageEvent) => void) | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleMessage(e: { data: string }) {
    try {
      const messageObject = JSON.parse(e.data);

      if (isLocationMessage(messageObject)) {
        handleLocationMessage(messageObject);
      } else if (isSizeMessage(messageObject)) {
        handleSizeMessage(messageObject);
      } else {
        console.log('Unsupported message type');
      }
    } catch (error) {
      console.error('Error parsing the message:', error);
    }
  }

  function isLocationMessage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any
  ): obj is { latitude: number; longitude: number; speed: number } {
    return obj.latitude !== undefined && obj.longitude !== undefined && obj.speed !== undefined;
  }

  function isSizeMessage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any
  ): obj is { Width: number; Height: number; boxCount: number } {
    return obj.Width !== undefined && obj.Height !== undefined && obj.boxCount !== undefined;
  }

  function handleLocationMessage(locationMessage: {
    latitude: number;
    longitude: number;
    speed: number;
  }) {
    setLocation({
      latitude: locationMessage.latitude,
      longitude: locationMessage.longitude,
      speed: locationMessage.speed,
    });
    setMaxSpeed(locationMessage.speed);
  }

  function handleSizeMessage(sizeMessage: { Width: number; Height: number; boxCount: number }) {
    console.log('Received Size Message:', sizeMessage);
    if (sizeMessage.boxCount) {
      if (isRiding && rearDetection) {
        const timer = setTimeout(() => {
          setAlertModal(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }

  useEffect(() => {
    if (eventHandlerRef.current) {
      window.removeEventListener('message', eventHandlerRef.current);
    }
    eventHandlerRef.current = handleMessage;
    window.addEventListener('message', eventHandlerRef.current);

    return () => {
      if (eventHandlerRef.current) {
        window.removeEventListener('message', eventHandlerRef.current);
      }
    };
  }, [handleMessage]);

  window.addEventListener('message', handleMessage);

  return <RouterProvider router={ROUTER} />;
}

export default App;
