import Navbar from "../components/common/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPage: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="relative">
        <div className="w-full h-screen">
          <MapContainer
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
            <Marker position={[37.56675, 126.97842]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          {/* <div className="flex items-center w-full bg-white h-12 absolute top-0 z-[10000]">
            <p>검색창</p>
          </div> */}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MapPage;
