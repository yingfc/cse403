import React, { Component } from 'react';
import { BuildingInfo } from './index';
import { BuildingProps } from './GoogleMap';


const reservable: Map<string, string> = new Map<string, string>([["ALB", "https://cal.lib.uw.edu/spaces?lid=1449&gid=0"],
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
      <button className='navigate'>Go To</button>
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
