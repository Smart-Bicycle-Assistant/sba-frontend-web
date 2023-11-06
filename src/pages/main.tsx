import Navbar from "../components/common/Navbar";
import { useUserLocation } from "../store/userStore";
import { RidingLocationApi } from "../apis/riding";
import { Link } from "react-router-dom";

function MainPage() {
  const { longitude, latitude, speed } = useUserLocation();

  const { setLocation } = useUserLocation();
  function handleMessage(e: { data: string }) {
    const { latitude, longitude, speed } = JSON.parse(e.data);
    setLocation({
      latitude,
      longitude,
      speed,
    });
  }
  setInterval(() => {
    window.addEventListener("message", handleMessage);
  }, 1000);

  RidingLocationApi({
    longitude: longitude,
    latitude: latitude,
    packMode: true,
    speed: speed,
  });

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <div className="py-4 px-2">
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
            <Link to="/riding" className="text-blue-500 hover:underline">
              주행
            </Link>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
