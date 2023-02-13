import React, { Component } from 'react';
import axios from "axios";

interface Building {
  abbr: string;
  full: string;
  lat: number;
  lon: number;
}

var buildings: Building[] = [];

const fetch_promise = Promise.resolve(getBuildingInfo());
fetch_promise.then((p) => {
  buildings = p;
});

async function getBuildingInfo() {
  try {
    const response = await axios.get("http://localhost:4567/buildings");
    console.log(response);
    return (response).data as Building[];
  } catch {
    alert("Unable to fetch buildings info");
    return [];
  }
}

const reservable: Map<string, string> = new Map<string, string>([["ALB", "https://cal.lib.uw.edu/spaces?lid=1449&gid=0"],
["ELB", "https://cal.lib.uw.edu/reserve/engineering-group-study"],
["HSA", "https://cal.lib.uw.edu/reserve/hsl-group-study"],
["OUG", "https://cal.lib.uw.edu/spaces?lid=1454&gid=0"],
["PCAR","https://cal.lib.uw.edu/reserve/foster-group-study"],
["SUZ","https://cal.lib.uw.edu/spaces?lid=1449&gid=0"]]);

class BuildingGenerator extends Component {

  parseBuildings (b: Building[]): JSX.Element[] {
    let env : JSX.Element[] = [];
    for (let i = 0; i < b.length; i++) {
      let building = b[i];
      env.push(this.compact(building));
    }
    return env;
  }

  parseBuilding (props: Building): JSX.Element {
    let building: JSX.Element;
    if (reservable.has(props.abbr)) {
      building = <div>
        <p>{props.abbr + " : " + props.full}</p>
        <a href={reservable.get(props.abbr)}>To Reserve</a>
      </div>
    } else {
      building = <div>
        <p>{props.abbr + " : " + props.full}</p>
      </div>
    }
    return building;
  }

  compact (props: Building): JSX.Element {
    let block = <div id={props.abbr} hidden className='detail'>
      <h3>{props.full}</h3>
      <div>
        {this.parseBuilding(props)}
      </div>
      <button className='navigate'>Go To</button>
    </div>
    return block;
  }

  render() {
    return <React.StrictMode>
    <div id="building_space">
      {this.parseBuildings(buildings)}
    </div>
  </React.StrictMode>
  }
}
export default BuildingGenerator;
