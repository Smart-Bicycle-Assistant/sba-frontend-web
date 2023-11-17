import L from 'leaflet';
import pin from '../../assets/pin.svg';
import redPin from '../../assets/pin_red.svg';

// Create a custom icon using an image URL
export const CustomMarker = L.icon({
  iconUrl: pin,
  iconSize: [50, 50],
  iconAnchor: [0, 50],
});

export const redMarker = L.icon({
  iconUrl: redPin,
  iconSize: [50, 50],
  iconAnchor: [12, 31],
});

export default CustomMarker;
