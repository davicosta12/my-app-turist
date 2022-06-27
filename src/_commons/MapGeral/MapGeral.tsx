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
  specificPosition: any
}

const MapGeral: FunctionComponent<Props> = (props) => {

  const ZOOM_LEVEL = 13;
  const mapRef = useRef<any>();

  const { location, specificPosition } = props;

  function GetIcon(point: string) {
    return L.icon({
      iconUrl: require("../../assets/" + point + ".jpg"),
      iconSize: [40, 40],
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
  }

  const getPopUp = (index: number, postions: any) => {
    let text = '';
    switch (index) {
      case 0: text = `Minha Posicao Atual: ${postions[0]}, ${postions[1]}.`; break;
      case +(location?.posicoes?.length - 1): text = `Posição do Guia: ${postions[0]}, ${postions[1]}.`; break;
      default: text = `Posição do Turista: ${postions[0]}, ${postions[1]}.`; break;
    }

    return text;
  }

  const getIcon = (index: number) => {

    switch (index) {
      case 0: return GetIcon('map');;
      case 6: return GetIcon('mapuser');
      default: break;
    }

    return L.icon({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });;
  }

  console.log(specificPosition[0])

  return (
    <div className='map-container'>
      <MapContainer
        center={[+specificPosition[0] || 0, +specificPosition[1] || 0]}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location?.posicoes?.map((p: any, i: number) =>
          <Marker position={p} icon={getIcon(i)}>
            <Popup>
              {getPopUp(i, p)}
            </Popup>
          </Marker>)}

      </MapContainer>
    </div >
  );
};

export default MapGeral;

