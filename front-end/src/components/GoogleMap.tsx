import React from "react";
import {GoogleMap, InfoWindowF, useJsApiLoader} from '@react-google-maps/api'
import { center, containerStyle, options } from "../config/MapSettings";
import { BuildingInfo } from ".";
import {calculateAndDisplayRoute, calculateAndDisplayRouteDemo, GeoService} from "./Route";
import {ClassInfo, getBuildingInfoFromClass} from "./SearchBar";


export interface BuildingProps {
  buildings: BuildingInfo[];
}

export let directionsRenderer: google.maps.DirectionsRenderer;
export let directionsService: google.maps.DirectionsService;
export let geo: GeoService;

const GoogleMapComponent: React.FC<BuildingProps> = ({buildings}) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addSingleMarker = (location: google.maps.LatLng, abbr: string): void => {
    const marker = new google.maps.Marker({
      position: location,
      map: mapRef.current,
      label: abbr,
    });

    if(abbr === "OUG") {
      const contentString =
      `<div>
        <p>
          <a href=${process.env.REACT_APP_UW_LIBRARY_RESERVATION_LINK}>This</a>
          is going to redirect to the reservation page....
        </p>
      </div>`;

      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Reservation",
      })
      marker.addListener('mouseover', () => {
        infoWindow.open({
          anchor: marker,
          map: mapRef.current
        })
      })
    }

    marker.addListener("click", () =>{exhibitDetail(abbr)});
  }

  // save map in ref
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void =>{
    // get current location (lat/long) on load
    geo = new GeoService();
    geo.getPosition();

    // set up Direction Service
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    // // @ts-ignore
    // document.getElementById("route").addEventListener('click', (e: Event) => calculateAndDisplayRouteDemo(directionsService, directionsRenderer));

    const input = document.getElementById('input') as HTMLInputElement;
    const button = document.getElementById("search");
    let buildingInfo: BuildingInfo | null;
    const parseInput = async (input: string) => {
      let numId = input.search(/\d/);
      let major = input.substring(0, numId-1).trim();
      let courseNum = parseInt(input.substring(numId, numId+3));
      let section = input.substring(numId+4).trim();
      console.log(major + " " + courseNum + " " + section);
      buildingInfo = await getBuildingInfoFromClass(new ClassInfo(major, courseNum, section));
    }

    try{
      button?.addEventListener('click', (e: Event) => {
        parseInput(input!.value).then(x => console.log("eric: ", buildingInfo)).then(x => calculateAndDisplayRoute(directionsService, directionsRenderer, geo.currLat!, geo.currLong!, buildingInfo!))
      });
    } catch (e) {
      console.error("Input Error with access to null element: " + e);
    }

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