import Navbar from "../components/common/Navbar";

function MainPage() {
  return (
    <div className="py-4 px-2 flex items-center justify-between">
      <a href="/register" className="text-blue-500 hover:underline">
        회원가입
      </a>
      <a href="/login" className="text-blue-500 hover:underline">
        로그인
      </a>
    </div>
  );
}

export default MainPage;
