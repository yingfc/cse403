import React, { useEffect, useState } from "react";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import { center, containerStyle, options } from "../config/mapSettings";
import axios from "axios";

interface BuildingInfo {
  buildingAbbr: string;
  buildingFullName: string;
  latitude: number;
  longitude: number;
}


const GoogleMapComponent: React.FC = () => {
  const [buildings, setBuilding] = useState<BuildingInfo[]>([]);



  useEffect(() => {
    const getBuildings = async () => {
      let buildingInfo = await getBuildingInfo();
      setBuilding(buildingInfo);
    }

    getBuildings();
  });

  useEffect(() => {
    buildings.forEach((building) => {
      addSingleMarker(new google.maps.LatLng(building.latitude, building.longitude));
    });
  }, [buildings])

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string
  })

  // save map in ref
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void =>{
    mapRef.current = map;
  }

  const addSingleMarker = (location: google.maps.LatLng): void => {
    const marker = new google.maps.Marker({
      position: location,
      map: mapRef.current,
    });
  }

  const onUnMount = (): void => {
    mapRef.current = null;
  }

  if(!isLoaded) return (
    <div>Map Loading....</div>
  )

  getBuildingInfo()

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options as google.maps.MapOptions}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnMount}
    />
  )
}

async function getBuildingInfo() {
  try {
    return (await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "buildings")).data as BuildingInfo[];
  } catch {
    alert("Unable to fetch buildings info");
    return [];
  }
}


export default GoogleMapComponent;