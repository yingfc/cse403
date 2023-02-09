import React, { Component } from 'react';
import * as fs from 'fs';
import './index.css';

interface BuildingGeneratorProps{
  name: string;
  buildings: {[abbr: string]:string};
}

interface Building {
  abbr: string;
  full: string;
  link: string;
}

interface BuildingGenerator {
  building : Building;
}

const reservable: {[abbr: string]: string; } =
{"ALB": "https://cal.lib.uw.edu/spaces?lid=1449&gid=0",
"ELB":"https://cal.lib.uw.edu/reserve/engineering-group-study",
"HSA":"https://cal.lib.uw.edu/reserve/hsl-group-study",
"ODE":"https://cal.lib.uw.edu/spaces?lid=1454&gid=0",
"PCAR":"https://cal.lib.uw.edu/reserve/foster-group-study",
"SUZ":"https://cal.lib.uw.edu/spaces?lid=1449&gid=0"}


class BuildingGenerator extends Component<BuildingGeneratorProps, {}> {
  constructor (props: BuildingGeneratorProps) { //props should be string, query building info from db
    super(props);
    this.building = this.fetchBuilding(props);
  }

  fetchBuilding (props: BuildingGeneratorProps): Building {
    fs.readFileSync('back-end\\src\\db\\building.csv','utf8');
    var building: Building = {} as Building;
    building.abbr = props.name;
    building.full = props.buildings[props.name];
    // fetch data from room -> building db
    for (var key in reservable) {
      if (key === props.name) {
        building.link = reservable[key];
      }
    }

    // update data from db
    return building;
  }

  parseBuilding (props: Building): JSX.Element {
    let building = <div>
      <p>{props.abbr + " : " + props.full}</p>
      <a href={props.link}>To Reserve</a>
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
