import { FunctionComponent } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import './MapComponent.scss';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface Props {
}

const limeOptions = { color: 'lime' }

const MapComponent: FunctionComponent<Props> = (props) => {
  return (
    <div className='map-container'>
      <MapContainer center={[41.505, -0.01]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[41.505, -0.01]}>
          <Popup>
            Turista. <br /> algum texto sobre o turista.
          </Popup>
        </Marker>
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

const polyline: [number, number][] = [
  [51.51, -0.12],
  [51.51, -0.1],
  [51.505, -0.09]
]