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
          height: `calc(100vh - 6.8rem)`,
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
      {/* <div className="absolute top-0 z-[9998] w-full h-1/2 bg-gradient-to-b from-slate-700 to-20% to-[#ffffff00]"></div> */}
      <div className="absolute top-0 right-0 p-4 z-[9999]" onClick={() => setOpenMapDetail(false)}>
        <span className="material-symbols-outlined text-2xl text-white">close</span>
      </div>
    </div>
  );
};

export default MapDetail;
