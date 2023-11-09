import { useLocation, useNavigate } from 'react-router-dom';
import { useUserLocation, useRiding } from '../store/userStore';
import { useEffect, useState } from 'react';
import CustomMarker from '../components/common/CustomMarker';
import { convertMeterToKilometer } from '../apis/map';
import { RidingLocationApi } from '../apis/riding';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RidingPage: React.FC = () => {
  const { state } = useLocation();
  const { packMode, targetSpeed } = useRiding();
  const { latitude, longitude, speed } = useUserLocation();

  const [mapCenter, setMapCenter] = useState<[number, number]>([latitude, longitude]);
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
      <div className="w-1/2">
        <MapContainer
          style={{
            width: `50vw`,
            height: `100vh`,
          }}
          center={mapCenter}
          zoom={13}
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
      </div>
      <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3 text-center p-6">
        <div className="flex flex-col gap-y-2 justify-center items-center p-6 bg-slate-100 rounded-lg">
          <p className="text-sm">현재 속도</p>
          <div>
            <p className="text-5xl font-semibold">{Math.round(speed * 3.6)}</p>
            <p className="text-xs">km/h</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-center p-6 bg-slate-100 rounded-lg text-sm">
          <p className="text-sm">주행 시간</p>
          <div>
            {time[0] === 0 ? (
              <div>
                <p className="text-5xl font-semibold">{time[1]}</p>
                <p className="text-xs">분</p>
              </div>
            ) : (
              <div>
                <p className="text-5xl font-semibold">{time[1]}</p>
                <p className="text-xs">분</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-center p-6 bg-slate-100 rounded-lg text-sm">
          <p className="text-sm">총 거리</p>
          <div>
            {state.distance >= 1000 ? (
              <div>
                {' '}
                <p className="text-5xl font-semibold">
                  {Math.round(convertMeterToKilometer(state.distance) * 100) / 100}
                </p>
                <p className="text-xs">km</p>
              </div>
            ) : (
              <div>
                <p className="text-5xl font-semibold">{Math.round(state.distance * 100) / 100}</p>
                <p className="text-xs">m</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-center p-6 bg-slate-100 rounded-lg text-sm">
          <p className="text-sm">평균 속도</p>
          <div>
            <p className="text-5xl font-semibold">0</p>
            <p className="text-xs">km/h</p>
          </div>
        </div>
        <div className="col-span-2">
          <button
            type="button"
            className="w-full bg-red-200 rounded-lg py-3 text-sm"
            onClick={() => {
              navigate('/');
            }}
          >
            주행 종료
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidingPage;
