import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationStore } from '../store/locationStore';
import { useRidingStore } from '../store/ridingStore';
import { useEffect, useState } from 'react';
import CustomMarker from '../components/common/CustomMarker';
import { convertMeterToKilometer } from '../apis/map';
import { RidingLocationApi } from '../apis/riding';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RidingPage: React.FC = () => {
  const { state } = useLocation();
  const { packMode, targetSpeed } = useRidingStore();
  const { latitude, longitude, speed, maxSpeed } = useLocationStore();

  const [mapCenter, setMapCenter] = useState<[number, number]>([latitude, longitude + 0.004]);
  const [time, setTime] = useState<[number, number]>([0, 0]);

  const navigate = useNavigate();

  interface LocationData {
    nickname: string;
    longitude: number;
    latitude: number;
  }

  const handlePackRiding = async (
    latitude: number,
    longitude: number,
    packMode: boolean,
    targetSpeed: number | null
  ): Promise<LocationData[]> => {
    const res = await RidingLocationApi({
      longitude,
      latitude,
      packMode,
      speed: targetSpeed,
    });
    return res.data;
  };

  useEffect(() => {
    setMapCenter([latitude, longitude]);
    const res = handlePackRiding(latitude, longitude, packMode, targetSpeed);
    console.log(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, packMode, targetSpeed]);

  useEffect(() => {
    timer(state.startTime);
    startTimer(state.startTime);
  }, []);

  const timer = (startTime: Date) => {
    const currentTime = new Date();
    const hours = currentTime.getHours() - startTime.getHours();
    const mins = currentTime.getMinutes() - startTime.getMinutes();
    setTime([hours, mins]);
  };

  const startTimer = (startTime: Date) => {
    setInterval(() => timer(startTime), 60000);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-full static">
        <MapContainer
          style={{
            position: 'static',
            width: `100vw`,
            height: `100vh`,
            zIndex: 0,
          }}
          center={mapCenter}
          zoom={16}
          scrollWheelZoom={true}
          attributionControl={false}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={CustomMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {state && <Polyline positions={state.geometry} color={'red'} />}
        </MapContainer>
        <div className="absolute top-0 left-1/2 w-1/2 h-screen bg-gradient-to-r from-0% from-transparent to-95% to-primary-400 opacity-50"></div>
        <div className="absolute top-0 left-1/2 w-1/2 h-screen flex justify-center items-center">
          <div className="w-full flex flex-col gap-y-3 py-8 pr-8">
            <div className="w-full bg-slate-100 p-4 rounded-2xl drop-shadow-lg">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex flex-col justify-between gap-y-3 px-4 py-3 bg-white rounded-lg">
                    <div className="flex items-center gap-x-1 text-gray-light">
                      <span className="material-symbols-outlined text-xl">speed</span>
                      <p className="text-sm">현재속도</p>
                    </div>
                    <div className="flex items-end gap-x-1">
                      <p className="text-7xl text-red-500 font-semibold">
                        {Math.round(speed * 3.6)}
                      </p>
                      <p className="text-base text-gray-light pb-3">km/h</p>
                    </div>
                  </div>
                  <div className="flex gap-x-2 pl-2 pt-2">
                    <div className="flex items-center gap-x-1 text-gray-light">
                      {/* <span className="material-symbols-outlined text-xl">fast_forward</span> */}
                      <p className="text-xs text-gray-light">최대속도</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <p className="text-2xl font-semibold text-gray-dark">{maxSpeed}</p>
                      <p className="text-sm text-gray-light">km/h</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center bg-white rounded-lg">
                  <div className="flex flex-col justify-center px-4 py-3 text-sm">
                    <div className="flex items-center gap-x-1 text-gray-light">
                      <span className="material-symbols-outlined text-xl">directions_bike</span>
                      <p className="text-sm">주행거리</p>
                    </div>
                    <div>
                      {state.distance >= 1000 ? (
                        <div className="flex items-center gap-x-1">
                          <p className="text-2xl text-gray-dark font-semibold">
                            {Math.round(convertMeterToKilometer(state.distance) * 100) / 100}
                          </p>
                          <p className="text-sm text-gray-light">km</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-x-1">
                          <p className="text-2xl font-semibold">
                            {Math.round(state.distance * 100) / 100}
                          </p>
                          <p className="text-sm text-gray-light">m</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-4 pb-3 text-sm">
                    <div className="flex items-center gap-x-1 text-gray-light">
                      <span className="material-symbols-outlined text-xl">schedule</span>
                      <p className="text-sm">주행시간</p>
                    </div>
                    <div>
                      {time[0] === 0 ? (
                        <div className="flex items-center gap-x-1">
                          <p className="text-2xl font-semibold">{time[1]}</p>
                          <p className="text-sm text-gray-light">분</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-x-1">
                          <p className="text-2xl font-semibold">{time[1]}</p>
                          <p className="text-sm text-gray-light">분</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 w-full">
              <div className="w-1/2">
                <div className="flex justify-between items-center w-full bg-slate-100 rounded-2xl px-6 py-2 drop-shadow-lg">
                  <div className="flex items-center gap-x-1">
                    <span className="material-symbols-outlined text-light-700 text-lg">group</span>
                    <p className="text-light-700 text-sm">팩라이딩</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer peer-focus:outline-none rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex justify-between items-center w-full bg-slate-100 rounded-2xl px-6 py-2 drop-shadow-lg">
                  <div className="flex items-center gap-x-1">
                    <span className="material-symbols-outlined text-light-700 text-lg">
                      directions_car
                    </span>
                    <p className="text-light-700 text-sm">후방감지</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer peer-focus:outline-none rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 w-full">
              <div className="w-1/2"></div>
              <div className="w-1/2">
                <button
                  type="button"
                  className="flex justify-center items-center gap-x-1 w-full bg-red-500 rounded-2xl py-2 drop-shadow-lg"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <span className="material-symbols-outlined text-white text-lg">cancel</span>
                  <p className="text-white text-sm font-semibold">주행종료</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidingPage;
