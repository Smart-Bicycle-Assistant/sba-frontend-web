import Navbar from "../components/common/Navbar";

function MainPage() {
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <div className="py-4 px-2">
          <div className="flex items-center justify-between">
            <a href="/register" className="text-blue-500 hover:underline">
              회원가입
            </a>
            <a href="/login" className="text-blue-500 hover:underline">
              로그인
            </a>
          </div>
          <div>
            <a href="/mypage" className="text-blue-500 hover:underline">
              마이페이지
            </a>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
