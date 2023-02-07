import React, { Component } from 'react';
import './index.css';

interface BuildingGeneratorProps{
  name: string;
}

interface Building {
  abbr: string;
  full: string;
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
    </div>
    return building;
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
