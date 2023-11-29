import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

const MyPageRecord: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu={'주행 기록'} showBackArrow={true} />
        <div className="flex flex-col gap-y-8 px-8 py-8 mx-auto">
          <div>
            <div className="pb-4">
              <p className="text-xs text-neutral-500">총 주행 거리</p>
              <p className="text-2xl font-semibold">300,000m</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-x-3">
                <div className="flex justify-center items-center w-10 h-10 bg-neutral-200 rounded-full">
                  <img src="" alt="bike"></img>
                </div>
                <p className="font-semibold">자전거 이름</p>
              </div>
              <p>자전거 주행 기록</p>
            </div>
          </div>
          <Link to="/mypage/record/all">
            <div className="flex justify-between text-sm">
              <p>전체 주행 기록</p>
              <ChevronRightIcon className="w-4 h-4" />
            </div>
          </Link>
          <div className="text-sm">
            <p>주간 분석</p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecord;
