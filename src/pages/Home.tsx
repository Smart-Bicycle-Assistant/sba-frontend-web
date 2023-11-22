/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import BicycleSwiper from '../components/common/BicycleSwiper';

import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useMainBike } from '../store/userStore';
import { GetBicycleListApi } from '../apis/bicycle';
import { useEffect } from 'react';
import { BicycleType } from '../types';

import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

import Logo from '../assets/logo-white.svg?react';
import Compass from '../assets/compass.svg?react';
import Record from '../assets/record.svg?react';
import Setting from '../assets/setting.svg?react';
import User from '../assets/user.svg?react';

function HomePage() {
  const [bicycleList, setBicycleList] = useState<BicycleType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const swiperRef = useRef<any>(null);

  const { setMain } = useMainBike((state) => state);
  const { isLoggedIn, setLoggedOut } = useUser((state) => state);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedOut();
    navigate('/');
  };

  async function getBicycle() {
    const res = await GetBicycleListApi();
    setBicycleList(res.data);

    if (res.data[0]) {
      setMain(res.data[0].bicycleId);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getBicycle();
      swiperRef.current.initialize(); // Initialize swiper after fetching data
    };

    fetchData();
  }, []);

  useEffect(() => {
    register();

    const params = {
      slidesPerView: 1,
      spaceBetween: 30,
      on: {
        slideChange(e: Swiper) {
          setActiveIndex(e.activeIndex);
        },
      },
    };

    Object.assign(swiperRef.current, params);
  }, [bicycleList]);

  useEffect(() => {
    if (bicycleList[activeIndex]?.bicycleId) {
      setMain(bicycleList[activeIndex].bicycleId);
    }
  }, [activeIndex]);

  return (
    <div className="h-screen bg-gradient-to-b from-customColor from-0% to-white to-35%">
      <div className="h-auto min-h-screen">
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex itmes-center gap-x-2">
              <div className="flex items-center">
                <Logo className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-white">S-BA</div>
            </div>
            {isLoggedIn ? (
              <div className="flex items-center gap-x-2">
                <div>
                  <button
                    className="px-2 py-1 text-sm text-white border rounded-full hover:underline"
                    onClick={handleSignOut}
                  >
                    로그아웃
                  </button>
                </div>
                <Link to="/mypage">
                  <button className="flex items-center text-white">
                    <User stroke="#FFFFFF" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <Link to="/login">
                  <button className="px-2 py-1 text-sm text-white border rounded-full hover:underline">
                    로그인
                  </button>
                </Link>
                <Link to="/register/terms">
                  <button className="px-2 py-1 text-sm text-white border rounded-full hover:underline">
                    회원가입
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="mb-5">
            <swiper-container init={false} ref={swiperRef} pagination={true}>
              {bicycleList && bicycleList.length > 0 ? (
                bicycleList.map((bicycle, index) => (
                  <swiper-slide>
                    <BicycleSwiper bicycle={bicycle} activeIndex={activeIndex} index={index} />
                  </swiper-slide>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-y-0.5 w-full h-[85vw] p-8 mx-2 mb-10 bg-slate-100 shadow-lg rounded-3xl text-center text-slate-500 text-sm">
                  <span className="material-symbols-outlined text-3xl pb-2">directions_bike</span>
                  <p>등록된 자전거가 없습니다.</p>
                  <p>마이페이지에서 자전거를 등록해 주세요.</p>
                </div>
              )}
            </swiper-container>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <Link to="/riding/before">
                <div className="p-3 bg-white rounded-lg shadow-lg">
                  <Compass />
                </div>
              </Link>
              <div className="text-sm text-black hover:underline">주행</div>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <div
                className="p-3 bg-white rounded-lg shadow-lg"
                onClick={() => {
                  navigate('/management');
                }}
              >
                <Record />
              </div>
              <div className="text-sm text-black hover:underline">관리</div>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Link to="/mypage/record/all">
                <div className="p-3 bg-white rounded-lg shadow-lg">
                  <Setting />
                </div>
              </Link>
              <div className="text-sm text-black hover:underline">주행기록</div>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Link to="/mypage">
                <div className="p-3 bg-white rounded-lg shadow-lg">
                  <User stroke="#333333" />
                </div>
              </Link>
              <div className="text-sm text-black hover:underline">마이페이지</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
