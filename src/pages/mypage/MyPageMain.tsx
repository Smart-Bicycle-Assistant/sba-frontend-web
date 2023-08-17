import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header";
import Navbar from "../../components/common/navbar";

import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/20/solid";

const MyPageMain: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="content_wrapper">
      <div className="content_fixed">
        <Header menu={"마이페이지"} />
        <div className="content flex flex-col gap-y-8">
          <div>
            <p className="pb-3 text-base font-semibold">내 정보</p>
            <div className="flex items-center gap-x-3 text-sm">
              <div className="flex justify-center items-center w-16 h-16 bg-neutral-200 rounded-full">
                <img src="" alt="profile"></img>
              </div>
              <p>닉네임</p>
            </div>
          </div>
          <div className="border-t">
            <div className="flex items-center gap-x-3 text-sm px-2 py-5 border-b">
              <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              <p>회원 정보 수정</p>
            </div>
            <div
              className="flex items-center gap-x-3 text-sm px-2 py-5 border-b"
              onClick={() => {
                navigate("/mypage/record");
              }}
            >
              <Bars3Icon className="w-5 h-5" />
              <p>주행 기록</p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageMain;
