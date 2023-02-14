import axios from 'axios';
import { BuildingInfo } from '.';
import React from 'react';
<<<<<<< HEAD
=======
import ReactDOM from 'react-dom/client';
import axios from "axios";
import {BuildingInfo} from "./index";

export interface ClassInfo {
  major: string;
  courseNum: number;
  section: string;
}

export async function getBuildingInfoFromClass(cls: ClassInfo) {
  try {
    const response = await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "class?major" + cls.major + "&coursenum=" + cls.courseNum + "&section=" + cls.section);
    return response.data.data as BuildingInfo;
  } catch {
    alert("Unable to get specific building from course: " + cls.major + cls.courseNum + cls.section);
    return null;
  }

}
>>>>>>> 041dc478de66a35b342cb44c72c6711e49ffb833

const SearchBar: React.FC = () =>{
  const parseInput = async (input: string) => {
    let firstDigit = input.search(/\d/).toString();
    let numId = input.indexOf(firstDigit);
    let major = input.substring(0, numId-1);
    let courseNum = input.substring(numId, numId+3);
    let section = input.substring(numId+4);
    let res = await getCourseInfo(major, courseNum, section);
    console.log(res)
  }

  const input = document.getElementById('input') as HTMLInputElement;

  const button = document.getElementById("search");

  try{
    button?.addEventListener("click", () => {parseInput(input?.value)})
  } catch (e) {
    console.log(e)
    console.error("Input Error with access to null element")
  }

  return (
  <div id="searchBar">
    <input id="input" type="text" placeholder='CSE 403 A'/>
    <button id="search">Submit</button>
  </div>
  )
};

async function getCourseInfo(major:string, courseNum:string, section:string): Promise<BuildingInfo | null> {
  try {
    const response = await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "class?major"+
    major+"&coursenum="+courseNum+"&section="+section);
    return response.data.data as BuildingInfo;
  } catch {
    alert("Unable to fetch buildings info");
    return null;
  }
}

export default SearchBar;