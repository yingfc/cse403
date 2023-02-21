import axios from 'axios';
import { BuildingInfo } from '.';
import React from 'react';
import {calculateAndDisplayRoute} from "./Route";
import {directionsRenderer, directionsService, geo} from "./GoogleMap";

export class ClassInfo {
  major: string;
  courseNum: number;
  section: string;
  constructor(major: string, courseNum: number, section: string) {
    this.major = major;
    this.courseNum = courseNum;
    this.section = section;
  }
}

const SearchBar: React.FC = () =>{

  const input = document.getElementById('input') as HTMLInputElement;
  const button = document.getElementById("search");
  let buildingInfo: BuildingInfo | null;
  const parseInput = async (input: string) => {
    if (input === "") {
      let container = document.getElementById("error_msg") as HTMLParagraphElement;
      let msg = "Input Error with access to null element"
      container.innerText = msg;
      throw Error(msg);
    }
    let numId = input.search(/\d/);
    let major = input.substring(0, numId-1).trim();
    let courseNum = parseInt(input.substring(numId, numId+3));
    let section = input.substring(numId+4).trim();
    buildingInfo = await getBuildingInfoFromClass(new ClassInfo(major, courseNum, section));
  }

  try{
    button?.addEventListener('click', (e: Event) => {
      parseInput(input!.value).then(x => console.log("eric: ", buildingInfo)).then(x => calculateAndDisplayRoute(directionsService, directionsRenderer, geo.currLat!, geo.currLong!, buildingInfo!))
    });
  } catch (e) {
    alert(e);
  }

  return (
  <div id="searchBar">
    <input id="input" type="text" placeholder='CSE 403 A'/>
    <button id="search" type="button" >Go!</button>
    <p id="error_msg" style={{display: "none"}}></p>
  </div>
  )
};

export async function getBuildingInfoFromClass(cls: ClassInfo) {
  try {
    const response = await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "class?major=" + cls.major + "&coursenum=" + cls.courseNum + "&section=" + cls.section);
    return response.data.data as BuildingInfo;
  } catch {
    alert("Unable to get specific building from course: " + cls.major + cls.courseNum + cls.section);
    return null;
  }
}

export default SearchBar;