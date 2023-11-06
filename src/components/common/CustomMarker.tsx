import L from 'leaflet';
import pin from '../../assets/pin.png';

// Create a custom icon using an image URL
const CustomMarker = L.icon({
  iconUrl: pin,
  iconSize: [30, 90],
  iconAnchor: [16, 32],
});

export default CustomMarker;
