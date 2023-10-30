import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import { MapPinIcon } from "@heroicons/react/20/solid";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyPageRecordDetail: React.FC = () => {
  const marker = [
    [37.56675, 126.97842],
    [37.56649, 126.99209],
  ];

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu="주행 기록" />
        <div className="flex flex-col gap-y-8 px-8 py-8 mx-auto">
          <div>
            <div className="flex items-center gap-x-2 text-sm pb-1">
              <div className="w-6 h-6 bg-neutral-200 rounded-full">
                {/* <img src="" alt="bike"></img> */}
              </div>
              <p className="font-base text-xs">자전거 1</p>
            </div>
            <div>
              <p className="text-xl font-semibold">2023년 8월 15일 주행 기록</p>
            </div>
          </div>
          <div>
            <p className="pb-3 text-sm font-semibold">경로 다시보기</p>
            <div className="flex justify-center items-center w-full">
              <div className="w-full rounded-lg">
                <MapContainer
                  style={{ height: "10rem", borderRadius: "0.5rem" }}
                  center={[37.56675, 126.97842]}
                  zoom={13}
                  scrollWheelZoom={true}
                  attributionControl={false}
                  className="leaflet-container"
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  />
                  {marker.map((el, index) => (
                    <Marker key={index} position={[el[0], el[1]]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  ))}
                  <Polyline
                    positions={[
                      [marker[0][0], marker[0][1]],
                      [marker[1][0], marker[1][1]],
                    ]}
                    color={"blue"}
                  />
                </MapContainer>
              </div>
            </div>
          </div>
          <div>
            <p className="pb-3 text-sm font-semibold">주행 기록</p>
            <div className="border rounded-lg shadow-sm">
              <div className="flex flex-col gap-y-3 p-4 text-xs">
                <div className="flex items-start gap-x-3">
                  <div className="flex items-center gap-x-1">
                    <MapPinIcon className="w-5 h-5" />
                    <p>출발</p>
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <p>3시 5분</p>
                    <p>경기도 어디시 어디구 어디동 17-1</p>
                  </div>
                </div>
                <div className="flex items-start gap-x-3">
                  <div className="flex items-center gap-x-1">
                    <MapPinIcon className="w-5 h-5" />
                    <p>도착</p>
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <p>3시 35분</p>
                    <p>경기도 거기시 거기구 거기동 426</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">주행 통계</p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordDetail;
