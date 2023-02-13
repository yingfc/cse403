import GoogleMapComponent from "./GoogleMap";
import BuildingGenerator from "./BuildingGenerator";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

export interface BuildingInfo {
  buildingAbbr: string;
  buildingFullName: string;
  latitude: number;
  longitude: number;
}

export function Components(){

  const [buildings, setBuildings] = useState<BuildingInfo[]>([]);

  const uwLink: string = process.env.REACT_APP_UW_LIBRARY_RESERVATION_LINK as string;


  useEffect(() => {
    const getBuildings = async () => {
      let buildingInfo = await getBuildingInfo();
      setBuildings(buildingInfo);
      console.log(buildings);
    }
    getBuildings();
  }, [buildings]);

  console.log(buildings);

  if(buildings.length === 0) {
    return (
      <>Loading Map Data.....</>
    )
  }


  return (
    <div>
      <a href={uwLink}>
        <button>to reserve</button>
      </a>
        <a>
            <button id='route' value="Get Route" >Get Route</button>
        </a>
      <GoogleMapComponent buildings={buildings}/>
      {/* <BuildingGenerator /> */}
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
