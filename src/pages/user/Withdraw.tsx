import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { useUser } from '../../store/userStore';
import { WithdrawApi } from '../../apis/user';

export const Withdraw: React.FC = () => {
  const { nickname } = useUser();
  const navigate = useNavigate();

  async function handleWithdraw() {
    const res = await WithdrawApi();
    if (res.status == 200) {
      alert('회원탈퇴 완료');
      localStorage.clear();
      navigate('/');
    }
  }

  return (
    <div>
      <Header menu="회원탈퇴" showBackArrow={true} />
      <div className="mt-10 ml-5">
        <div className="flex text-lg text-semibold">
          <p className="mr-1 text-xl font-bold text-customColor">{nickname}</p>
          <p>{' 님,'}</p>
        </div>
        <p>탈퇴하기 전에 확인해주세요</p>
      </div>
      <ul className="p-6 text-gray-500">
        <li className="mb-4 text-sm">
          {`S_BA에서 관리했던 ${nickname}님의 모든 개인정보를 다시 볼 수 없어요.`}
        </li>
        <li className="mb-4 text-sm">
          {`S_BA에서 관리했던 ${nickname}님의 자전거 관리 정보를 다시 볼 수 없어요.`}
        </li>
        <li className="mb-4 text-sm ">
          {`S_BA에서 관리했던 ${nickname}님의 주행 기록을 다시 볼 수 없어요.`}
        </li>
      </ul>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          className="text-white py-2.5 px-4 rounded-lg w-full bg-customColor"
          onClick={() => {
            handleWithdraw();
          }}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
