import { useState } from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useUserStore } from '../../store/userStore';

function MyPageModify() {
  const { id, email, nickname } = useUserStore();

  const [modify, setModify] = useState<boolean>(false);

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu={'회원 정보'} />
        <div className="flex flex-col gap-y-8 px-8 py-8 mx-auto">
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
                  disabled={modify ? false : true}
                  value={nickname}
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">아이디</p>
                <input
                  type="text"
                  className={`w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 ${
                    modify
                      ? `text-black focus:outline-none focus:ring-2 focus:ring-blue-500`
                      : `text-gray-400`
                  }`}
                  disabled={modify ? false : true}
                  value={id}
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
                  disabled={modify ? false : true}
                  value={email}
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
                <p className="text-xs text-gray-600 text-right underline">
                  비밀번호 확인하기
                </p>
              </div>
            </form>
            {modify ? (
              <button
                className="text-sm w-full bg-customColor text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
                onClick={() => setModify(false)}
              >
                저장하기
              </button>
            ) : (
              <button
                className="text-sm w-full bg-customColor text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
                onClick={() => setModify(true)}
              >
                변경하기
              </button>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MyPageModify;
