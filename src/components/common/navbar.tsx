const navbar: React.FC = () => {
  return (
    <div className="flex w-full h-14 border-t-2 text-sm fixed bottom-0 bg-white">
      <div className="flex justify-center items-center w-1/4">
        <a href="/login">홈</a>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p>지도</p>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <a href="/bicycle">자전거</a>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p>내 정보</p>
      </div>
    </div>
  );
};

export default navbar;
