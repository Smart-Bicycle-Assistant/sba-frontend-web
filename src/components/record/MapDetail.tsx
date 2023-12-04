import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapDetailProps = {
  latitude: number;
  longtitude: number;
  geometryData: [number, number][];
  setOpenMapDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapDetail: React.FC<MapDetailProps> = ({
  latitude,
  longtitude,
  geometryData,
  setOpenMapDetail,
}) => {
  return (
    <div className="relative">
      <MapContainer
        style={{
          height: `calc(100vh - 3.5rem - 54px)`,
        }}
        center={[latitude, longtitude]}
        zoom={17}
        minZoom={13}
        scrollWheelZoom={true}
        attributionControl={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={geometryData} color={'#0064FF'} />
      </MapContainer>
      <div
        className="flex items-center gap-x-0.5 rounded-lg bg-rose-500 absolute top-3 right-3 px-2.5 py-1 z-[9999]"
        onClick={() => setOpenMapDetail(false)}
      >
        <p className="text-sm text-white">지도 닫기</p>
        <span className="material-symbols-outlined text-base text-white">close</span>
      </div>
    </div>
  );
};

export default MapDetail;
