import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

import {
  ArrowPathRoundedSquareIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/20/solid';

const MyPageMain: React.FC = () => {
  const { nickname } = useUserStore();
  return (
    <div className="content_wrapper">
      <div className="content_fixed">
        <Header menu={'마이페이지'} />
        <div className="content flex flex-col gap-y-8">
          <div>
            <div className="flex items-center gap-x-3 text-lg">
              <p>
                <span className="font-semibold text-customColor">
                  {nickname}
                </span>{' '}
                님, 안녕하세요!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <Link to="/mypage/modify">
              <div className="flex items-center gap-x-3 bg-slate-100 rounded-xl text-sm px-5 py-4">
                <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                <p>회원 정보</p>
              </div>
            </Link>
            <Link to="/mypage/record">
              <div className="flex items-center gap-x-3 bg-slate-100 rounded-xl text-sm px-5 py-4">
                <Bars3Icon className="w-4 h-4" />
                <p>주행 기록</p>
              </div>
            </Link>
            <Link to="/mypage/record">
              <div className="flex items-center gap-x-3 bg-slate-100 rounded-xl text-sm px-5 py-4">
                <Bars3Icon className="w-4 h-4" />
                <p>유지 보수 기록</p>
              </div>
            </Link>
            <Link to="/mypage/record">
              <div className="flex items-center gap-x-3 bg-slate-100 rounded-xl text-sm px-5 py-4">
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
