import React, { useEffect, useState } from "react";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import { center, containerStyle, options } from "../config/MapSettings";
import { BuildingInfo } from ".";

interface BuildingProps {
  buildings: BuildingInfo[];
}

const GoogleMapComponent: React.FC<BuildingProps> = ({buildings}) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addSingleMarker = (location: google.maps.LatLng, abbr: string): void => {
    console.log("adding marker");
    const marker = new google.maps.Marker({
      position: location,
      map: mapRef.current,
      label: abbr
    })
    marker.addListener("click", () =>{exhibitDetail(abbr)});
  }


  // save map in ref
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void =>{
    mapRef.current = map;
  }

  function exhibitDetail(abbr: string) {
    try {
      let details = document.getElementsByClassName("showed") as HTMLCollectionOf<HTMLElement>;
      for (var i = 0; i < details.length; i++) {
        details[i].style.visibility = "hidden";
        details[i].classList.remove("showed");
      }
      let selected = document.getElementById(abbr)!
      selected.style.visibility = "visible";
      selected.classList.add("showed");
    } catch {
      console.error("Failed to exhibit detail")
    }
  }

  const onUnMount = (): void => {
    mapRef.current = null;
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string
  })

  if(!isLoaded) return (
    <div>Map Loading....</div>
  );

  if(isLoaded) {
    buildings.forEach((building) => {
      addSingleMarker(new google.maps.LatLng(building.latitude, building.longitude), building.buildingAbbr);
    });
  }

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

export default GoogleMapComponent;