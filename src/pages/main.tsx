import Navbar from "../components/common/Navbar";
import { useLocation } from "../store/userStore";
import { RidingLocationApi } from "../apis/riding";

function MainPage() {
  const location = useLocation();

  RidingLocationApi({
    id: "1",
    longitude: location.longitude,
    latitude: location.latitude,
    packMode: true,
    speed: location.speed,
  });

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <div className="py-4 px-2">
          <div className="flex items-center justify-between">
            <a href="/register/terms" className="text-blue-500 hover:underline">
              회원가입
            </a>
            <a href="/login" className="text-blue-500 hover:underline">
              로그인
            </a>
            <div>
              <p>
                Latitude:{" "}
                {location.latitude !== null ? location.latitude : "N/A"}
              </p>
              <p>
                Longitude:{" "}
                {location.longitude !== null ? location.longitude : "N/A"}
              </p>
              <p>Speed: {location.speed !== null ? location.speed : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
