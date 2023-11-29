import { Link } from 'react-router-dom';
import { useUser } from '../../store/userStore';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

const MyPageMain: React.FC = () => {
  const { nickname } = useUser();
  return (
    <div className="content_wrapper">
      <div className="content_fixed">
        <Header menu={'마이페이지'} showBackArrow={true} />
        <div className="flex flex-col content gap-y-8">
          <div className="pt-3">
            <div className="flex items-center text-lg gap-x-3">
              <p>
                <span className="font-semibold text-customColor">{nickname}</span> 님, 안녕하세요!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <div>
              <div className="text-sm text-slate-400 py-2">자전거 관리</div>
              <Link to="/bicycle">
                <div className="flex items-center py-2.5 text-sm gap-x-2 rounded-xl">
                  <span className="material-symbols-outlined text-slate-400">pedal_bike</span>
                  <p className="text-base">내 자전거</p>
                </div>
              </Link>
            </div>
            <div>
              <div className="text-sm text-slate-400 py-2">고객센터</div>
              <Link to="/">
                <div className="flex items-center py-2.5 text-sm gap-x-2 rounded-xl">
                  <span className="material-symbols-outlined text-slate-400">quiz</span>
                  <p className="text-base">FAQ</p>
                </div>
              </Link>
              <Link to="/">
                <div className="flex items-center py-2.5 text-sm gap-x-2 rounded-xl">
                  <span className="material-symbols-outlined text-slate-400">report</span>
                  <p className="text-base">회원 신고</p>
                </div>
              </Link>
            </div>
            <div>
              <div className="text-sm text-slate-400 py-2">내 정보 관리</div>
              <Link to="/mypage/modify">
                <div className="flex items-center py-2.5 text-sm gap-x-2 rounded-xl">
                  <span className="material-symbols-outlined text-slate-400">account_circle</span>
                  <p className="text-base">회원 정보</p>
                </div>
              </Link>
              <Link to="/withdraw">
                <div className="flex items-center py-2.5 text-sm gap-x-2 rounded-xl">
                  <span className="material-symbols-outlined text-slate-400">logout</span>
                  <p className="text-base">회원 탈퇴</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageMain;
