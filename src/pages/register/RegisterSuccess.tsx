import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/common/Header";

const RegistrationSuccess: React.FC = () => {
  return (
    <div>
      <Header menu="회원가입" showBackArrow={true} />
      <div className="mx-6">
        <p className="text-xl font-bold mt-20">[아이디]님 반갑습니다.</p>
        <p className="text-gray-600 mt-6">
          이제부터 SBA의 다양한 서비스를 자유롭게 이용하실 수 있습니다.
        </p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <Link to="/" className="block">
          <button className="bg-customColor text-white py-2.5 px-4 rounded-lg w-full">
            시작하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
