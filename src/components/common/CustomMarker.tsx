import L from 'leaflet';
import pin from '../../assets/pin.png';

// Create a custom icon using an image URL
const CustomMarker = L.icon({
  iconUrl: pin,
  iconSize: [40, 40],
  iconAnchor: [0, 0],
});

export default CustomMarker;
