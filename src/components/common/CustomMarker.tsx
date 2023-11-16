import L from 'leaflet';
import pin from '../../assets/pin.svg';

// Create a custom icon using an image URL
const CustomMarker = L.icon({
  iconUrl: pin,
  iconSize: [50, 50],
  iconAnchor: [0, 0],
});

export default CustomMarker;
