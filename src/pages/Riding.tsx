import PackModal from '../components/common/PackModal';
import AlertModal from '../components/common/AlertModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationStore } from '../store/locationStore';
import { useRidingStore } from '../store/ridingStore';
import { useModalStore } from '../store/modalStore';
import { useEffect, useState } from 'react';
import { CustomMarker, redMarker } from '../components/common/CustomMarker';
import { calculateDistance } from '../utils/riding';
import { formatToTwoDecimals, formatSpeed } from '../utils/format';
import { RidingLocationApi, postRidingRecordApi } from '../apis/riding';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationData {
  nickname: string;
  longitude: number;
  latitude: number;
}

interface packRidingUser {
  nickname: string;
  longitude: number;
  latitude: number;
}

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);

  return null;
};

const RidingPage: React.FC = () => {
  const { state } = useLocation();
  const { packMode, targetSpeed, rearDetection, setIsRiding, setRearDetection, setPackMode } =
    useRidingStore();
  const { latitude, longitude, speed, maxSpeed } = useLocationStore();
  const { alertModal } = useModalStore();

  const [packUsers, setPackUsers] = useState<packRidingUser[]>([]);

  const [prevCoord, setPrevCoord] = useState<[number, number]>([
    Number(state.currentCoord[0]),
    Number(state.currentCoord[1]),
  ]);

  const [distance, setDistance] = useState<number>(0);
  const [mapCenter, setMapCenter] = useState<[number, number]>([latitude, longitude + 0.004]);
  const [time, setTime] = useState<[number, number]>([0, 0]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePackRiding = async (
    latitude: number,
    longitude: number,
    packMode: boolean,
    curSpeed: number
  ): Promise<LocationData[]> => {
    const res = await RidingLocationApi({
      longitude,
      latitude,
      packMode,
      targetSpeed,
      curSpeed: curSpeed,
    });
    // todo : 임시로 넣은 값 제거하기

    setPackUsers(res.data);
    return res.data;
  };

  useEffect(() => {
    timer(state.startTime);
    startTimer(state.startTime);
  }, []);

  useEffect(() => {
    getDistance();
    setPrevCoord([latitude, longitude]);
  }, [latitude]);

  useEffect(() => {
    const res = handlePackRiding(latitude, longitude, packMode, speed);
    console.log(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, speed, packMode, targetSpeed]);

  useEffect(() => {
    console.log(mapCenter);
    setMapCenter([latitude, longitude + 0.004]);
  }, [latitude, longitude]);

  const timer = (startTime: Date) => {
    const currentTime = new Date();
    const hours = currentTime.getHours() - startTime.getHours();
    const mins = currentTime.getMinutes() - startTime.getMinutes();
    setTime([hours, mins]);
  };

  const startTimer = (startTime: Date) => {
    setInterval(() => timer(startTime), 60000);
  };

  const getDistance = () => {
    return setDistance(
      distance + calculateDistance(latitude, longitude, prevCoord[0], prevCoord[1])
    );
  };

  const ridingStop = async () => {
    try {
      const res = await postRidingRecordApi({
        ridingTime: state.startTime.getTime(),
        distance: distance,
        maxSpeed: maxSpeed,
        ridingDuration: new Date().getTime() - state.startTime.getTime(),
      });

      if (res.status === 200) {
        console.log('Complete');
        setIsRiding(false);
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModalHandler = () => {
    setOpenModal(!openModal);
  };

  const packChangeHandler = () => {
    if (!packMode === true) {
      setOpenModal(true);
    }

    setPackMode(!packMode);
  };

  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="static w-full">
          <MapContainer
            style={{
              position: 'static',
              width: `100vw`,
              height: `100vh`,
              zIndex: 0,
            }}
            center={[latitude, longitude]}
            zoom={16}
            minZoom={11}
            scrollWheelZoom={true}
            attributionControl={false}
            className="leaflet-container"
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={redMarker}>
              <Popup>me~</Popup>
            </Marker>
            {packUsers &&
              packUsers.map((marker, index) => (
                <div>
                  <p>{marker.nickname}</p>
                  <Marker
                    key={index}
                    position={[marker.latitude, marker.longitude]}
                    icon={CustomMarker}
                  >
                    <Tooltip direction="top" offset={[25, 20]} permanent>
                      <span>{marker.nickname}</span>
                    </Tooltip>
                  </Marker>
                </div>
              ))}
            {state && <Polyline positions={state.geometry} color={'#0064FF'} />}
            <RecenterAutomatically lat={latitude} lng={longitude} />
          </MapContainer>
          <div className="absolute top-0 left-1/2 w-1/2 h-screen bg-gradient-to-r from-0% from-transparent to-95% to-primary-400 opacity-50"></div>
          <div className="absolute top-0 flex items-center justify-center w-1/2 h-screen left-1/2">
            <div className="flex flex-col w-full py-8 pr-8 gap-y-3">
              <div className="w-full p-4 bg-slate-100 rounded-2xl drop-shadow-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex flex-col justify-between px-4 py-3 bg-white rounded-lg gap-y-3">
                      <div className="flex items-center gap-x-1 text-gray-light">
                        <span className="text-xl material-symbols-outlined">speed</span>
                        <p className="text-sm">현재속도</p>
                      </div>
                      <div className="flex items-end gap-x-1">
                        <p className="text-6xl font-semibold text-red-500">
                          {formatToTwoDecimals(formatSpeed(speed))}
                        </p>
                        <p className="pb-3 text-base text-gray-light">km/h</p>
                      </div>
                    </div>
                    <div className="flex pt-2 pl-2 gap-x-2">
                      <div className="flex items-center gap-x-1 text-gray-light">
                        <p className="text-xs text-gray-light">최대속도</p>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <p className="text-2xl font-semibold text-gray-dark">
                          {formatToTwoDecimals(formatSpeed(maxSpeed))}
                        </p>
                        <p className="text-sm text-gray-light">km/h</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center bg-white rounded-lg">
                    <div className="flex flex-col justify-center px-4 py-3 text-sm">
                      <div className="flex items-center gap-x-1 text-gray-light">
                        <span className="text-xl material-symbols-outlined">directions_bike</span>
                        <p className="text-sm">주행거리</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-x-1">
                          <p className="text-2xl font-semibold text-gray-dark">
                            {formatToTwoDecimals(distance)}
                          </p>
                          <p className="text-sm text-gray-light">km</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 pb-3 text-sm">
                      <div className="flex items-center gap-x-1 text-gray-light">
                        <span className="text-xl material-symbols-outlined">schedule</span>
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
              <div className="flex w-full gap-x-3">
                <div className="w-1/2">
                  <div className="flex items-center justify-between w-full px-6 py-2 bg-slate-100 rounded-2xl drop-shadow-lg">
                    <div className="flex items-center gap-x-1">
                      <span className="text-lg material-symbols-outlined text-light-700">
                        group
                      </span>
                      <p className="text-sm text-light-700">팩라이딩</p>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={packMode}
                          onChange={() => packChangeHandler()}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer peer-focus:outline-none rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex items-center justify-between w-full px-6 py-2 bg-slate-100 rounded-2xl drop-shadow-lg">
                    <div className="flex items-center gap-x-1">
                      <span className="text-lg material-symbols-outlined text-light-700">
                        directions_car
                      </span>
                      <p className="text-sm text-light-700">후방감지</p>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={rearDetection}
                          onChange={() => setRearDetection(!rearDetection)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer peer-focus:outline-none rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-x-3">
                <div className="w-1/2"></div>
                <div className="w-1/2">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full py-2 bg-red-500 gap-x-1 rounded-2xl drop-shadow-lg"
                    onClick={ridingStop}
                  >
                    <span className="text-lg text-white material-symbols-outlined">cancel</span>
                    <p className="text-sm font-semibold text-white">주행종료</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-lg">
          <div className="flex flex-col gap-y-3 animate-fade-in-down">
            <PackModal toggleModalHandler={toggleModalHandler} />
          </div>
        </div>
      )}
      {alertModal && (
        <div className="fixed left-0 top-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 rounded-lg">
          <div className="flex flex-col gap-y-3 animate-fade-in-down">
            <AlertModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default RidingPage;
