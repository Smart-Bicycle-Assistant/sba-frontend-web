import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserLocation } from '../store/userStore';
import Search from '../components/map/Search';
import Routing from '../components/map/Routing';
import Navbar from '../components/common/Navbar';
import CustomMarker from '../components/common/CustomMarker';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { RouteType } from '../types';
import { decodePolyline, getBicycleDirectionApi } from '../apis/map';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import 'leaflet/dist/leaflet.css';

const MapPage: React.FC = () => {
  const [startCoord, setStartCoord] = useState<[number, number]>();
  const [endCoord, setEndCoord] = useState<[number, number]>();
  const [route, setRoute] = useState<RouteType>();
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);
  const [routingPageOpen, setRoutingPageOpen] = useState<boolean>(false);

  const { latitude, longitude } = useUserLocation();

  const navigate = useNavigate();

  const togglePage = (page: boolean, setPage: React.Dispatch<React.SetStateAction<boolean>>) => {
    setPage(!page);
  };

  const handleRidingStart = () => {
    navigate('/riding', {
      state: {
        startCoord: startCoord,
        endCoord: endCoord,
        geometry: route?.geometry,
        distance: route?.distance,
        startTime: new Date(),
      },
    });
  };

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

        setRoute({
          distance: res.routes[0].summary.distance,
          step: res.routes[0].segments[0].steps,
          geometry: decodePolyline(res.routes[0].geometry, false),
        });

        setSearchPageOpen(false);
      }
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
            onClick={() => togglePage(searchPageOpen, setSearchPageOpen)}
          >
            {searchPageOpen ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </div>
          {searchPageOpen && (
            <Search
              getDirections={getDirections}
              setStartCoord={setStartCoord}
              setEndCoord={setEndCoord}
            />
          )}
        </div>
        {startCoord !== undefined && endCoord !== undefined && route !== undefined ? (
          <div className="w-full h-screen">
            <div className="w-full h-full">
              <MapContainer
                style={{ height: '50%' }}
                center={[(startCoord[1] + endCoord[1]) / 2, (startCoord[0] + endCoord[0]) / 2]}
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
                <Polyline positions={route.geometry} color={'red'} />
              </MapContainer>
            </div>
            <div
              className={`flex flex-col gap-y-3 w-full bg-white overflow-auto absolute bottom-0 mb-14 pt-4 pb-6 px-6 z-[10000] ${
                routingPageOpen ? `h-[calc(100%-3.5rem)]` : `h-80 rounded-t-xl`
              }`}
            >
              <div
                className="flex justify-center"
                onClick={() => togglePage(routingPageOpen, setRoutingPageOpen)}
              >
                {routingPageOpen ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronUpIcon className="w-5 h-5" />
                )}
              </div>
              <Routing step={route.step} handleRidingStart={handleRidingStart} />
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
