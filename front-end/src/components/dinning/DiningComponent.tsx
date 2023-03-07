import { useState } from "react";
import { diningData } from "./DiningData";
import DiningPage from "./DiningPage";

const DiningComponent: React.FC = () => {
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => {setSideBar(!sideBar); console.log(sideBar)};

  return (
    <>
      <button onClick={showSideBar}>Show Dinning Option</button>
      <DiningPage className="sidebar" sideBar={sideBar} diningData={diningData}/>
    </>
  )
}

export default DiningComponent;