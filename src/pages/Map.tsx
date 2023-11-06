import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserLocation } from '../store/userStore';
import Navbar from '../components/common/Navbar';
import useInput from '../hooks/useInput';
// import Openrouteservice from 'openrouteservice-js';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AddressType, StepType } from '../types';
import {
  keywordSearch,
  decodePolyline,
  getBicycleDirectionApi,
} from '../apis/map';
import CustomMarker from '../components/common/CustomMarker';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type SearchPageType = 'DEFAULT' | 'START' | 'END';
type SearchResultType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

const MapPage: React.FC = () => {
  const [startCoord, setStartCoord] = useState<[number, number]>();
  const [endCoord, setEndCoord] = useState<[number, number]>();
  const [startSearchList, setStartSearchList] = useState<AddressType[]>([]);
  const [endSearchList, setEndSearchList] = useState<AddressType[]>([]);
  const [step, setStep] = useState<StepType[]>([]);
  const [geometry, setGeometry] = useState<[number, number][]>([]);
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);
  const [searchPageFull, setSearchPageFull] =
    useState<SearchPageType>('DEFAULT');
  const [subPageFull, setSubPageFull] = useState<boolean>(false);

  const { latitude, longitude, speed } = useUserLocation();
  const navigate = useNavigate();

  const {
    value: startInput,
    onChange: onStartInput,
    setValue: setStartInput,
  } = useInput();
  const {
    value: endInput,
    onChange: onEndInput,
    setValue: setEndInput,
  } = useInput();

  const toggleSubPage = () => {
    setSubPageFull(!subPageFull);
  };

  const toggleSearchPage = () => {
    setSearchPageOpen(!searchPageOpen);
    setStartSearchList([]);
    setEndSearchList([]);
  };

  const handleRidingStart = () => {
    navigate('/riding', {
      state: { startCoord: startCoord, endCoord: endCoord, geometry: geometry },
    });
  };

  const inputHandler = async (
    input: string,
    setSearchList: Dispatch<SetStateAction<AddressType[]>>
  ) => {
    keywordSearch<SearchResultType>(input)
      .then((result: SearchResultType[]) => {
        console.log(result);
        setSearchList(
          result.map((el) => ({
            label: el.place_name,
            x: Number(el.x),
            y: Number(el.y),
          }))
        );
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // const orsDirections = new Openrouteservice.Directions({
  //   host: import.meta.env.VITE_MAP_SERVER_API,
  //   api_key: import.meta.env.VITE_MAP_API,
  // });

  const getDirections = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (startCoord && endCoord) {
        const res = await getBicycleDirectionApi(
          startCoord[1],
          startCoord[0],
          endCoord[1],
          endCoord[0]
        );

        console.log(decodePolyline(res.routes[0].geometry, false));

        setGeometry(decodePolyline(res.routes[0].geometry, false));
        setStep(res.routes[0].segments[0].steps);
        setSearchPageOpen(false);
      }
      // const res = await orsDirections.calculate({
      //   coordinates: [startCoord, endCoord],
      //   profile: 'cycling-regular',
      //   extra_info: ['waytype', 'steepness'],
      //   format: 'json',
      // });
    } catch (err) {
      console.log('Error');
    }
  };

  return (
    <div className="h-screen">
      <div className="relative">
        <div className="flex flex-col justify-center w-full px-4 bg-white absolute top-0 z-[10000] rounded-b-lg">
          <div
            className="flex flex-col items-center justify-center w-full py-2"
            onClick={toggleSearchPage}
          >
            {searchPageOpen ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </div>
          {searchPageOpen && (
            <form
              className="flex flex-col gap-y-2 pb-4"
              onSubmit={(e) => getDirections(e)}
            >
              <input
                placeholder="출발지"
                className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={startInput}
                onClick={() => setSearchPageFull('START')}
                onChange={(e) => {
                  onStartInput(e);
                  inputHandler(startInput, setStartSearchList);
                }}
              />
              {searchPageFull === 'START' && startSearchList.length > 0 && (
                <div className="flex flex-col gap-y-2 rounded-lg overflow-auto">
                  {startSearchList.map((el, index) => (
                    <div
                      key={index}
                      className="px-3 py-3 bg-gray-100 rounded-lg text-xs hover:bg-gray-200"
                      onClick={() => {
                        setStartInput(el.label);
                        setStartCoord([el.x, el.y]);
                        setSearchPageFull('DEFAULT');
                      }}
                    >
                      {el.label}
                    </div>
                  ))}
                </div>
              )}
              <input
                placeholder="도착지"
                className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={endInput}
                onClick={() => setSearchPageFull('END')}
                onChange={(e) => {
                  onEndInput(e);
                  inputHandler(endInput, setEndSearchList);
                }}
              />
              {searchPageFull === 'END' && endSearchList.length > 0 && (
                <div className="flex flex-col gap-y-2 rounded-lg overflow-auto">
                  {endSearchList.map((el, index) => (
                    <div
                      key={index}
                      className="px-3 py-3 bg-gray-100 rounded-lg text-xs hover:bg-gray-200"
                      onClick={() => {
                        setEndInput(el.label);
                        setEndCoord([el.x, el.y]);
                        setSearchPageFull('DEFAULT');
                      }}
                    >
                      {el.label}
                    </div>
                  ))}
                </div>
              )}
              <input
                type="submit"
                className="bg-customColor w-full font-medium text-sm text-white py-2.5 px-4 rounded-lg hover:bg-opacity-80"
                value="검색"
              ></input>
            </form>
          )}
        </div>
        {startCoord !== undefined &&
        endCoord !== undefined &&
        step.length > 0 ? (
          <div className="w-full h-screen">
            <div className="w-full h-full">
              <MapContainer
                style={{ height: '50%' }}
                center={[
                  (startCoord[1] + endCoord[1]) / 2,
                  (startCoord[0] + endCoord[0]) / 2,
                ]}
                zoom={13}
                scrollWheelZoom={true}
                attributionControl={false}
                className="leaflet-container"
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={startCoord} icon={CustomMarker}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                <Marker position={endCoord} icon={CustomMarker}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                <Polyline positions={geometry} color={'red'} />
              </MapContainer>
            </div>
            <div
              className={`flex flex-col gap-y-3 w-full bg-white overflow-auto absolute bottom-0 mb-14 pt-4 pb-6 px-6 z-[10000] ${
                subPageFull ? `h-[calc(100%-3.5rem)]` : `h-80 rounded-t-xl`
              }`}
            >
              <div className="flex justify-center">
                {subPageFull ? (
                  <ChevronDownIcon
                    className="w-5 h-5"
                    onClick={toggleSubPage}
                  />
                ) : (
                  <ChevronUpIcon className="w-5 h-5" onClick={toggleSubPage} />
                )}
              </div>
              <div>
                {step.map((el, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{el.instruction}</p>
                      <div className="flex flex-col justify-center">
                        <p className="text-xl font-semibold">{el.distance}m</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full bg-customColor text-sm text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
                  onClick={handleRidingStart}
                >
                  주행 시작
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen">
            <MapContainer
              style={{
                height: `calc(100vh - 3.5rem)`,
              }}
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
              <Marker position={[latitude, longitude]} icon={CustomMarker}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default MapPage;
