import L from 'leaflet';

export default new L.Icon({
  iconUrl: undefined,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: new L.Point(12, 12),
  shadowAnchor: undefined,
  iconSize: new L.Point(20, 25),
  className: 'bg-transparent border-none marker-testid',
});
