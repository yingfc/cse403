import React, { Component } from 'react';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import './index.css';


interface Building {
  abbr: string;
  full: string;
  lat: number;
  lon: number;
}

interface BuildingGenerator {
  buildings : Building[];
}

const csvFilePath ='back-end\\src\\db\\building.csv';

const reservable: Map<string, string> = new Map<string, string>([["ALB", "https://cal.lib.uw.edu/spaces?lid=1449&gid=0"],
["ELB", "https://cal.lib.uw.edu/reserve/engineering-group-study"],
["HSA", "https://cal.lib.uw.edu/reserve/hsl-group-study"],
["ODE", "https://cal.lib.uw.edu/spaces?lid=1454&gid=0"],
["PCAR","https://cal.lib.uw.edu/reserve/foster-group-study"],
["SUZ","https://cal.lib.uw.edu/spaces?lid=1449&gid=0"]]);

class BuildingGenerator extends Component {
  constructor (props: any) { //props should be string, query building info from db
    super(props);
    this.buildings = this.fetchBuildings();
  }

  fetchBuildings (): Building[] {
    fs.readFileSync('back-end\\src\\db\\building.csv','utf8');
    const headers = ['abbr', 'full', 'lat', 'lon'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    parse(fileContent, {
      delimiter: ',',
      columns: headers,
      fromLine: 2,
      cast: (columnValue, context) => {
        if (context.column === 'geoNameId') {
          return parseInt(columnValue, 10);
        }
        return columnValue;
      }
    }, (error, result: Building[]) => {
      if (error) {
        console.error(error);
      }
      return result;
    });
    console.error("Failed to read building data");
    return [];
  }

  parseBuildings (): JSX.Element[] {
    let env : JSX.Element[] = [];
    for (let i = 0; i < this.buildings.length; i++) {
      let building = this.buildings[i];
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
    let block = <div id={props.abbr} hidden>
      <h3>{props.full}</h3>
      <div>
        {this.parseBuilding(props)}
      </div>
      <button>Go To</button>
    </div>
    return block;
  }


  render() {
    return <React.StrictMode>
    <div id="building_space">
      {this.parseBuildings()}
    </div>
  </React.StrictMode>
  }
}
export default BuildingGenerator;
