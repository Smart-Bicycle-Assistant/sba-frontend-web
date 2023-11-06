import L from 'leaflet';

// Create a custom icon using an image URL
const CustomMarker = L.icon({
  iconUrl: '../../assets/pin.png',
  iconSize: [100, 100],
  iconAnchor: [16, 32],
});

export default CustomMarker;
