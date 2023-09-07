const Navbar: React.FC = () => {
  return (
    <div className="flex w-full h-14 border-t-2 text-sm fixed bottom-0 bg-white">
      <div className="flex justify-center items-center w-1/4">
        <a href="/">홈</a>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <a href="/map">지도</a>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <a href="/bicycle">자전거</a>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <a href="/mypage">내 정보</a>
      </div>
    </div>
  );
};

export default Navbar;
