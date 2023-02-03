import React from "react";
import googleMapReact from "google-map-react";

interface IMap {
  lat: number;
  lng: number;
  zoom: number
}

const GoogleMap: React.FC<IMap> = ({lat, lng, zoom}) => {
  return (
    <div>This is a map component</div>
  )
}


export default GoogleMap;