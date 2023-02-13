import React from 'react';
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  </React.StrictMode>
);

// search the location with course name