import { startRidingApi } from "../apis/riding";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
import { useLocationStore } from "../store/locationStore";

function MainPage() {
  const { longitude, latitude, speed } = useLocationStore();

  const navigate = useNavigate();
  async function handleClickRiding() {
    const res = await startRidingApi();
    if (res === 200) {
      navigate("/riding");
    }
  }
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <div className="px-2 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/register/terms"
              className="text-blue-500 hover:underline"
            >
              회원가입
            </Link>
            <Link to="/login" className="text-blue-500 hover:underline">
              로그인
            </Link>

            <div>
              <p>Latitude: {latitude !== null ? latitude : "N/A"}</p>
              <p>Longitude: {longitude !== null ? longitude : "N/A"}</p>
              <p>Speed: {speed !== null ? speed : "N/A"}</p>
            </div>
          </div>
          <div>
            <Link to="/riding/before" className="text-blue-500 hover:underline">
              주행 전 설정
            </Link>
          </div>
          <div>
            <div
              className="text-blue-500 hover:underline"
              onClick={handleClickRiding}
            >
              주행
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
