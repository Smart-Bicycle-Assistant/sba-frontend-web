import { Link } from "react-router-dom";
import { useUser } from "../store/userStore";

import Sample from "../assets/sample.png";
import Logo from "../assets/logo-white.svg?react";
import Compass from "../assets/compass.svg?react";
import Record from "../assets/record.svg?react";
import Setting from "../assets/setting.svg?react";
import User from "../assets/user.svg?react";
import { GetBicycleListApi } from "../apis/bicycle";
import { useEffect } from "react";
import { useMainBike } from "../store/userStore";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { isLoggedIn, setLoggedOut } = useUser((state) => state);

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedOut();
  };
  const { main, setMain } = useMainBike();
  async function getBicycle() {
    const res = await GetBicycleListApi();
    setMain(res.data[0].bicycleId);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!main) {
      getBicycle();
    }
  }, []);

  //todo: 홈 화면 로딩 시 메인 자전거 임의 지정. 추후 제거 필요

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
          <div className="p-8 mb-10 bg-white shadow-lg rounded-3xl">
            <div className="flex gap-x-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-200">
                <p className="text-sm font-semibold text-primary-default">1</p>
              </div>
              <div className="flex items-center justify-center px-2 border rounded-full border-rose-500">
                <p className="text-sm font-semibold text-rose-500">메인</p>
              </div>
            </div>
            <div className="py-4 text-xl font-semibold">자전거 이름 필드</div>
            <div className="flex justify-center py-16">
              <img src={Sample} alt="main"></img>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <Link to="/map">
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
                  navigate("/management", { state: main });
                }}
              >
                <Record />
              </div>

              <div className="text-sm text-black hover:underline">관리</div>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Link to="/mypage/record">
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
              <div className="text-sm text-black hover:underline">
                마이페이지
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
