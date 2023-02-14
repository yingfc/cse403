import React, { Component } from 'react';
import { BuildingInfo } from './index';
import {BuildingProps, directionsRenderer, directionsService, geo} from './GoogleMap';
import axios from "axios";
import {calculateAndDisplayRoute} from "./Route";


export const reservable: Map<string, string> = new Map<string, string>([["ALB", "https://cal.lib.uw.edu/spaces?lid=1449&gid=0"],
["ELB", "https://cal.lib.uw.edu/reserve/engineering-group-study"],
["HSA", "https://cal.lib.uw.edu/reserve/hsl-group-study"],
["OUG", "https://cal.lib.uw.edu/spaces?lid=1454&gid=0"],
["PCAR","https://cal.lib.uw.edu/reserve/foster-group-study"],
["SUZ","https://cal.lib.uw.edu/spaces?lid=1449&gid=0"]]);

class BuildingGenerator extends Component<BuildingProps> {
  parseBuildings (): JSX.Element[] {
    let env : JSX.Element[] = [];
    for (let i = 0; i < this.props.buildings.length; i++) {
      let building = this.props.buildings[i];
      env.push(this.compact(building));
    }
    return env;
  }

  parseBuilding (props: BuildingInfo): JSX.Element {
    let building: JSX.Element;
    if (reservable.has(props.buildingAbbr)) {
      building = <div>
        <a href={reservable.get(props.buildingAbbr)}>To Reserve</a>
      </div>
    } else {
      building = <div>
      </div>
    }
    return building;
  }

  compact (props: BuildingInfo): JSX.Element {
    let block = <div id={props.buildingAbbr} className='detail' style={{display: "none"}}>
      <h3>{props.buildingAbbr + " : " + props.buildingFullName}</h3>
      <div>
        {this.parseBuilding(props)}
      </div>
      <button className='navigate' onClick={() => this.navigate(props.buildingAbbr)}>Go To</button>
    </div>
    return block;
  }

  // show the route from user current location to selected building.
  async navigate(abbr: string): Promise<void> {
    let buildingInfo: BuildingInfo | null;
    buildingInfo = await getBuildingInfoFromBuildingAbbr(abbr);
    console.log("navigate: " + buildingInfo?.buildingAbbr + " " + buildingInfo?.latitude + ", " + buildingInfo?.longitude);

    try{
      calculateAndDisplayRoute(directionsService, directionsRenderer, geo.currLat!, geo.currLong!, buildingInfo!);
    } catch (e) {
      console.error("Input Error with access to null element: " + e);
    }
  }

  render() {
    return <React.StrictMode>
    <div id="building_space">
      {this.parseBuildings()}
    </div>
  </React.StrictMode>
  }
}

export async function getBuildingInfoFromBuildingAbbr(buildingAbbr: string) {
  try {
    const response = await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "building/" + buildingAbbr);
    console.log(response);
    return response.data.data as BuildingInfo;
  } catch (e) {
    alert("Unable to get building from abbr: " + buildingAbbr + "; " + e);
    return null;
  }
}

export default BuildingGenerator;
