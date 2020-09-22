import L from 'leaflet';

export default new L.Icon({
  iconUrl: require('assets/images/marker.png').default,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: require('assets/images/marker-shadow.png').default,
  shadowSize: new L.Point(12, 12),
  shadowAnchor: undefined,
  iconSize: new L.Point(20, 25),
  className: 'bg-transparent border-none marker-testid',
});
