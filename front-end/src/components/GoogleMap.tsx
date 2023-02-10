import React from "react";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import { center, containerStyle, options } from "../config/mapSettings";
import { BuildingInfo } from "../types/buildingInfo";
import Papa, { ParseResult } from "papaparse";

const GoogleMapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string
  })

  // save map in ref
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void =>{
    mapRef.current = map;
  }

  const onUnMount = (): void => {
    mapRef.current = null;
  }

  if(!isLoaded) return (
    <div>Map Loading....</div>
  )

  getBuildingInfo()

  return (
    <GoogleMap mapContainerStyle={containerStyle} options={options as google.maps.MapOptions} center={center} zoom={16} onLoad={onLoad} onUnmount={onUnMount} />
  )
}

function getBuildingInfo() {
  console.log("getting building info")
  getCSV();
}

const getCSV = () => {
  console.log("reading CSV")
  Papa.parse("../../../back-end/src/db/building.csv", {
    delimiter: ",",
    complete: (results: ParseResult<BuildingInfo>) => {
      console.log(results);
    },
  })
}


export default GoogleMapComponent;