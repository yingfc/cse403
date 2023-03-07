import GoogleMapComponent from "./map/GoogleMap";
import {BuildingGenerator} from "./building_info/BuildingGenerator";
import SearchBar from "./menu/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import DiningComponent from "./dinning/DiningComponent";

export interface BuildingInfo {
  buildingAbbr: string;
  buildingFullName: string;
  latitude: number;
  longitude: number;
}

export function Components(){

  const [buildings, setBuildings] = useState<BuildingInfo[]>([]);

  useEffect(() => {
    console.log("rendering components")
    const getBuildings = async () => {
      let buildingInfo = await getBuildingInfo();
      setBuildings(buildingInfo);
      console.log(buildings);
    }
    getBuildings();
  }, []);

  console.log(buildings);

  if(buildings.length === 0) {
    return (
      <>Loading Map Data.....</>
    )
  }


  return (
    <div>
      <SearchBar />
      <DiningComponent />
      <BuildingGenerator buildings={buildings}/>
      <GoogleMapComponent buildings={buildings}/>
    </div>
  )
}

async function getBuildingInfo() {
  try {
    const response = await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "buildings");
    return response.data.data as BuildingInfo[];
  } catch {
    alert("Unable to fetch buildings info");
    return [];
  }
}
