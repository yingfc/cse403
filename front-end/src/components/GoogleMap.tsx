import React, {useEffect, useState} from "react";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import {center, containerStyle, options} from "../config/mapSettings";
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
    // Array conversion is needed as buildings is Collection object instead of Array and forEach only works for Array
    const buildingArr = Array.from(buildings);
    buildingArr.forEach((building) => {
      addSingleMarker(new google.maps.LatLng(building.latitude, building.longitude), building.buildingAbbr);
    });
  }, [buildings])

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string
  })

  // save map in ref
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void =>{
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    // @ts-ignore
    document.getElementById("route").addEventListener('click', (e: Event) => calculateAndDisplayRouteDemo(directionsService, directionsRenderer));
    // calculateAndDisplayRoute(directionsService, directionsRenderer);
    mapRef.current = map;
  }

  const addSingleMarker = (location: google.maps.LatLng, abbr: string): void => {
    const marker = new google.maps.Marker({
      position: location,
      map: mapRef.current,
    })
    marker.addListener("click", () =>{exhibitDetail(abbr)});
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
    const response = await axios.get("http://localhost:4567/buildings");
    console.log(response);
    return (response).data as BuildingInfo[];
  } catch {
    alert("Unable to fetch buildings info");
    return [];
  }
}

function calculateAndDisplayRouteDemo(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
) {
  directionsService
      .route({
        origin: { lat: 47.65578098354366, lng: -122.30784174832523},
        destination: { lat: 47.65303982982676, lng: -122.30864914593757},
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        console.log(response);
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed."));
}

function calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    srcLocation: BuildingInfo,
    dstLocation: BuildingInfo,
) {
  directionsService
      .route({
        origin: { lat: srcLocation.latitude, lng: srcLocation.longitude},
        destination: { lat: dstLocation.latitude, lng: dstLocation.longitude},
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        console.log(response);
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed."));
}

export default GoogleMapComponent;