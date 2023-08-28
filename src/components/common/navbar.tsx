const Navbar: React.FC = () => {
  return (
    <div className="flex translate-y-[-100%] w-full h-14 border-t-2 text-sm">
      <div className="flex justify-center items-center w-1/4">
        
        <a href="/">홈</a>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p>지도</p>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p>자전거</p>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p>내 정보</p>
      </div>
    </div>
  );
};

export default Navbar;
