import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

function MyPageModify() {
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
                  className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">아이디</p>
                <input
                  type="text"
                  className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">이메일</p>
                <input
                  type="text"
                  className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-600">비밀번호</p>
                <input
                  type="text"
                  className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
            </form>
            <button className="text-sm w-full bg-customColor text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80">
              변경하기
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MyPageModify;
