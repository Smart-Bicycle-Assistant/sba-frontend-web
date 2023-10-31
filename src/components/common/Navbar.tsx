import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="flex w-full h-14 border-t-2 text-sm fixed bottom-0 bg-white">
      <div className="flex justify-center items-center w-1/4">
        <Link to="/">홈</Link>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <Link to="/map">지도</Link>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <Link to="/bicycle">자전거</Link>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <Link to="/mypage">내 정보</Link>
      </div>
    </div>
  );
};

export default Navbar;
