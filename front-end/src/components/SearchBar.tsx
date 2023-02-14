import axios from 'axios';
import { BuildingInfo } from '.';
import React from 'react';

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
  return (
  <div id="searchBar">
    <input id="input" type="text" placeholder='CSE 403 A'/>
    <button id="search">Submit</button>
  </div>
  )
};

export async function getBuildingInfoFromClass(cls: ClassInfo) {
  try {
    const response = await axios.get(process.env.REACT_APP_DUBMAP_SERVER + "class?major=" + cls.major + "&coursenum=" + cls.courseNum + "&section=" + cls.section);
    console.log(response);
    return response.data.data as BuildingInfo;
  } catch {
    alert("Unable to get specific building from course: " + cls.major + cls.courseNum + cls.section);
    return null;
  }
}

export default SearchBar;