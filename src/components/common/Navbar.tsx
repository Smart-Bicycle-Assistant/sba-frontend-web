import { Link, useNavigate } from "react-router-dom";
import { useMainBike } from "../../store/userStore";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { main } = useMainBike();
  return (
    <div className="fixed bottom-0 flex w-full text-sm bg-white border-t-2 h-14">
      <div className="flex items-center justify-center w-1/4">
        <Link to="/">홈</Link>
      </div>
      <div className="flex items-center justify-center w-1/4">
        <Link to="/map">지도</Link>
      </div>
      <div className="flex items-center justify-center w-1/4">
        <div
          onClick={() => {
            navigate("/bicycle/detail"), { state: main };
          }}
        >
          관리
        </div>
      </div>
      <div className="flex items-center justify-center w-1/4">
        <Link to="/mypage">내 정보</Link>
      </div>
    </div>
  );
};

export default Navbar;
