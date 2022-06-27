import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import './MapComponent.scss';
import L from 'leaflet';
import GetLocationDto from '../../Services/Location/dto/GetLocationDto';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface Props {
  location: GetLocationDto;
  historicSpecific?: any;
}

const MapComponent: FunctionComponent<Props> = (props) => {

  const ZOOM_LEVEL = 13;
  const limeOptions = { color: 'lime' }
  const blackOptions = { color: 'black' }
  const mapRef = useRef<any>();

  const { location, historicSpecific } = props;

  return (
    <div className='map-container'>
      <MapContainer
        center={[+historicSpecific.hist?.[0]?.[0] || 0, +historicSpecific.hist?.[0]?.[1] || 0]}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[+historicSpecific.hist[0][0], +historicSpecific.hist[0][1]]}>

        </Marker>
        <Marker position={[+historicSpecific.hist[1][0], +historicSpecific.hist[1][1]]} >

        </Marker>
        <Polyline pathOptions={blackOptions} positions={historicSpecific.hist} />
      </MapContainer>
    </div >
  );
};

export default MapComponent;

