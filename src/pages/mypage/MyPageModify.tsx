import { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useUser } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { RefreshApi, updateUserInfo } from '../../apis/user';

function MyPageModify() {
  const { id, email, nickname, setUser } = useUser();

  const { value: modifyId, onChange: onModifyIdChange, setValue: setModifyId } = useInput();
  const {
    value: modifyEmail,
    onChange: onModifyEmailChange,
    setValue: setModifyEmail,
  } = useInput();
  const {
    value: modifyNickname,
    onChange: onModifyNicknameChange,
    setValue: setModifyNickname,
  } = useInput();

  const [modify, setModify] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setModifyId(id);
    setModifyEmail(email);
    setModifyNickname(nickname);
  }, []);

  const modifyUserInfo = async () => {
    const res = await updateUserInfo(modifyId, modifyEmail, modifyNickname);

    if (res.status === 200) {
      const res = await RefreshApi();

      if (res.message === 'OK') {
        setUser({
          id: res.data.id,
          email: res.data.email,
          nickname: res.data.nickname,
        });
      }

      setModify(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu={'회원 정보'} showBackArrow={true} />
        <div className="flex flex-col px-8 py-8 mx-auto gap-y-8">
          <div className="p-6 border border-gray-200 rounded-lg">
            <form className="flex flex-col gap-y-3.5 mb-6">
              <div>
                <p className="mb-2 text-xs text-gray-600">이름</p>
                <input
                  type="text"
                  className={`w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 ${
                    modify
                      ? `text-black focus:outline-none focus:ring-2 focus:ring-blue-500`
                      : `text-gray-400`
                  }`}
                  onChange={onModifyNicknameChange}
                  disabled={modify ? false : true}
                  value={modifyNickname}
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">이메일</p>
                <input
                  type="text"
                  className={`w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 ${
                    modify
                      ? `text-black focus:outline-none focus:ring-2 focus:ring-blue-500`
                      : `text-gray-400`
                  }`}
                  onChange={onModifyEmailChange}
                  disabled={modify ? false : true}
                  value={modifyEmail}
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">아이디</p>
                <input
                  type="text"
                  className={`w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 text-gray-400`}
                  onChange={onModifyIdChange}
                  disabled={true}
                  value={modifyId}
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">비밀번호</p>
                <input
                  type="password"
                  className="w-full text-xs placeholder-slate-400 bg-gray-100 text-gray-400 rounded-lg py-3 px-3 mb-2"
                  value="********"
                  disabled={true}
                ></input>
              </div>
            </form>
            {modify ? (
              <button
                className="text-sm w-full bg-primary-default text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
                onClick={modifyUserInfo}
              >
                저장하기
              </button>
            ) : (
              <button
                className="text-sm w-full bg-primary-default text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
                onClick={() => setModify(true)}
              >
                변경하기
              </button>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="text-xs text-gray-500 underline"
              onClick={() => {
                navigate('/password/change');
              }}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MyPageModify;
