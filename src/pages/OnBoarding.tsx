import { Link } from "react-router-dom";

import Logo from "../assets/logo-box-white.png";

function OnBoardingPage() {
  return (
    <div className="flex flex-col justify-center h-screen bg-primary-default">
      <div>
        <div className="flex flex-col px-10 mx-auto gap-y-8">
          <div className="flex flex-col items-center justify-center">
            <p className="pb-6 text-2xl font-bold leading-normal text-center text-white">
              딱, 당신을 위한
              <br />
              자전거 어플리케이션!
            </p>
            <img src={Logo} alt="logo" className="w-2/5 mb-2"></img>
            <p className="text-3xl font-bold text-white">S-BA</p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link to="/login">
                <button className="bg-gray-100 w-full font-medium text-sm text-primary-default shadow py-2.5 px-4 rounded-lg hover:bg-opacity-80">
                  로그인
                </button>
              </Link>
              <Link to="/register/terms">
                <button className="bg-gray-100 w-full font-medium text-sm text-primary-default shadow py-2.5 px-4 rounded-lg hover:bg-opacity-80">
                  회원가입
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnBoardingPage;
