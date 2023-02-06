import React, { Component } from 'react';
import './index.css';

interface BuildingGeneratorProps{
  name: string;
}

interface Building {
  abbr: string;
  full: string;
  location: any; // should be point on the map
  rooms: Room[]; // contain room numbers
}

interface Room {
  id: string; // room number
  type: string;
  capacity: string; // maximum people included
}

interface BuildingGenerator {
  building : Building;
}


class BuildingGenerator extends Component<BuildingGeneratorProps, {}> {
  constructor (props: any) { //props should be string, query building info from db
    super(props);
    this.building = this.fetchBuilding(props);
  }

  fetchBuilding (props: BuildingGeneratorProps): Building {
    // fetch data from room -> building db
    var building: Building = {} as Building;
    // update data from db
    return building;
  }

  parseBuilding (props: Building): JSX.Element {
    let building = <div>
      <p>{props.full}</p>
      <>{this.parseRoom(props.rooms)}</>
    </div>
    return building;
  }

  parseRoom (props: Room[]): JSX.Element[] {
    let rooms : JSX.Element[] = [];
    for (let i = 0; i < props.length; i++) {
      let room = <div>
        <p>{props[i].id}</p>
        <p>{"Capacity: " + props[i].capacity +"; Type: " + props[i].type}</p>
        <button  data-attribute={(props[i].type === "reserve") ? 'hidden' : ''}>Reserve</button>
      </div>;
      rooms.push(room);
    }
    return rooms;
  }

  render() {
    return <React.StrictMode>
    <h3>{this.building.full}</h3>
    <div>
      {this.parseBuilding(this.building)}
    </div>
  <button>Go To</button>
  </React.StrictMode>
  }
}
export default BuildingGenerator;
