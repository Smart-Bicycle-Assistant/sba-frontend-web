import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import Header from "../../components/common/Header";

const RegistrationSuccess: React.FC = () => {
  const { state } = useLocation();
  return (
    <div>
      <Header menu="회원가입" showBackArrow={true} />
      <div className="mx-6 mt-20">
        <span className="text-2xl font-bold mr-1 text-customColor">
          {state}
        </span>
        <span className="text-xl font-bold">님 반갑습니다.</span>
        <p className="text-gray-600 mt-6">
          이제부터 SBA의 다양한 서비스를 자유롭게 이용하실 수 있습니다.
        </p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <Link to="/login" className="block">
          <button className="bg-customColor text-white py-2.5 px-4 rounded-lg w-full">
            로그인 하러 가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
