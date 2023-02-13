import React from "react";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import { center, containerStyle, options } from "../config/mapSettings";
import { BuildingInfo } from ".";
import {calculateAndDisplayRoute, calculateAndDisplayRouteDemo, GeoService} from "./Route";


export interface BuildingProps {
  buildings: BuildingInfo[];
}

const GoogleMapComponent: React.FC<BuildingProps> = ({buildings}) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addSingleMarker = (location: google.maps.LatLng, abbr: string): void => {
    const marker = new google.maps.Marker({
      position: location,
      map: mapRef.current,
    })
    marker.addListener("click", () =>{exhibitDetail(abbr)});
  }

  // save map in ref
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void =>{
    // get current location (lat/long)
    let geo = new GeoService();
    // @ts-ignore
    document.getElementById("currLoc").addEventListener('click', () => { geo.getPosition(); });

    // set up Direction Service
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    // @ts-ignore
    document.getElementById("route").addEventListener('click', (e: Event) => calculateAndDisplayRouteDemo(directionsService, directionsRenderer));
    // document.getElementById("route").addEventListener('click', (e: Event) => calculateAndDisplayRoute(directionsService, directionsRenderer, geo.currLat, geo.currLong, buildingInfo));
    mapRef.current = map;
  }

  function exhibitDetail(abbr: string) {
    console.log("clicked");
    try {
      let details = document.getElementsByClassName("showed") as HTMLCollectionOf<HTMLElement>;
      console.log(details);
      for (var i = 0; i < details.length; i++) {
        details[i].style.display = "none";
        details[i].classList.remove("showed");
      }
    } catch {}
    let selected = document.getElementById(abbr)!;
    console.log(selected);
    selected.style.display = "block";
    selected.classList.add("showed");
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