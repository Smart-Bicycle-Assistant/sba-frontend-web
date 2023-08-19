function MainPage() {
  return (
    <div className="py-4 px-2 flex items-center ">
      <a
        href="/register"
        className="bg-customColor text-white m-10 hover:underline px-3"
      >
        회원가입
      </a>
      <a
        href="/login"
        className="bg-customColor text-white m-10 hover:underline px-3"
      >
        로그인
      </a>
    </div>
  );
}

export default MainPage;
