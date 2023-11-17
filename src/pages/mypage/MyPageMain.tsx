import { Link } from 'react-router-dom';
import { useUser } from '../../store/userStore';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

import { ArrowPathRoundedSquareIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/20/solid';

const MyPageMain: React.FC = () => {
  const { nickname } = useUser();
  return (
    <div className="content_wrapper">
      <div className="content_fixed">
        <Header menu={'마이페이지'} />
        <div className="flex flex-col content gap-y-8">
          <div>
            <div className="flex items-center text-lg gap-x-3">
              <p>
                <span className="font-semibold text-customColor">{nickname}</span> 님, 안녕하세요!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <Link to="/mypage/modify">
              <div className="flex items-center px-5 py-4 text-sm gap-x-3 bg-slate-100 rounded-xl">
                <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                <p>회원 정보</p>
              </div>
            </Link>
            <Link to="/mypage/record/all">
              <div className="flex items-center px-5 py-4 text-sm gap-x-3 bg-slate-100 rounded-xl">
                <Bars3Icon className="w-4 h-4" />
                <p>주행 기록</p>
              </div>
            </Link>
            <Link to="/management">
              <div className="flex items-center px-5 py-4 text-sm gap-x-3 bg-slate-100 rounded-xl">
                <Bars3Icon className="w-4 h-4" />
                <p>유지 보수 기록</p>
              </div>
            </Link>
            <Link to="/withdraw">
              <div className="flex items-center px-5 py-4 text-sm gap-x-3 bg-slate-100 rounded-xl">
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                <p>회원 탈퇴</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageMain;
