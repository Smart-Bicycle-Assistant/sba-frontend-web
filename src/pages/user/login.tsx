import useInput from '../../hooks/useInput';
import Header from '../../components/common/Header';

import { useUser } from '../../store/userStore';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../../apis/user';
import { useToken } from '../../store/tokenStore';

function LoginPage() {
  const { value: id, onChange: onIdChange, setValue: setId } = useInput();
  const { value: password, onChange: onPasswordChange, setValue: setPassword } = useInput();
  const navigate = useNavigate();

  const { setUser, setLoggedIn } = useUser();
  const { setToken } = useToken();

  const onSubmit = async () => {
    if (id === '' || password === '') {
      return;
    }

    try {
      const res = await LoginApi({ id, password });
      console.log(res);
      if (res.message === 'OK') {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser({
          id: res.data.id,
          email: res.data.email,
          nickname: res.data.nickname,
        });
        setLoggedIn();
        navigate('/home');
        console.log(res);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setId('');
      setPassword('');
    }
  };
  const handleEnterKey = (event: { key: string }) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div>
      <div>
        <Header menu="로그인" showBackArrow={true} />
        <div className="px-8 mx-auto">
          <div className="my-10">
            <input
              placeholder="아이디"
              className="w-full px-3 py-3 text-xs bg-gray-100 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={id}
              onChange={onIdChange}
              onKeyDown={handleEnterKey}
            />

            <input
              placeholder="비밀번호"
              className="w-full px-3 py-3 mt-4 text-xs bg-gray-100 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={onPasswordChange}
              onKeyDown={handleEnterKey}
              autoComplete="current-password"
            />
          </div>
          <button
            className="bg-primary-default w-full font-medium text-sm text-white py-2.5 px-4 rounded-lg hover:bg-opacity-80"
            onClick={onSubmit}
          >
            로그인
          </button>
          <div className="mt-10 text-[11px] justify-between flex text-gray-500">
            <Link to="/register">{'회원가입 > '}</Link>
            <Link to="/">비밀번호 찾기</Link>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-gray-300 bottom-0 px-7 pt-16">
        로그인 완료 시 SBA 앱에 ‘자동 로그인'됩니다. 본인 기기가 아니거나 여러 사람이 사용중인
        기기인 경우 로그아웃을 해주세요.
      </div>
    </div>
  );
}

export default LoginPage;
