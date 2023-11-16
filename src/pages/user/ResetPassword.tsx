import { useNavigate } from 'react-router-dom';
import { ResetPasswordApi } from '../../apis/user';
import Header from '../../components/common/Header';
import { useUser } from '../../store/userStore';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  async function handleResetPassword() {
    const { id, email } = useUser.getState();

    const response = await ResetPasswordApi(id);
    if (response.status == 200) {
      alert(`새로운 비밀번호가 ${email}로 전송되었습니다. 이메일을 확인해주세요.`);
      navigate('/');
    } else {
      alert(response.message);
    }
  }

  return (
    <div>
      <Header menu="비밀번호 초기화" showBackArrow={true} />
      <div className="mx-4 mt-6">
        <p className="px-5 pt-10 mb-4 text-sm text-gray-500">
          비밀번호 초기화를 요청하면, 가입 시 기입한 이메일로 새로운 비밀번호가 전송됩니다.
        </p>
        <p className="px-5 pt-1 mb-4 text-sm text-gray-500">
          메일을 확인하고 새로운 비밀번호로 로그인하세요.
        </p>
        <div className="fixed bottom-0 left-0 right-0 p-4">
          <button
            className="text-white py-2.5 px-4 rounded-lg w-full bg-customColor"
            onClick={handleResetPassword}
          >
            비밀번호 초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
